const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");

let isReady = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const count = 5;
const apiKey = "7Ub2M6sCg9dfXkRYKXtjF79jk-JeHiWBaahlLhMMVcI";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&orientation=landscape`;

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    isReady = true;
    loader.hidden = true;
    count = 30;
  }
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener("load", imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    console.log(count);
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {}
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    isReady
  ) {
    isReady = false;
    getPhotos();
  }
});

getPhotos();
