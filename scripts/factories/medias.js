class Media {
    constructor(...datas) {
        this.datas = datas
    }

    checkImageOrVideo() {
        if (this.datas[0].image) {
            return "image";
        } else if (this.datas[0].video) {
            return "video";
        }
    }

    getMediaThumbnail() {
        if (this.checkImageOrVideo() === "image") {
            const html = ` <img tabindex="0" onclick="lightBox(${this.datas[0].id})" class="miniatureMedia" src="assets/medias/${this.datas[0].image}" alt="${this.datas[0].alt}"> `
            return html;
        } else if (this.checkImageOrVideo() === "video") {
            const html = ` <video tabindex="0" onclick="lightBox(${this.datas[0].id})" class="miniatureMedia" src="assets/medias/${this.datas[0].video}" type="video/mp4"></video> `
            return html;
        }
    }

    checkIfLiked() {
        if (this.datas[0].liked) {
            return "fas fa-heart"
        } else {
            return "far fa-heart"
        }
    }

    like() {
        if (this.datas[0].liked) {
            this.datas[0].liked = false;
            this.datas[0].likes--;
        } else {
            this.datas[0].liked = true;
            this.datas[0].likes++;
        }
    }

    getHtml() {
        const html =
            `
            <card class="media" data-id="${this.datas[0].id}">
            <div class="mediaHeader">
            <div class="media-image" aria-label="${this.datas[0].alt}, closeup view">${this.getMediaThumbnail()}</div>
            </div>
            <div class="mediaBody">
            <div class="mediaTitle">${this.datas[0].title}</div>
            <div class="mediaLikes">
                <div class="mediaLikesCounter">${this.datas[0].likes}</div>
                <button class="mediaLikes" onclick="like(${this.datas[0].id})">
                <em class="likeButton ${this.checkIfLiked()}"></em>
                </button>
            </div>
            </div>
        </card>
        `
        return html
    }

    getLightBoxHtml() {
        if (this.checkImageOrVideo() === "image") {
            const html = `<img class="lightBoxImg" src="assets/medias/${this.datas[0].image}" alt="${this.datas[0].alt}">`
            return html
        } else if (this.checkImageOrVideo() === "video") {
            const html = `<video controls class="lightBoxImg" src="assets/medias/${this.datas[0].video}" type="video/mp4"></video>`
            return html
        }
    }
}