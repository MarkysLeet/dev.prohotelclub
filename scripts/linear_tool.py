import sys
import os
import json
import urllib.request
import urllib.error
from typing import Dict, Any, List, Optional

API_URL = "https://api.linear.app/graphql"

def get_api_key() -> str:
    key = os.environ.get("LINEAR_API_KEY")
    if not key:
        # Try to read from .env.local
        try:
            with open(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env.local'), 'r') as f:
                for line in f:
                    if line.startswith('LINEAR_API_KEY='):
                        key = line.strip().split('=', 1)[1]
                        break
        except FileNotFoundError:
            pass

    if not key:
        print("Error: LINEAR_API_KEY environment variable not set and not found in .env.local")
        sys.exit(1)
    return key

def execute_graphql(query: str, variables: Dict[str, Any] = None) -> Dict[str, Any]:
    api_key = get_api_key()
    headers = {
        "Content-Type": "application/json",
        "Authorization": api_key
    }

    payload = {"query": query}
    if variables:
        payload["variables"] = variables

    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(API_URL, data=data, headers=headers)

    try:
        with urllib.request.urlopen(req) as response:
            response_data = json.loads(response.read().decode('utf-8'))
            if "errors" in response_data:
                print(f"GraphQL Error: {json.dumps(response_data['errors'], indent=2)}")
                sys.exit(1)
            return response_data["data"]
    except urllib.error.HTTPError as e:
        print(f"HTTP Error: {e.code} {e.reason}")
        error_body = e.read().decode('utf-8')
        print(f"Response: {error_body}")
        sys.exit(1)

def get_prohotelclub_project() -> Optional[str]:
    query = """
    query {
        projects(filter: { name: { eq: "ProHotelClub" } }) {
            nodes {
                id
                name
                teams {
                    nodes {
                        id
                    }
                }
            }
        }
    }
    """
    result = execute_graphql(query)
    nodes = result.get("projects", {}).get("nodes", [])
    if nodes:
        return nodes[0]["id"]
    return None

def get_issue_status_id(team_id: str, status_name: str) -> Optional[str]:
    query = """
    query($teamId: String!) {
        team(id: $teamId) {
            states {
                nodes {
                    id
                    name
                }
            }
        }
    }
    """
    result = execute_graphql(query, {"teamId": team_id})
    states = result.get("team", {}).get("states", {}).get("nodes", [])
    for state in states:
        if state["name"] == status_name:
            return state["id"]
    return None

def assign_and_update_status(issue_id: str, assignee_id: str, status_id: str):
    query = """
    mutation($issueId: String!, $stateId: String!, $assigneeId: String!) {
        issueUpdate(id: $issueId, input: { stateId: $stateId, assigneeId: $assigneeId }) {
            success
            issue {
                id
                title
                state { name }
            }
        }
    }
    """
    execute_graphql(query, {
        "issueId": issue_id,
        "stateId": status_id,
        "assigneeId": assignee_id
    })

def update_status(issue_id: str, status_id: str):
    query = """
    mutation($issueId: String!, $stateId: String!) {
        issueUpdate(id: $issueId, input: { stateId: $stateId }) {
            success
        }
    }
    """
    execute_graphql(query, {
        "issueId": issue_id,
        "stateId": status_id
    })

def add_comment(issue_id: str, body: str):
    query = """
    mutation($issueId: String!, $body: String!) {
        commentCreate(input: { issueId: $issueId, body: $body }) {
            success
            comment {
                id
            }
        }
    }
    """
    execute_graphql(query, {
        "issueId": issue_id,
        "body": body
    })

def get_next_task():
    # 1. Get Project
    query = """
    query {
        projects(filter: { name: { eq: "ProHotelClub" } }) {
            nodes {
                id
                name
                teams {
                    nodes {
                        id
                    }
                }
            }
        }
        viewer {
            id
        }
    }
    """
    result = execute_graphql(query)
    projects = result.get("projects", {}).get("nodes", [])
    if not projects:
        print("Project 'ProHotelClub' not found.")
        return

    project_id = projects[0]["id"]
    team_id = projects[0]["teams"]["nodes"][0]["id"]
    viewer_id = result.get("viewer", {}).get("id")

    # Get Todo and In Progress statuses
    todo_id = get_issue_status_id(team_id, "Todo")
    in_progress_id = get_issue_status_id(team_id, "In Progress")

    if not todo_id or not in_progress_id:
        print("Could not find 'Todo' or 'In Progress' states for the team.")
        return

    # Fetch tasks for the project that are Todo
    query_tasks = """
    query($projectId: ID!, $stateId: ID!) {
        issues(filter: {
            project: { id: { eq: $projectId } },
            state: { id: { eq: $stateId } }
        }) {
            nodes {
                id
                identifier
                title
                priority
                priorityLabel
                state { name }
            }
        }
    }
    """
    result_tasks = execute_graphql(query_tasks, {"projectId": project_id, "stateId": todo_id})
    issues = result_tasks.get("issues", {}).get("nodes", [])

    if not issues:
        print("No tasks found in 'Todo' for ProHotelClub.")
        return

    # Priority: 0 = No priority, 1 = Urgent, 2 = High, 3 = Medium, 4 = Low
    # We want Urgent(1) or High(2) first.
    def sort_key(issue):
        prio = issue.get("priority", 0)
        # Treat 0 (No priority) as lowest, higher numbers mean lower priority in Linear.
        # Linear: 1=Urgent, 2=High, 3=Normal, 4=Low, 0=None
        if prio == 0:
            return 999
        return prio

    sorted_issues = sorted(issues, key=sort_key)
    target_issue = sorted_issues[0]

    print(f"Selected task: {target_issue['identifier']} - {target_issue['title']} (Priority: {target_issue.get('priorityLabel', 'None')})")

    print(f"Assigning to me and moving to In Progress...")
    assign_and_update_status(target_issue["id"], viewer_id, in_progress_id)
    print(f"Task {target_issue['identifier']} is now In Progress and assigned to you.")

def complete_task(issue_identifier: str, report: str):
    # Get issue details to ensure it exists and get ID/Team
    # Extract the team key and number
    parts = issue_identifier.split('-')
    if len(parts) == 2:
        team_key = parts[0]
        number = int(parts[1])
        query = """
        query {
            issues(filter: {
                team: { key: { eq: "%s" } },
                number: { eq: %d }
            }) {
                nodes {
                    id
                    team {
                        id
                    }
                }
            }
        }
        """ % (team_key, number)
    else:
        print("Invalid issue identifier format. Expected TEAM-123.")
        return

    result = execute_graphql(query)
    issues = result.get("issues", {}).get("nodes", [])

    if not issues:
        print(f"Task {issue_identifier} not found.")
        return

    issue_id = issues[0]["id"]
    team_id = issues[0]["team"]["id"] # just keeping this correct

    done_status_id = get_issue_status_id(team_id, "Done")
    if not done_status_id:
        print("Could not find 'Done' state for the team.")
        return

    print(f"Adding report comment...")
    add_comment(issue_id, report)

    print(f"Moving to Done...")
    update_status(issue_id, done_status_id)

    print(f"Task {issue_identifier} successfully completed with report.")

def test_flow():
    print("Testing Linear Flow...")
    # Get project and team
    query = """
    query {
        projects(filter: { name: { eq: "ProHotelClub" } }) {
            nodes {
                id
                teams {
                    nodes {
                        id
                    }
                }
            }
        }
        viewer {
            id
        }
    }
    """
    result = execute_graphql(query)
    projects = result.get("projects", {}).get("nodes", [])
    if not projects:
        print("Project not found.")
        return

    project_id = projects[0]["id"]
    team_id = projects[0]["teams"]["nodes"][0]["id"]
    viewer_id = result.get("viewer", {}).get("id")

    # Create issue
    print("Creating test issue...")
    create_query = """
    mutation($teamId: String!, $projectId: String!, $title: String!, $assigneeId: String!) {
        issueCreate(input: {
            teamId: $teamId,
            projectId: $projectId,
            title: $title,
            priority: 2,
            assigneeId: $assigneeId
        }) {
            success
            issue {
                id
                identifier
            }
        }
    }
    """
    create_result = execute_graphql(create_query, {
        "teamId": team_id,
        "projectId": project_id,
        "title": "[TEST] Автоматическая задача",
        "assigneeId": viewer_id
    })

    if not create_result.get("issueCreate", {}).get("success"):
        print("Failed to create issue.")
        return

    issue_identifier = create_result["issueCreate"]["issue"]["identifier"]
    print(f"Created issue {issue_identifier}")

    # Close issue with report
    print("Closing test issue with report...")
    report = "Что сделано: Проверен API конвейер\\nЗачем: Для подтверждения работы скрипта\\nЦенность: Скрипт готов к работе."
    complete_task(issue_identifier, report)
    print("Test flow complete.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python3 scripts/linear_tool.py get_next_task")
        print("  python3 scripts/linear_tool.py complete_task <identifier> \"<report>\"")
        print("  python3 scripts/linear_tool.py test")
        sys.exit(1)

    command = sys.argv[1]

    if command == "get_next_task":
        get_next_task()
    elif command == "complete_task":
        if len(sys.argv) < 4:
            print("Usage: python3 scripts/linear_tool.py complete_task <identifier> \"<report>\"")
            sys.exit(1)
        issue_id = sys.argv[2]
        report = sys.argv[3]
        complete_task(issue_id, report)
    elif command == "test":
        test_flow()
    else:
        print(f"Unknown command: {command}")
        sys.exit(1)
