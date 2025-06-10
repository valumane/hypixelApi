// Define the API URL
const uuid = 'aa3e247f-f9d2-418e-aadc-949c77aafc7d'
const Collection = 'https://api.hypixel.net/resources/skyblock/collections';


function convertirTempsUnix(tempsUnix) {
  // Vérifiez si le temps Unix est donné en secondes ou en millisecondes
  // Si c'est un temps en secondes, multipliez par 1000 pour obtenir des millisecondes
  const timestamp = tempsUnix < 1e12 ? tempsUnix * 1000 : tempsUnix;

  // Créez un objet Date avec le temps Unix en millisecondes
  const date = new Date(timestamp);

  // Formatez la date pour un affichage lisible
  const options = {
    weekday: 'long', // Nom du jour
    year: 'numeric', // Année
    month: 'long', // Nom du mois
    day: 'numeric', // Jour du mois
    hour: 'numeric', // Heure
    minute: 'numeric', // Minute
    second: 'numeric', // Seconde
    timeZoneName: 'short' // Fuseau horaire
  };

  // Retournez la date formatée en fonction des options définies
  return date.toLocaleString('fr-FR', options);
}

function formatNumber(number) {
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


let allapi = null;
let apiUrl = "";

async function apiGet() {
  try {
    const api_key_response = await fetch('api_key.json');
    const api_key_data = await api_key_response.json();
    const apikey = api_key_data.key;
    console.log(apikey);
    
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
function getmemberinfo(){
  membersInfo = allapi.profiles[0].members["aa3e247ff9d2418eaadc949c77aafc7d"]
}


var allCollection;
function getCollection(){

  fetch(Collection)
  .then(response => response.json())
  .then(data => {
    allCollection = data.collections;
    farmingCollection = allCollection.FARMING.items;
    miningCollection = allCollection.MINING.items;
    combatCollection= allCollection.COMBAT.items;
    foragingCollection= allCollection.FORAGING.items;
    fishingCollection= allCollection.FISHING.items;
    riftCollection= allCollection.RIFT.items;
  });

}

var allCollected;
function getCollected() {
  allCollected = allapi.profiles[0].members['aa3e247ff9d2418eaadc949c77aafc7d'].collection;
}


var bankinfo;
function getBankInfo(){
  bankinfo = allapi.profiles[0].banking;
  document.getElementById("bankValue").innerText = "bank value : " + formatNumber(Math.round(bankinfo.balance))
}



function sumAllTiers(coll ){
  var tmp=0;
  for(i=0;i<coll.length;i++){
    tmp += coll[i].amountRequired
  }
  return tmp;
}


function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function main() {
  

apiGet()
setTimeout(getCollection,1000);
setTimeout(getCollected,1500);
setTimeout(getAllFarming,2000)
setTimeout(getmemberinfo,1000)
setTimeout(setLevel,1000)
setTimeout(getBankInfo,1000)
setTimeout(getBestiary,1000)
setTimeout(showAllBestiary,1000)
setTimeout(divDetection,1000)
setTimeout(loadhotm,1000)

}




