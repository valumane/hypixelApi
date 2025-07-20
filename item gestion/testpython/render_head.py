import sys
import os
import matplotlib.pyplot as plt
from PIL import Image
import numpy as np

# ----------------------------------------------------------------------
# ✅ 1️⃣ ARGUMENTS EN LIGNE DE COMMANDE
if len(sys.argv) < 2:
    print(f"❌ Usage: python {os.path.basename(__file__)} <skin.png>")
    sys.exit(1)

INPUT_PATH = sys.argv[1]
basename = os.path.splitext(os.path.basename(INPUT_PATH))[0]
OUTPUT_RENDER = f"{basename}_render.png"

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

# ----------------------------------------------------------------------
# ✅ 3️⃣ CHARGEMENT DU SKIN
print(f"✅ Chargement du skin : {INPUT_PATH}")
try:
    skin = Image.open(INPUT_PATH)
except FileNotFoundError:
    print(f"❌ Fichier introuvable : {INPUT_PATH}")
    sys.exit(1)

if skin.size != (64,64):
    raise ValueError("❌ Skin Minecraft attendu en 64x64")
# print(f"✅ Skin OK (64x64)\n")

# ----------------------------------------------------------------------
# ✅ 4️⃣ EXTRACTION DES FACES
print("---- Extraction des faces ----")

def extract_face(skin, uv_table, face, rotations, flips):
    box = uv_table[face]
    cropped = skin.crop(box)
    img = cropped.transpose(Image.FLIP_LEFT_RIGHT) if flips.get(face, False) else cropped
    img = img.resize(skin.size, Image.NEAREST)
    if rotations.get(face, 0):
        img = img.rotate(rotations[face], expand=True)
    return np.array(img) / 255.0

textures = {}
textures_hat = {}

print("-------- Head --------")
for face in uv_faces:
    textures[face] = extract_face(skin, uv_faces, face, ROTATIONS, FLIPS)
    print(f"✅ {face} overlay", end=" ")
print("")

print("------- Overlay -------")
for face in uv_faces_hat:
    textures_hat[face] = extract_face(skin, uv_faces_hat, face, ROTATIONS, FLIPS)
    print(f"✅ {face} overlay", end=" ")
print("")
print("-- Extraction terminée --\n")

# ----------------------------------------------------------------------
# ✅ 5️⃣ RENDU 3D AVEC OVERLAY
print("⏱️ Génération du rendu 3D")

fig = plt.figure(figsize=(4,4))
ax = fig.add_subplot(111, projection='3d')

def grid(size, scale=1.0):
    lin = np.linspace(-0.5 * scale, 0.5 * scale, size)
    return np.meshgrid(lin, lin)

resolution = 64
X, Y = grid(resolution)
X_overlay, Y_overlay = grid(resolution, scale=1.05)

def draw_face(xs, ys, zs, tex):
    ax.plot_surface(xs, ys, zs, rstride=1, cstride=1, facecolors=tex, shade=False)

# TÊTE
for face in ["top", "front", "right"]:
    if face in textures:
        if face == "top":
            draw_face(X, Y, np.full_like(X, 0.5), textures[face])
        elif face == "front":
            draw_face(X, np.full_like(X, 0.5), Y, textures[face])
        elif face == "right":
            draw_face(np.full_like(X, 0.5), X, Y, textures[face])

# OVERLAY (casque)
for face in ["top", "front", "right"]:
    if face in textures_hat:
        if face == "top":
            draw_face(X_overlay, Y_overlay, np.full_like(X_overlay, 0.5), textures_hat[face])
        elif face == "front":
            draw_face(X_overlay, np.full_like(X_overlay, 0.5), Y_overlay, textures_hat[face])
        elif face == "right":
            draw_face(np.full_like(X_overlay, 0.5), X_overlay, Y_overlay, textures_hat[face])

ax.view_init(elev=30, azim=45)
ax.set_axis_off()
ax.set_box_aspect([1,1,1])
plt.tight_layout()

plt.savefig(OUTPUT_RENDER, transparent=True, dpi=100)
print(f"✅ Rendu sauvegardé dans {OUTPUT_RENDER}")
