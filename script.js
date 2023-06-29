//TODO: API Key obtenidas desde consola de desarrolladores de Google
//!recordar ocultar con IIFE en window ya que no podemos usar dotenv al no tener un servidor y no poder
// utilizar dependencias (require ni import)
const API_KEY = window.API_KEY;
const SEARCH_ENGINE_ID = window.SEARCH_ENGINE_ID;

//* Enlazamos elementos del doc. html a variables
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const gallery = document.querySelector(".gallery");
const loadMoreButton = document.getElementById("load-more-button");

let nextPageToken = "1";
let searchTerm = ""
searchButton.addEventListener("click", () => {
  searchTerm = searchInput.value || "not found";
  searchImages(searchTerm);
});

loadMoreButton.addEventListener("click", () => {
  if (nextPageToken) {
    searchImages(searchTerm, nextPageToken);
  } else {
    alert("There are no more images available.");
  }
});

function searchImages(searchTerm, pageToken = "1") {
  //TODO: URL de la API de búsqueda de imágenes de Google
  
  const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(
  searchTerm 
)}&searchType=image&num=10&start=${pageToken}`;
//* limit 10 <-> to <-> 100
//!nextPage || pageToken || start
  console.log("::::::pageToken -------->>>> ", pageToken)
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("::::::data is: ", data)
      nextPageToken = data.queries.nextPage[0].startIndex || "";
      //TODO: se toma la respuesta y se le pasa a la function displayImages
      displayImages(data.items);
    })
    .catch((error) => {
      console.log("Error al realizar la búsqueda:", error);
    });
}

function displayImages(images) {
  images.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image.link;
    imgElement.alt = image.title;

    //TODO: Agrega evento para ampliar la imagen al hacer clic
    imgElement.addEventListener("click", () => {
      window.open(image.link, "_blank");
    });

    gallery.appendChild(imgElement);
  });
}

const imgReset = document.querySelector(".imgReset");
imgReset.addEventListener("click", () => {
  resetImages();
});

function resetImages() {
  gallery.innerHTML = "";
  searchInput.value = "";
}
