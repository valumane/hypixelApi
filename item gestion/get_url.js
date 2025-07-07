import fs from 'fs';


const files = fs.readdirSync("./head")
function get_url(index) {
    const inputFiles = "head/" + files[index]

    const fileContents = JSON.parse(fs.readFileSync(inputFiles, 'utf8'))
    //console.log(fileContents.nbttag)
    let contentesclean = JSON.parse(fileContents.nbttag
        .replace(/([{,\[]\s*)([a-zA-Z0-9_]+):/g, '$1"$2":')
        .replace(/\s*"\d+"\s*:/g, '')
        .replace(/:\s*(\d+)([bBsSlL])/g, ': "$1$2"')
    )

    let skullownerproperties = contentesclean.SkullOwner.Properties
    const base64 = skullownerproperties.textures[0].Value;
    const decoded = JSON.parse(Buffer.from(base64, 'base64').toString('utf8'));
    const textureUrl = decoded.textures.SKIN.url;

    console.log(textureUrl)
}
get_url(0)