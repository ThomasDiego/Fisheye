class MediaFactory {
    renderMedia(media) {
        if (media.hasOwnProperty("image")) {
            return new ImageFactory().createHTML(media);
        }
        if (media.hasOwnProperty("video")) {
            return new VideoFactory().createHTML(media);
        }
        return null;
    }
}

class ImageFactory {
    createHTML(media) {
        const image = document.createElement("img");
        image.setAttribute("src", `assets/medias/${media.image}`);
        image.setAttribute("alt", `${media.alt}`);
        image.setAttribute("class", "miniatureMedia");
        return image;
    }
}

class VideoFactory {
    createHTML(media) {
        const video = document.createElement("video");
        const source = document.createElement("source");
        source.setAttribute("src", `assets/medias/${media.video}`);
        source.setAttribute("type", "video/mp4");
        video.setAttribute("class", "miniatureMedia");
        video.appendChild(source);

        return video;
    }
}
