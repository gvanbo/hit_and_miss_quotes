const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let readyForMoreImages = false;
let countImagesLoaded = 0;
let totalImagesLoaded = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = "ZOoVG9uAgH0Jl7Dzvo7XI6MYhBj5cBx1L1GS-fRZNzs";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query="horse"`;

//check if all images are loaded
function isImageLoaded() {
    countImagesLoaded++;
    if (countImagesLoaded === totalImagesLoaded) {
        readyForMoreImages = true
        loader.hidden = true
        count = 30;
    } 
} 

//Helper functino to set attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create elements for links and photos and add to DOM
function displayPhotos() {
    countImagesLoaded = 0;
    totalImagesLoaded = photosArray.length; 
    photosArray.forEach((photo) => {
        // create <a> to link back to Unspsj
        const item = document.createElement('a')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        // create image for photo
        const unsplashImage = document.createElement('img')
        setAttributes(unsplashImage, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        unsplashImage.addEventListener('load', isImageLoaded)
        // put the image inside <a>, then put both inside imageContainer
        item.appendChild(unsplashImage)
        imageContainer.appendChild(item) 
    })
}

// Get unspash api photos
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    alert("Error Occured", error);
  }
}

// Check to see if scroll is at bottom of page and if yes add photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && readyForMoreImages) {
      readyForMoreImages = false;
      getPhotos()  
    }
})

// ON LOAD
getPhotos();
