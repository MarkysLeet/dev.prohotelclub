import re

with open('src/app/dashboard/layout.tsx', 'r') as f:
    content = f.read()

# For layout.tsx, the merge succeeded but we need to ensure BOTH origin/main and HEAD's intent are preserved.
# HEAD: if (!isLoading && !isAuth) router.push('/auth'); + return spinner if isLoading
# origin/main: isMounted check.

# Let's just completely replace the useEffect/if block manually
start_marker = "  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);"
end_marker = "  if (!isAuth) return null;" # actually origin/main might be !isMounted || !isAuth

lines = content.split('\n')
start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if line == "  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);":
        start_idx = i
    elif start_idx != -1 and line == "  if (!isAuth) return null;" or line == "  if (!isMounted || !isAuth) return null;":
        end_idx = i

if start_idx != -1 and end_idx != -1:
    replacement = [
        "  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);",
        "  const [isMounted, setIsMounted] = useState(false);",
        "",
        "  useEffect(() => {",
        "    setIsMounted(true);",
        "  }, []);",
        "",
        "  useEffect(() => {",
        "    if (isMounted && !isLoading && !isAuth) {",
        "      router.push('/auth');",
        "    }",
        "  }, [isAuth, isLoading, router, isMounted]);",
        "",
        "  if (!isMounted || isLoading) {",
        "    return (",
        "      <div className=\"min-h-screen bg-soft-sand flex items-center justify-center\">",
        "        <div className=\"w-10 h-10 border-4 border-evergreen-forest/20 border-t-evergreen-forest rounded-full animate-spin\"></div>",
        "      </div>",
        "    );",
        "  }",
        "",
        "  if (!isAuth) return null;"
    ]
    new_lines = lines[:start_idx] + replacement + lines[end_idx+1:]
    with open('src/app/dashboard/layout.tsx', 'w') as f:
        f.write('\n'.join(new_lines))
    print("Layout fixed!")
else:
    print("Could not find markers in Layout.")
