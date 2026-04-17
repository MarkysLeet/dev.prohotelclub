with open('src/components/Header.tsx', 'r') as f:
    content = f.read()

import re
# Remove the duplicated block starting from line 227 (the stray `>` to the second `</AnimatePresence>`)
# We know our `</AnimatePresence>` is correct in the first block, but there's a second one right below it.
# The duplicate starts exactly after our correctly inserted `</div>` at the end of the `ref={dropdownRef}` div.

# Let's search for our inserted block end
end_of_block = """                </Link>
              </>
            )}"""

match = re.search(re.escape(end_of_block), content)
if match:
    # Now find where the parent div closes and what follows it
    after_block = content[match.end():]
    # We should have `\n          </div>\n        </div>\n      </div>\n    </header>`
    # But currently we have the extra `>` and `AnimatePresence` garbage.

    # We will replace everything between `end_of_block` and `</header>` with just the closing divs
    closing_tags = """
          </div>
        </div>
      </div>
    </header>"""

    header_end = after_block.find("</header>")
    if header_end != -1:
        new_content = content[:match.end()] + closing_tags + after_block[header_end + 9:]
        with open('src/components/Header.tsx', 'w') as f:
            f.write(new_content)
        print("Header duplicated code removed!")
    else:
        print("Could not find </header>")
else:
    print("Could not find end of block")
