from rembg import remove
from PIL import Image

def process_image(input_path, output_path):
    print(f"Processing {input_path}...")
    input_image = Image.open(input_path)
    output_image = remove(input_image)
    output_image.save(output_path)
    print(f"Saved to {output_path}")

process_image("e:/website all/VARENAYAM/app/public/images/varenayam-logo-cropped.jpg", "e:/website all/VARENAYAM/app/public/images/varenayam-logo-cropped.png")
process_image("e:/website all/VARENAYAM/app/public/images/varenayam-logo.jpg", "e:/website all/VARENAYAM/app/public/images/varenayam-logo.png")
print("Done!")
