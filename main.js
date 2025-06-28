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
  console.log("chargement fini")
}
