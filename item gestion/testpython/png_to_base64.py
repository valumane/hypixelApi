import base64

with open("head_render_overlay_partial.png", "rb") as f:
    encoded = base64.b64encode(f.read()).decode("utf-8")
    
data_url = f"data:image/png;base64,{encoded}"
print(data_url)