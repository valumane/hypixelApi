import fs, { readFileSync } from 'fs'


const dir = fs.readdirSync('./unhead');
let res = []
let max = process.argv[2]

for (let i = 0; i < max; i++) {
    const file = dir[i]
    const parsed = JSON.parse(readFileSync("./unhead/" + file))
    let contentesclean = JSON.parse(
        parsed.nbttag
            .replace(/([{,\[]\s*)([a-zA-Z0-9_]+):/g, '$1"$2":')
            .replace(/\s*"\d+"\s*:/g, '')
            .replace(/:\s*(\d+)([bBsSlL])/g, ': "$1$2"')
    );
    let displayname = parsed.displayname
    let itemmodel = contentesclean.ItemModel

    if (itemmodel !== undefined) {
        res.push(itemmodel)
    }
    console.log(displayname, "|", itemmodel)


}
const uniques = [...new Set(res)];

console.log(uniques.length);
for (let i = 0; i < uniques.length; i++) {
    let t = uniques[i]
    console.log(t)
    fs.appendFileSync("res", `${t} \n`)
}

console.log(uniques.length)
console.log(res.length)