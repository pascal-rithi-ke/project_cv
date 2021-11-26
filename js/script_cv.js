// Fonction pour Imprimer/Enregistrer en PDF la page CV
function printDiv() {
    window.print();
}

// Récupérer Url Json server
const link_data = "http://localhost:3000/";

//Récupération data dans "owner" avec l'Url de base +le paramètre "cv"
function getdata(){
fetch(`${link_data}cv`)
.then((response) => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("NETWORK RESPONSE ERROR");
    }
    })
    .then(data => {
    console.log(data);
    //stock les données dans la fonction "displaydata";
    displaydata(data)
    })
    .catch((error) => console.error("FETCH ERROR:", error));
}getdata()

function displaydata(data){
// Création Obj "owner" pour pouvoir récupérer et éviter de taper toutes les informations
    const dataCV = {
        info : data[0].info[0],
        moreInfo : data[0].moreInfo,
        exp : data[0].experience[0],
        skill : data[0].skill[0],
        diploma : data[0].diploma[0]
    };

// Création des élements qui vont composer la page Cv avec le data de l'objet dataCV grâce à '$'
function templateCV($dataCV){
    // Récupération de id des divs où l'on va insérer les éléments
    const leftTopDiv = document.getElementById("photo_img");
    const rightTopDiv = document.getElementById("rightTop");
    const MiddleDiv1 = document.getElementById("middle1");
    const MiddleDiv2 = document.getElementById("middle2");
    const leftBotDiv = document.getElementById("bottom1");
    const rightBotDiv = document.getElementById("bottom2");

    // Création des éléments pour la mise en page
    const elemTitle = document.createElement("h2");
    const elemImg = document.createElement("img");
    const elemInfoP1 = document.createElement("p");
    const elemInfoP2 = document.createElement("p");
    const elemLeftBotP1 = document.createElement("p");
    const elemRighBotP2 = document.createElement("p");

 // "paramétrage" des éléments en précisant les informations de type src,id,title...
    elemImg.src= dataCV.info.photo;
    elemImg.id = "photo";
    elemTitle.innerHTML = dataCV.info.name+" "+dataCV.info.surname;
    elemTitle.id = "title";
    elemInfoP1.innerHTML = dataCV.moreInfo;
    elemInfoP1.id = "info1";
    elemInfoP2.innerHTML = dataCV.info.email+" | "+dataCV.info.promo+"<br>"+dataCV.info.phone+" | <a href='"+dataCV.info.link_git+"'>(Lien Git)</a>";
    elemInfoP2.id = "info2";
    elemLeftBotP1.innerHTML = "<li>Expérience<br>1er Stage BTS: "+dataCV.exp.bts1+"<br>2ème Stage 2ème année BTS: "+dataCV.exp.bts2+"<br>Alternance Bachelor: "+dataCV.exp.alter+"</li><br><li>Diplome Obtenu:<br>"+dataCV.diploma.bac+"<br>"+dataCV.diploma.bts+"</li>";
    elemLeftBotP1.id = "exp";
    elemRighBotP2.innerHTML = "<li>Compétence:<br>"+dataCV.skill.front+"<br>"+dataCV.skill.back+"<br>"+dataCV.skill.tool+"<br></li><li>"+dataCV.skill.framework+"</li>";
    elemRighBotP2.id = "skill";            
    
    // ajout des élments dans les divs parents attribués
    leftTopDiv.appendChild(elemImg);
    rightTopDiv.appendChild(elemTitle);
    MiddleDiv1.appendChild(elemInfoP1);
    MiddleDiv2.appendChild(elemInfoP2);
    leftBotDiv.appendChild(elemLeftBotP1);
    rightBotDiv.appendChild(elemRighBotP2);

    }templateCV();
}
