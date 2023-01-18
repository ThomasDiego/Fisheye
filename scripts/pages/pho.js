const id = new URLSearchParams(window.location.search).get("id");
let mediasList = [];

async function getPhotographJson() {
    const response = await fetch("./data/photographers.json");
    return await response.json();
}

async function getPhotographInfos() {
    const datas = await getPhotographJson();
    //
    //
    const photographer = datas.photographers.find(photographer => photographer.id == id);
    //if photographer is not found, redirect to index.html
    if(!photographer) {
        window.location.href = "./index.html";
    }
    displayPhotographInfosCard(photographer);
    //changer le titre du contact modal
    const contactModalTitle = document.querySelector(".contactTitle");
    contactModalTitle.innerHTML = "Contactez-moi<br>" + photographer.name;
    //
    //
    const medias = datas.media.filter(media => media.photographerId == id);
    mediasList = medias;
    displayMedias(medias);
}

async function displayMedias(medias) {
    const mediasSectionHtml = document.querySelector(".media-section")
    mediasSectionHtml.innerHTML = "";
    let tabindex = 1;
    medias.forEach((media) => {
        //create element .mediaCard with data-id = media.id and apppend mediamodel.getHtml() to it
        const mediaCard = document.createElement("div");
        mediaCard.classList.add("mediaCard");
        mediaCard.setAttribute("data-id", media.id);
        //add tabindex to mediaCard
        tabindex++;
        const mediaModel = new Media(media);
        mediaCard.innerHTML = mediaModel.getHtml();
        mediasSectionHtml.appendChild(mediaCard);
        updateTotalLikesDiv();
    });
}

function displayPhotographInfosCard(infos) {
    const photographerModel = photographerFactory(infos);
    const photographerCard = photographerModel.getUserHeaderPhotographerDom();
    const photographerSection = document.querySelector(".photograph-header");
    photographerSection.innerHTML = photographerCard;
}

function lightBox(id) {
    const lightBox = document.querySelector(".lightBox");
    lightBox.setAttribute("data-id", id);
    lightBox.style.display = "flex";
    const media = mediasList.find(media => media.id == id);
    const mediaModel = new Media(media);
    lightBox.querySelector(".lightBoxImage").innerHTML = mediaModel.getLightBoxHtml();
    lightBox.querySelector(".lightBoxTitle").innerHTML = media.title
}

function closeLightBox() {
    const lightBox = document.querySelector(".lightBox");
    lightBox.style.display = "none";
}
function closeContactModal(){
    const contactModal = document.querySelector("#contact_modal");
    contactModal.style.display = "none";
}
function like(id) {
    let mediaElement = document.querySelector(`.mediaCard[data-id="${id}"]`);
    const media = mediasList.find(media => media.id == id);
    const mediaLike = new Media(media);
    mediaLike.like();
    mediaElement.innerHTML = mediaLike.getHtml();
    updateTotalLikesDiv()
}
function updateTotalLikesDiv() {
    const totalLikes = mediasList.reduce((total, media) => total + media.likes, 0);
    document.querySelector(".mediaStatsRight").innerHTML = totalLikes + "/jours";
}

function getFilters() {
    document.querySelector(".filterDropdown").innerHTML =
        `
    <div>
    <div class="filterTitleUp" onclick="filter('Date')">Date</div>
    <hr>
    <div class="filterOther" onclick="filter('Popularité')">Popularité</div>
    <hr>
    <div class="filterOther" onclick="filter('Titre')">Titre</div>
    </div>
    `;
}

function filter(filter) {
    document.querySelector(".filterDropdown").innerHTML = `<div class='filterTitle' onclick="getFilters()">${filter}</div>`;
    if (filter == "Popularité") {
        mediasList.sort((a, b) => b.likes - a.likes);
    }
    else if (filter == "Date") {
        mediasList.sort((a, b) => b.date - a.date);
    }
    else if (filter == "Titre") {
        mediasList.sort((a, b) => a.title.localeCompare(b.title));
    }
    displayMedias(mediasList);
}

function arrowMedia(action) {
    if (document.querySelector(".lightBox").style.display == "none" || document.querySelector(".lightBox").style.display == "") {
        return;
    }else{
    let actionMedia
    if (action == "next") {
        actionMedia = 1
    } else {
        actionMedia = -1
    }
    const lightBox2 = document.querySelector(".lightBox");
    const id = parseInt(lightBox2.getAttribute("data-id"));
    const media = mediasList.find(media => media.id == id);
    const index = mediasList.indexOf(media);
    const nextMedia = mediasList[index + actionMedia];
    if (nextMedia) {
        lightBox(nextMedia.id);
    }
}
}
document.addEventListener("keydown", function (event) {
    if (event.key == "ArrowLeft") {
        arrowMedia("previous");
    }
    if (event.key == "ArrowRight") {
        arrowMedia("next");
    }
    //echap pour fermer la lightbox ou fermer le contact modal
    if (event.key == "Escape") {
        if (document.querySelector(".lightBox").style.display == "flex") {
            closeLightBox();
        }
        if (document.querySelector("#contact_modal").style.display == "block") {
            closeContactModal();
        }
    }
});
getPhotographInfos();

//console log event listener for testing
document.addEventListener("click", function (event) {
    console.log(event.target);
});