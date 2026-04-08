from PIL import Image

img = Image.open("/app/ProHotelClub.jpg")
print(f"Format: {img.format}")
print(f"Size: {img.size}")
print(f"Mode: {img.mode}")
