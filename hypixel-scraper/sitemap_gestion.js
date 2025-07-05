import fs from 'fs';

const inputFile = './sitemap/sitemap_fail.ndjson';
const fileContents = fs.readFileSync(inputFile, 'utf8');

// Split en lignes (et filtrer vides)
const lines = fileContents.split('\n').filter(line => line.trim() !== '');

// Parser chaque ligne individuellement
const allUrls = lines.map(line => JSON.parse(line));


function appendJsonLine(file, obj) {
  fs.appendFileSync(file, JSON.stringify(obj) + '\n');
}


let sortlist = [
  { name: "./gestion/crystal", tag: "Crystal", categoryTag: "System", tagList: [] },
  { name: "./gestion/Trophy_Fish", tag: "", categoryTag: "Trophy Fish", tagList: [] },
  { name: "./gestion/Abiphone", tag: "Abi", categoryTag: "", tagList: [] },
  { name: "./gestion/skin", tag: "Skin", categoryTag: "Cosmetic", tagList: [] },
  { name: "./gestion/campfire", tag: "campfire", categoryTag: "Accessory", tagList: [] },
  { name: "./gestion/gemstone", tag: "GEM", categoryTag: "", tagList: [] },
  { name: "./gestion/version", tag: "Version", categoryTag: "", tagList: [] },
  { name: "./gestion/portal", tag: "portal", categoryTag: "", tagList: [] },
  { name: "./gestion/bazaar", tag: "%26r", categoryTag: "", tagList: [] },
  { name: "./gestion/Hat_Of_Celebration", tag: "Hat_Of_Celebration", categoryTag: "", tagList: [] }
  
  
  
]

function seconde() {
  let firstlength = allUrls.length;

  for (let i = allUrls.length - 1; i >= 0; i--) {
    const urlLine = allUrls[i].url;
    const categoryLine = allUrls[i].category;

    let matched = false;

    for (let sortindex = 0; sortindex < sortlist.length; sortindex++) {
      const tag = sortlist[sortindex].tag;
      const categoryTag = sortlist[sortindex].categoryTag;

      const urlMatchesTag = tag !== "" && urlLine.toLowerCase().includes(tag.toLowerCase());
      const categoryMatches = categoryTag !== "" && categoryLine === categoryTag;

      if (
        (tag !== "" && categoryTag !== "" && urlMatchesTag && categoryMatches) ||
        (tag === "" && categoryTag !== "" && categoryMatches) ||
        (tag !== "" && categoryTag === "" && urlMatchesTag)
      ) {
        sortlist[sortindex].tagList.push(allUrls[i]);
        allUrls.splice(i, 1);
        matched = true;
        break;
      }
    }

    if (matched) continue;
  }

  // Écriture des fichiers
  for (let i = 0; i < sortlist.length; i++) {
    const filename = sortlist[i].name + '.json';
    const data = JSON.stringify(sortlist[i].tagList, null, 2);
    fs.writeFileSync(filename, data, 'utf8');
  }
  const otherFormatted = '[\n  ' + allUrls.map(obj => JSON.stringify(obj)).join(', \n  ') + '\n]\n';
  fs.writeFileSync('./gestion/other.json', otherFormatted, 'utf8');
  for (let i = 0; i < sortlist.length; i++) {
    console.log(sortlist[i].name, ":", sortlist[i].tagList.length);
  }
  console.log("./gestion/other.json : ", allUrls.length);
}
seconde()

function testsort(index) {
  sortlist[index].tagList = allUrls.filter(obj => {
    if (sortlist[index].tag !== "") {
      return obj.url.includes(sortlist[index].tag) && obj.category === sortlist[index].categoryTag;
    } else {
      return obj.category === sortlist[index].categoryTag;
    }
  });

  console.log(`------ RESULT for sortlist[${index}] ------`);
  console.log(sortlist[index].tagList);
  console.log(`Count: ${sortlist[index].tagList.length}`);
}
//testsort(2)


function first(index) {
  let category = allUrls[index].category
  let url = allUrls[index].url


  console.log(category)
  console.log(url)
}
//first(0)


function test() {
  for (let i = 0; i < allUrls.length; i++) {
    let category = allUrls[i].category
    let url = allUrls[i].url


    console.log("---------------")


  }
}