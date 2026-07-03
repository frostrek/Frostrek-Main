import fitz
import os

pdf_dir = r"d:\f-website\Frostrek-Main\public\pdf"
img_dir = r"d:\f-website\Frostrek-Main\public\images"

for file in os.listdir(pdf_dir):
    if file.endswith(".pdf"):
        doc = fitz.open(os.path.join(pdf_dir, file))
        page = doc.load_page(0)
        pix = page.get_pixmap(dpi=150)
        img_name = file.replace(".pdf", ".jpg")
        pix.save(os.path.join(img_dir, img_name))
        print("Saved", img_name)
