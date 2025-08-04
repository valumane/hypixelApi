
function createFarmingdiv(categories, collname, eta, progress,rank) {
  const container = document.getElementById(categories); //cible
  
  const itemCollectionDiv = document.createElement("div");
  itemCollectionDiv.className = "itemcollection"; 
  
  const itemEtImageDiv = document.createElement("div");
  itemEtImageDiv.className = "itemEtImage";


  const image = document.createElement("img");
  if(collname=="Gemstone"){
    image.src = "texture/collection/"+categories+"/"+collname+".gif";
  } else {
    image.src = "texture/collection/"+categories+"/"+collname+".png";
  }
  image.alt = name;
  image.width = 50; 
  image.height = 50; 


  const paragraph = document.createElement("p");
  paragraph.innerText = collname+" "+ rank;

  if(eta == "100%"){
    paragraph.style.color = "#ffa500";
  }

  if (progress.includes('undefined')) {
    progress = "";
  }

  
  const progressContainer = document.createElement("div");
  progressContainer.className = "progress-container";



  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar";
  progressBar.style.width = eta;


  const progressText = document.createElement("div");
  progressText.className = "progress-text";
  progressText.innerText = progress;


  progressBar.appendChild(progressText)
  progressContainer.appendChild(progressBar)
  itemEtImageDiv.appendChild(image)
  itemEtImageDiv.appendChild(paragraph)
  itemCollectionDiv.appendChild(itemEtImageDiv)
  itemCollectionDiv.appendChild(progressContainer)
  
  container.appendChild(itemCollectionDiv);
}

function createSkilldiv(skillName,eta,rank){
  const container = document.getElementById(skillName);


  const paragraph = document.createElement("p");
  paragraph.innerText = skillName+" "+rank;


  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar";
  progressBar.style.width = eta;



  const skillContainer = document.createElement("div");
  skillContainer.id = skillName+"Skill"

  const progressText = document.createElement("div");
  progressText.className = "progress-text";
  progressText.innerText = eta;

  const progressContainer = document.createElement("div")
  progressContainer.className = "progress-container"


  //progressContainer.appendChild()

  container.appendChild(paragraph);
  progressContainer.appendChild(progressBar)
  progressBar.appendChild(progressText)
  container.appendChild(progressContainer)

}
/*
<p> enchanting </p>

<div class="progress-bar" style="width: 50%;">
  <div class="progress-text"> 500/1000</div>
</div>


<div class=progress-container>
  <div class="progress-bar" style="width:100%"></div>
  <div class="progress-text"> 1.1m/2.7m (100%) </div>
</div>

*/
function createBestiarydiv(categories, nameMob, count, imgSrc = "") {
  const container = document.getElementById(categories);
  if (!container) {
    console.warn(`Container introuvable pour l'ID : ${categories}`);
    return;
  }

  const bestiaryCategorie = document.createElement("div");
  bestiaryCategorie.className = "bestiaryCategorie";

  const mobEtImage = document.createElement("div");
  mobEtImage.className = "mobEtImage";

  const img = document.createElement("img");
  img.className = "mobhead";

  if (imgSrc) {
    img.src = imgSrc;
  } else {
    img.src = `texture/mobs/${categories}/${nameMob}.webp`;
  }

  const name = document.createElement("p");
  name.innerText = nameMob;

  mobEtImage.appendChild(img);
  mobEtImage.appendChild(name);

  const countDiv = document.createElement("div");
  countDiv.className = "count";

  const progress = document.createElement("p");
  progress.innerText = `kills : ${count}`;
  countDiv.appendChild(progress);

  bestiaryCategorie.appendChild(mobEtImage);
  bestiaryCategorie.appendChild(countDiv);

  container.appendChild(bestiaryCategorie);
}


function toggleVisibility(id,n) {
  const element = document.getElementById(id);
  if (element.classList.contains("visible")) {
    element.classList.replace("visible", "hidden");
    if(n==1){putAtOriginalPosition(id)}
  } else {
    element.classList.replace("hidden", "visible");
    if(n==1){putAfterButton(id)}
  }
}

function get_childnodes_bestiary(){
  let all = document.getElementById('bestiary').childNodes;
  return all;
}

let originalPos;
async function divDetection() {
  let res = [];
  const nodes = get_childnodes_bestiary();
  for (let i = 1; i < nodes.length; i++) {
    const child = nodes[i];
    if (child instanceof HTMLElement) {
      if (child.getAttributeNames().includes('onclick')==false) {
        res.push([i,child]);
      }
    }
  }

  originalPos = res;
}


function putAfterButton(nomButton) {
  let divButton = null;
  let divToMove = null;

  // search onclick="toggleVisibility('nomButton')"
  for (let i = 0; i < get_childnodes_bestiary().length; i++) {
    const button = get_childnodes_bestiary()[i];
    if (
      button instanceof HTMLElement && button.getAttribute('onclick') &&
      button.getAttribute('onclick').includes(`'${nomButton}'`)
    ) {
      divButton = button;
      break;
    }
  }
  // search div correspondante dans divDetection()
  const original = originalPos;
  for (let i = 0; i < original.length; i++) {
    const div = original[i][1];
    if (div.id === nomButton) {
      divToMove = div;
      break;
    }
  }
  if (divButton && divToMove) {
    divButton.after(divToMove);
  } else {
    console.warn("Bouton ou div introuvable pour :", nomButton);
    console.log("div :",div)
    console.log("button :",divButton)
  }
}


function putAtOriginalPosition(nomDiv) {
  let div = null;
  const dom = get_childnodes_bestiary(); // liste childre de #bestiary

  // search la div dans le DOM
  for (let i = 0; i < dom.length; i++) {
    if (dom[i].id === nomDiv) {
      div = dom[i];
      break;
    }
  }

  // find origin pos dans divDetection
  let originalIndex = -1;
  for (let i = 0; i < originalPos.length; i++) {
    const [index, element] = originalPos[i];
    if (element.id === nomDiv) {
      originalIndex = index;
      break;
    }
  }

  // remet la div à sa originalpos
  if (div && originalIndex !== -1) {
    const parent = div.parentNode;
    const refNode = dom[originalIndex];
    
    if (refNode) {
      parent.insertBefore(div, refNode);
    } else {
      parent.appendChild(div); // fallback si l'index original est out of range
    }
  } else {
    console.warn("Impossible de remettre la div :", nomDiv);
  }
}



