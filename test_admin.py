import re

def update_file(file_path, obj_name, get_func, title, message):
    with open(file_path, 'r') as f:
        content = f.read()

    # Imports
    if 'PageErrorState' not in content:
        content = re.sub(r"import \{ (.*?) \} from '@/components/ui';", r"import { \1, PageErrorState } from '@/components/ui';", content)
        if 'PageErrorState' not in content:
            content = content.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport { PageErrorState } from '@/components/ui';")

    if "isError" not in content:
        # State
        state_match = re.search(r"const \[(.*?)\] = useState<(.*?)>\(\[\]\);", content)
        if state_match:
            content = content[:state_match.end()] + "\n  const [isLoading, setIsLoading] = useState(true);\n  const [isError, setIsError] = useState(false);" + content[state_match.end():]

        # Effect
        old_effect_pattern = f"async function load{obj_name}\(\) {{(.*?)if \(mounted\) set{obj_name}\(data\);\n      }}"
        new_effect = f"async function load{obj_name}() {{\n        setIsLoading(true);\n        setIsError(false);\n        try {{\n          const data = await api.{get_func}();\n          if (mounted) set{obj_name}(data);\n        }} catch (err) {{\n          console.error('Failed to load {obj_name.lower()}', err);\n          if (mounted) setIsError(true);\n        }} finally {{\n          if (mounted) setIsLoading(false);\n        }}\n      }}"

        content = re.sub(old_effect_pattern, new_effect, content, flags=re.DOTALL)

        # UI
        table_container = '<div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">'
        grid_container = '<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">'

        target = table_container if table_container in content else grid_container

        if target in content and "isError ?" not in content:
            replacement = f"""{{isError ? (
        <PageErrorState
          title="{title}"
          message="{message}"
        />
      ) : isLoading ? (
        <div className="py-12 flex justify-center">
            <div className="w-8 h-8 border-4 border-evergreen-forest/20 border-t-evergreen-forest rounded-full animate-spin"></div>
        </div>
      ) : (
      {target}"""
            content = content.replace(target, replacement)

            # Close the ternary right before the last closing div/form
            if "        </table>\n      </div>\n    </div>\n  );\n}" in content:
                content = content.replace("        </table>\n      </div>\n    </div>\n  );\n}", "        </table>\n      </div>\n      )}\n    </div>\n  );\n}")
            elif "        ))}\n      </div>\n    </div>\n  );\n}" in content:
                content = content.replace("        ))}\n      </div>\n    </div>\n  );\n}", "        ))}\n      </div>\n      )}\n    </div>\n  );\n}")
            elif "      </div>\n\n      {selectedRequest && (" in content:
                content = content.replace("        </table>\n      </div>\n\n      {selectedRequest && (", "        </table>\n      </div>\n      )}\n\n      {selectedRequest && (")


    with open(file_path, 'w') as f:
        f.write(content)

update_file('src/app/dashboard/admin/hotels/page.tsx', 'Hotels', 'getHotels', 'Ошибка загрузки отелей', 'Не удалось загрузить список отелей. Пожалуйста, попробуйте обновить страницу.')
update_file('src/app/dashboard/admin/news/page.tsx', 'NewsData', 'getAdminNews', 'Ошибка загрузки новостей', 'Не удалось загрузить список новостей. Пожалуйста, попробуйте обновить страницу.')
update_file('src/app/dashboard/admin/requests/page.tsx', 'Requests', 'getReviewRequests', 'Ошибка загрузки запросов', 'Не удалось загрузить список запросов на обзор. Пожалуйста, попробуйте обновить страницу.')
update_file('src/app/dashboard/admin/users/page.tsx', 'Users', 'getAllProfiles', 'Ошибка загрузки пользователей', 'Не удалось загрузить список пользователей. Пожалуйста, попробуйте обновить страницу.')
