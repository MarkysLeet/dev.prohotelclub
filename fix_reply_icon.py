import re

with open('src/components/hotel-detail/HotelComments.tsx', 'r') as f:
    content = f.read()

# Replace ReplyIcon with MessageMultiple02Icon from hugeicons-react
content = content.replace("ReplyIcon", "MessageMultiple02Icon")

with open('src/components/hotel-detail/HotelComments.tsx', 'w') as f:
    f.write(content)
