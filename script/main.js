//pseudo to uuid
const username = "valu66";
let uuid
fetch(`https://playerdb.co/api/player/minecraft/${username}`)
  .then(res => res.json())
  .then(data => {
    uuid = data.data.player.id;
    console.log(`UUID de ${username} :`, uuid);
  });

// Define the API URL
const Collection = 'https://api.hypixel.net/resources/skyblock/collections';


function sanitizeDate(date) {
  const pad = n => String(n).padStart(2, '0');

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // les mois commencent à 0
  const year = date.getFullYear();

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function formatMinecraftTextToHTML(text) {
  const colorMap = {
    '0': '#000000', '1': '#0000AA', '2': '#00AA00', '3': '#00AAAA',
    '4': '#AA0000', '5': '#AA00AA', '6': '#FFAA00', '7': '#AAAAAA',
    '8': '#555555', '9': '#5555FF', 'a': '#55FF55', 'b': '#55FFFF',
    'c': '#FF5555', 'd': '#FF55FF', 'e': '#FFFF55', 'f': '#FFFFFF'
  };

  const formatMap = {
    'l': 'font-weight: bold',
    'm': 'text-decoration: line-through',
    'n': 'text-decoration: underline',
    'o': 'font-style: italic',
    'r': 'reset'
  };

  let html = '';
  let currentStyles = [];

  const parts = text.split(/§([0-9a-frlomn])/gi);

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      // Texte
      if (parts[i]) {
        let style = currentStyles.join('; ');
        html += `<span style="${style}">${parts[i]}</span>`;
      }
    } else {
      const code = parts[i].toLowerCase();

      if (code === 'r') {
        currentStyles = [];
      } else if (colorMap[code]) {
        // Ajout d'une couleur → on remplace toutes les couleurs précédentes
        currentStyles = currentStyles.filter(s => !s.startsWith('color'));
        currentStyles.push(`color: ${colorMap[code]}`);
      } else if (formatMap[code]) {
        currentStyles.push(formatMap[code]);
      }
    }
  }

  return html;
}


function convertirTempsUnix(tempsUnix) {
  const date = new Date(tempsUnix);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short'
  };

  return date.toLocaleString('fr-FR', options);
}

function roundNumber(number) {
  if (number >= 1_000_000_000) {
    return (number / 1_000_000_000).toFixed(2) + 'b';
  } else if (number >= 1_000_000) {
    return (number / 1_000_000).toFixed(1) + 'm';
  } else if (number >= 1_000) {
    return (number / 1_000).toFixed(1) + 'k';
  } else {
    return number.toString();
  }
}


function formatNombre(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}


let allapi = null;
let apiUrl = "";

async function apiGet() {
  try {
    const api_key_response = await fetch('api_key.json');
    const api_key_data = await api_key_response.json();
    const apikey = api_key_data.key;
    //console.log(apikey);

    const apiUrl1 = 'https://api.hypixel.net/v2/skyblock/profiles?key=' + apikey + '&uuid=' + uuid;
    apiUrl = apiUrl1;
    console.log(apiUrl);

    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('API non disponible');

    const data = await response.json();
    allapi = data;
    console.log('Données récupérées depuis l\'API', allapi);

  } catch (err) {
    console.warn('Erreur avec l\'API, chargement du fichier backup.json…', err);
    const backupResponse = await fetch('backup_API.json');
    const backupData = await backupResponse.json();
    allapi = backupData;
    console.log('Données chargées depuis backup.json', allapi);
  }
}


var membersInfo
async function getmemberinfo() {
  membersInfo = allapi.profiles[0].members["aa3e247ff9d2418eaadc949c77aafc7d"]
}


var allCollection;
async function getCollection() {
  const response = await fetch(Collection);
  const data = await response.json();

  allCollection = data.collections;
  farmingCollection = allCollection.FARMING.items;
  miningCollection = allCollection.MINING.items;
  combatCollection = allCollection.COMBAT.items;
  foragingCollection = allCollection.FORAGING.items;
  fishingCollection = allCollection.FISHING.items;
  riftCollection = allCollection.RIFT.items;
}


var allCollected;
async function getCollected() {
  allCollected = allapi.profiles[0].members['aa3e247ff9d2418eaadc949c77aafc7d'].collection;
}

function sumAllTiers(coll) {
  var tmp = 0;
  for (i = 0; i < coll.length; i++) {
    tmp += coll[i].amountRequired
  }
  return tmp;
}


function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function main() {
  await apiGet();
  console.log("apiget fait");

  await getCollection();
  console.log("getcollection fait")

  await getCollected()
  console.log("getcollected fait")

  await getAllFarming()
  console.log("getallfarming fait")

  await getmemberinfo()
  console.log("getmemberinfo fait")

  await load_profies()
  console.log("load_profies fait")

  await getBestiary()
  console.log("getbestiary fait")

  await showAllBestiary()
  console.log("showallbestiary fait")

  await divDetection()
  console.log("divDetection fait")

  await mainhotm()
  console.log("hotm fait")

  await load_inventory(); console.log("inventory loaded")
  document.getElementById("load").innerText = "chargement fini"
  console.log("chargement fini")
}

async function test(name) {
  try {
    const urlHead = `https://raw.githubusercontent.com/valumane/hypixel_texture/main/head/${name}.json`;
    const resHead = await fetch(urlHead);
    if (resHead.ok) {
      const data = await resHead.json();
      return data.img;
    }

    const urlNotSkull = `https://raw.githubusercontent.com/valumane/hypixel_texture/main/notskull/${name}.json`;
    const resNotSkull = await fetch(urlNotSkull);
    if (resNotSkull.ok) {
      const data = await resNotSkull.json();
      return data.itemid;
    }

    return null;
  } catch {
    return null;
  }
}

async function test2(param) {
  const itemimg = await test(param);
  let url = "../texture/background/default.png";

  if (itemimg && itemimg.startsWith("minecraft:")) {
    const id = itemimg.replace("minecraft:", "");
    const testUrl = `https://raw.githubusercontent.com/valumane/hypixel_texture/main/block/images/${id}.png`;
    const res = await fetch(testUrl);
    if (res.ok) {
      url = testUrl;
    }
  } else if (itemimg) {
    url = itemimg; // déjà une image directe (cas skull)
  }
  return url;
}
