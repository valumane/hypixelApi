import matplotlib.pyplot as plt
from PIL import Image
import numpy as np

# ----------------------------------------------------------------------
# ✅ 1️⃣ CONFIGURATION
INPUT_PATH = "../headfile1.png"       # Ton fichier skin complet
OUTPUT_PREFIX = "head_face"           # Prefix pour images extraites
OUTPUT_RENDER = "head_render_overlay_partial.png"  # Image finale

FACES_TO_KEEP = ["right", "top", "front"]   # Seulement celles qu'on veut

# ----------------------------------------------------------------------
# ✅ 2️⃣ UV MAPPING (pour skin Minecraft 64x64)
uv_faces = {
    "top":    (8,  0, 16,  8),
    "front":  (8,  8, 16, 16),
    "right":  (0,  8, 8,  16),
}

uv_faces_hat = {
    "top":    (40,  0, 48,  8),
    "front":  (40, 8, 48, 16),
    "right":  (32, 8, 40, 16),
}

# ----------------------------------------------------------------------
# ✅ 3️⃣ EXTRACTION DES FACES
print(f"✅ Chargement du skin : {INPUT_PATH}")
skin = Image.open(INPUT_PATH)
if skin.size != (64,64):
    raise ValueError("Skin Minecraft attendu en 64x64")
print(f"✅ Skin OK (64x64)")

for face in FACES_TO_KEEP:
    # Tête
    box = uv_faces[face]
    cropped = skin.crop(box)
    cropped.save(f"{OUTPUT_PREFIX}_{face}.png")
    print(f"✅ Saved: {OUTPUT_PREFIX}_{face}.png")

    # Overlay
    box_hat = uv_faces_hat[face]
    cropped_hat = skin.crop(box_hat)
    cropped_hat.save(f"{OUTPUT_PREFIX}_hat_{face}.png")
    print(f"✅ Saved: {OUTPUT_PREFIX}_hat_{face}.png")

print("✅ Extraction des faces terminée.")

# ----------------------------------------------------------------------
# ✅ 4️⃣ MAPPING 3D (Matplotlib)
# Faces sélectionnées seulement
face_files = {face: f"{OUTPUT_PREFIX}_{face}.png" for face in FACES_TO_KEEP}
face_files_hat = {face: f"{OUTPUT_PREFIX}_hat_{face}.png" for face in FACES_TO_KEEP}

# Angles et flips par face
ROTATIONS = {
    "front": 180,
    "right": 180,
    "top": 0
}
FLIPS = {
    "front": False,
    "right": True,
    "top": True
}

# Chargement et préparation des textures
def load_rotate_upscale(filename, angle, flip=False, size=64):
    img = Image.open(filename).convert("RGBA")
    if flip:
        img = img.transpose(Image.FLIP_LEFT_RIGHT)
    if angle != 0:
        img = img.rotate(angle, expand=True)
    img = img.resize((size, size), Image.NEAREST)
    return np.array(img) / 255.0

def load_textures(files):
    textures = {}
    for face, path in files.items():
        angle = ROTATIONS.get(face, 0)
        flip = FLIPS.get(face, False)
        textures[face] = load_rotate_upscale(path, angle, flip)
        print(f"✅ Loaded {face} with rotation {angle}° flip={flip}")
    return textures

textures = load_textures(face_files)
textures_hat = load_textures(face_files_hat)

print("✅ Toutes les textures (tête + overlay) prêtes.")

# ----------------------------------------------------------------------
# ✅ 5️⃣ RENDU 3D AVEC OVERLAY
print("1")
fig = plt.figure(figsize=(4,4))
ax = fig.add_subplot(111, projection='3d')
print("2")
def grid(size, scale=1.0):
    lin = np.linspace(-0.5 * scale, 0.5 * scale, size)
    return np.meshgrid(lin, lin)
print("3")
resolution = 64
X, Y = grid(resolution)
X_overlay, Y_overlay = grid(resolution, scale=1.05)
print("4")
def draw_face(xs, ys, zs, tex):
    ax.plot_surface(xs, ys, zs, rstride=1, cstride=1, facecolors=tex, shade=False)
print("5")
# TÊTE
if "top" in textures:
    draw_face(X, Y, np.full_like(X, 0.5), textures["top"])
if "front" in textures:
    draw_face(X, np.full_like(X, 0.5), Y, textures["front"])
if "right" in textures:
    draw_face(np.full_like(X, 0.5), X, Y, textures["right"])
print("6")
# OVERLAY (casque)
if "top" in textures_hat:
    draw_face(X_overlay, Y_overlay, np.full_like(X_overlay, 0.5), textures_hat["top"])
if "front" in textures_hat:
    draw_face(X_overlay, np.full_like(X_overlay, 0.5), Y_overlay, textures_hat["front"])
if "right" in textures_hat:
    draw_face(np.full_like(X_overlay, 0.5), X_overlay, Y_overlay, textures_hat["right"])
print("7")
# Vue et rendu
ax.view_init(elev=30, azim=45)
print("8")
ax.set_axis_off()
print("9")
ax.set_box_aspect([1,1,1])
print("10")
plt.tight_layout()
print("11")
plt.savefig(OUTPUT_RENDER, transparent=True, dpi=100)
print(f"✅ Rendu isométrique (faces partiales) sauvegardé dans {OUTPUT_RENDER}")
