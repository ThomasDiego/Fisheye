//Mettre le code JavaScript lié à la page photographer.html
const id = new URLSearchParams(window.location.search).get("id");
let totalLikes = 0;
let allMedias = [];

async function getPhotographersDatas() {
    const response = await fetch("./data/photographers.json");
    return await response.json();
}

async function displayDataOfPhotographers() {
    const datas = await getPhotographersDatas();
    //Rechercher les information du photophage
    const photographer = datas.photographers.find(photographer => photographer.id == id);
    //Rechercher les médias du photographe
    const medias = datas.media.filter(media => media.photographerId == id);
    //Appeler la fonction pour afficher le header du photographe
    HeaderPhotographe(photographer);
    //trier les médias par popularité
    medias.sort((a, b) => b.likes - a.likes);
    allMedias = medias;
    DisplayMedias(allMedias);
}

function HeaderPhotographe(photographer) {
    const header = document.querySelector(".photograph-header");
    const name = document.createElement("h2");
    //Ajouter la classname au h2 namePhotographer
    name.setAttribute("class", "namePhotographer");
    name.textContent = photographer.name;
    const city = document.createElement("div");
    //Ajouter une classname au div cityPhotographer
    city.setAttribute("class", "cityPhotographer");
    city.textContent = photographer.city + ", " + photographer.country;
    const tagline = document.createElement("div");
    //Ajouter une classname au div taglinePhotographer
    tagline.setAttribute("class", "taglinePhotographer");
    tagline.textContent = photographer.tagline;

    //créer une image avec le portrait du photographe
    const img = document.createElement("img");
    img.setAttribute("src", `assets/photographers/${photographer.portrait}`);
    img.setAttribute("alt", `Portrait de ${photographer.name}`);
    img.setAttribute("class", "imgHeader");

    //créer un bouton pour contacter le photographe <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
    const button = document.createElement("button");
    button.textContent = "Contactez-moi";
    button.setAttribute("class", "contact_button");
    button.setAttribute("onclick", "displayModal()");

    //Separer les elements
    const leftHeader = document.createElement("div");
    leftHeader.setAttribute("class", "leftHeader");
    const centerHeader = document.createElement("div");
    centerHeader.setAttribute("class", "centerHeader");
    const rightHeader = document.createElement("div");
    rightHeader.setAttribute("class", "rightHeader");
    //afficher les elements

    //mettre à jour le tarif journalier
    document.querySelector(".mediaStatsRight").textContent = photographer.price + "€ / jour";
    header.appendChild(leftHeader);
    header.appendChild(centerHeader);
    header.appendChild(rightHeader);
    leftHeader.appendChild(name);
    leftHeader.appendChild(city);
    leftHeader.appendChild(tagline);
    centerHeader.appendChild(button);
    rightHeader.appendChild(img);

    //changer le titre du contact modal
    const contactModalTitle = document.querySelector(".contactTitle");
    contactModalTitle.innerHTML = "Contactez-moi<br>" + photographer.name;
}

function DisplayMedias(medias) {
    const photographMediaSection = document.querySelector(".media-section");
    //afficher les médias
    const mediaFactory = new MediaFactory();
    photographMediaSection.innerHTML = "";
    medias.forEach((media) => {
        const { title, likes, id, alt } = media;
        const mediaHtml = mediaFactory.renderMedia(media);
        totalLikes = totalLikes + likes;
        const mediaHtmlTemplate = `
        <div class="media" data-id="${id}">
            <div class="mediaHeader" onclick="lightBox(${id})">
            <a href="#" class="media-image" aria-label="${alt}, closeup view">${mediaHtml.outerHTML}</a>
            </div>
            <div class="mediaBody">
            <div class="mediaTitle">${title}</div>
            <div class="mediaLikes">
                <div class="mediaLikesCounter">${likes}</div>
                <button class="mediaLikes" onclick="addLike(${id})">
                <em class="likeButton fas fa-heart"></em>
                </button>
            </div>
            </div>
        </div>
        `;
        photographMediaSection.insertAdjacentHTML(
            "beforeend",
            mediaHtmlTemplate
        );
    });
    updateTotalLikesDiv();
}
function addLike(id) {
    const media = document.querySelector(`[data-id="${id}"]`);
    const mediaLikes = media.querySelector(".mediaLikesCounter");
    const mediaLikesCounter = parseInt(mediaLikes.textContent);
    mediaLikes.textContent = mediaLikesCounter + 1;
    totalLikes++;
    updateTotalLikesDiv()
}

function updateTotalLikesDiv() {
    const totalLikesDiv = document.querySelector(".mediaStatsCount");
    totalLikesDiv.textContent = totalLikes;
}

function lightBox(id) {
    const lightBox = document.querySelector(".lightBox");
    //lightBox to display flex
    lightBox.style.display = "flex";
    //Ajouter un attribut data-id à la lightBox
    lightBox.setAttribute("data-id", id);
    //Trouver le média qui a l'id correspondant
    const media = allMedias.find(media => media.id == id);
    //Mettre le titre du média dans la lightBox
    const title = document.querySelector(".lightBoxTitle");
    title.textContent = media.title;
    //Mettre l'image du média dans la lightBox
    const lightBoxImage = document.querySelector(".lightBoxImage");
    lightBoxImage.innerHTML = "";
    //check si c'est une image ou une video
    if (media.image) {
        const img = document.createElement("img");
        img.setAttribute("src", `/assets/medias/${media.image}`);
        img.setAttribute("alt", media.title);
        //Ajouter une classe à l'image
        img.setAttribute("class", "lightBoxImg");
        lightBoxImage.appendChild(img);
    }
    else {
        const video = document.createElement("video");
        video.setAttribute("src", `/assets/medias/${media.video}`);
        video.setAttribute("alt", media.title);
        //Ajouter les controles à la vidéo pour ne pas avoir une image fixe
        video.setAttribute("controls", "controls");
        //Ajouter la classe à la vidéo
        video.setAttribute("class", "lightBoxImg");
        lightBoxImage.appendChild(video);
    }
}

function closeLightBox() {
    const lightBox = document.querySelector(".lightBox");
    lightBox.style.display = "none";
}

function arrowMedia(action) {
    let actionMedia
    if (action == "next") {
        actionMedia = 1
    } else {
        actionMedia = -1
    }
    const lightBox2 = document.querySelector(".lightBox");
    const id = parseInt(lightBox2.getAttribute("data-id"));
    const media = allMedias.find(media => media.id == id);
    const index = allMedias.indexOf(media);
    const nextMedia = allMedias[index + actionMedia];
    if (nextMedia) {
        lightBox2.setAttribute("data-id", nextMedia.id);
        lightBox(nextMedia.id);
    }
}
//Ajouter un eventlistener sur les touches du clavier pour faire défiler les médias
document.addEventListener("keydown", function (event) {
    if (event.key == "ArrowLeft") {
        arrowMedia("previous");
    }
    if (event.key == "ArrowRight") {
        arrowMedia("next");
    }
});

//Ajouter un eventlistener sur le click de filterTitle
const filterTitle = document.querySelector(".filterTitle");
filterTitle.addEventListener("click", function () {
    const filterOther = document.querySelector(".filterOther");
    const filter = document.querySelector(".filterDropdown");
    const hr = filter.querySelector("hr");
    if (filterOther.style.display == "none") {
        filterOther.style.display = "flex";
        hr.style.display = "block";
        //rotation du background-image de filterTitle
        filterTitle.style.backgroundImage = "url(../assets/icons/chevron-up.svg)";
    } else {
        filterOther.style.display = "none";
        hr.style.display = "none";
        //rotation du background-image de filterTitle
        filterTitle.style.backgroundImage = "url(../assets/icons/chevron-down.svg)";
    }
});

function filter() {
    const filterTitle = document.querySelector(".filterTitle");
    const filterOther = document.querySelector(".filterOther");
    const filter = document.querySelector(".filterDropdown");
    const hr = filter.querySelector("hr");
    if (filterOther.textContent === "Titre") {
        const medias = allMedias.sort((a, b) => a.title.localeCompare(b.title));
        //Changer valeur de filterOther & filterTitle
        filterOther.textContent = "Popularité";
        filterTitle.textContent = "Titre";
        DisplayMedias(medias);
    } else {
        const medias = allMedias.sort((a, b) => b.likes - a.likes);
        //Changer valeur de filterOther & filterTitle
        filterOther.textContent = "Titre";
        filterTitle.textContent = "Popularité";
        DisplayMedias(medias);
    }
    //cacher le dropdown
    filterOther.style.display = "none";
    hr.style.display = "none";
    filterTitle.style.backgroundImage = "url(../assets/icons/chevron-down.svg)";
}
displayDataOfPhotographers();