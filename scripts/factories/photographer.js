function photographerFactory(data) {
    const { name, portrait, id, tagline, city, price } = data;

    const picture = `assets/photographers/${portrait}`;
    const altPicture = `Portrait de ${name}`;

    function getUserHeaderPhotographerDom() {
        const html = `
        <div class="leftHeader">
          <h2 class="namePhotographer">${name}</h2>
          <div class="cityPhotographer">${city}</div>
          <div class="taglinePhotographer">${tagline}</div>
        </div>
        <div class="centerHeader"><button class="contact_button" onclick="displayModal()">Contactez-moi</button></div>
        <div class="rightHeader"><img src="${picture}" alt="${altPicture}"
            class="imgHeader"></div>
        `;
        return html;
    }
    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        //Créer un lien vers la page du photographe
        const link = document.createElement('a');
        link.setAttribute("href", `photographer.html?id=${id}`);
        //Ajouter une classe au lien
        link.setAttribute("class", "photographLink");
        img.setAttribute("src", picture)
        img.setAttribute("alt", altPicture)
        //Ajouter une classe à l'image
        img.setAttribute("class", "photographImg");
        const h2 = document.createElement('h2');
        //Ajouter une classe au h2
        h2.setAttribute("class", "photographName");
        h2.textContent = name;
        //créer un element pour la ville en dessous du nom
        const city2 = document.createElement('div');
        //Ajouter une classe à la ville
        city2.setAttribute("class", "photographCity");
        city2.textContent = city;
        //créer un element pour la tagline en dessous de la ville
        const tagline2 = document.createElement('div');
        //Ajouter une classe à la tagline
        tagline2.setAttribute("class", "photographTagline");
        tagline2.textContent = tagline;
        //Créer un élément pour le prix en dessous de la tagline
        const price2 = document.createElement('div');
        //Ajouter une classe au prix
        price2.setAttribute("class", "photographPrice");
        price2.textContent = price + "€/jour";

        //Ajouter les éléments au DOM
        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(city2);
        article.appendChild(tagline2);
        article.appendChild(price2);
        return (article);
    }
    return { name, picture, id, getUserCardDOM, getUserHeaderPhotographerDom }
}