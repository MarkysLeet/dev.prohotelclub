import re

with open('src/components/Header.tsx', 'r') as f:
    content = f.read()

# Add missing refs
import_old = "import React, { useState, useEffect, useRef } from 'react';"
import_new = "import React, { useState, useEffect, useRef } from 'react';"

if "import React, { useState, useEffect, useRef } from 'react';" not in content:
    content = content.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect, useRef } from 'react';")


with open('src/components/Header.tsx', 'w') as f:
    f.write(content)
