$index = $args[0]

# Appeler get_url.js avec l'index
$url = node .\get_url.js $index
Write-Output "Node output: $url"

# Séparer displayname et texture URL
$parts = $url -split '\|'
$displayname = $parts[0].Trim()
$textureurl = $parts[1].Trim()

Write-Output "Displayname: $displayname"
Write-Output "Texture URL: $textureurl"

# Générer le render
python.exe .\testpython\render_head.py .\testpython\headfile1.png

$img = ".\headfile1_render.png"
Write-Output "Image file: $img"

# Convertir en base64
$base64 = python.exe .\testpython\png_to_base64.py $img
Write-Output "Base64: $base64"
