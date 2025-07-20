import http from 'http'
import fs from 'fs'

let url = "http://textures.minecraft.net/texture/185484498537f510f17da60558b0cff50e671a7d239b816bab63e82706736ea8"

function get_img(url) {
    http.get(url, (res) => {
        res.pipe(fs.createWriteStream('texture.png'));
    });
}
get_img(url)