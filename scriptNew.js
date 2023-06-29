// TODO: API Key obtenidas desde consola de desarrolladores de Google
//! Recordar ocultar con IIFE en window ya que no podemos usar dotenv al no tener un servidor y no poder 
// utilizar dependencias (require ni import)
const API_KEY = window.API_KEY; // Clave de API para acceder a la API de Google
const SEARCH_ENGINE_ID = window.SEARCH_ENGINE_ID; // ID del motor de búsqueda personalizado

//* Enlazamos elementos del doc. html a variables
const searchInput = document.getElementById("search-input"); // Campo de entrada para el término de búsqueda
const searchButton = document.getElementById("search-button"); // Botón de búsqueda
const gallery = document.querySelector(".gallery"); // Contenedor de las imágenes
const loadMoreButton = document.getElementById("load-more-button"); // Botón para cargar más imágenes

let nextPageToken = ""; // Token de la siguiente página de resultados
let searchTermPartial = ""; // Término de búsqueda parcial (se reduce un carácter en cada iteración)

searchButton.addEventListener("click", () => {
  //TODO: se toman y guardan los valores del input para pasar por params a function searchImages
  const searchTerm = searchInput.value; // Término de búsqueda ingresado por el usuario
  searchTermPartial = searchTerm;
  searchImages(searchTerm);
});

loadMoreButton.addEventListener("click", () => {
  searchTermPartial = searchTermPartial.slice(0, -1); // Eliminar el último carácter de searchTermPartial
  if (searchTermPartial.length > searchInput.value.length - 3) {
    searchImages(searchTermPartial, nextPageToken);
  } else {
    alert("There are no more images available.");
  }
});

function searchImages(searchTerm, pageToken = "") {
  //TODO: URL de la API de búsqueda de imágenes de Google
  // Formato de la URL: https://www.googleapis.com/customsearch/v1?key=API_KEY&cx=SEARCH_ENGINE_ID&q=searchTerm&searchType=image&pageToken=pageToken
  const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(
    searchTerm
  )}&searchType=image&pageToken=${pageToken}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      nextPageToken = data.nextPageToken || ""; // Guardar el token de la siguiente página (si existe)
      //TODO: se toma la respuesta y se le pasa a la function displayImages
      displayImages(data.items); // Mostrar las imágenes obtenidas
    })
    .catch((error) => {
      console.log("Error al realizar la búsqueda:", error);
      alert("Error occurred while searching for images. Please try again later.");
    });
}

function displayImages(images) {
  images.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image.link; // Establecer la URL de la imagen
    imgElement.alt = image.title; // Establecer el atributo alt de la imagen

    //TODO: Agrega evento para ampliar la imagen al hacer clic
    imgElement.addEventListener("click", () => {
      window.open(image.link, "_blank"); // Abrir la imagen en una nueva pestaña al hacer clic
    });

    gallery.appendChild(imgElement); // Agregar la imagen al contenedor
  });
}

const imgReset = document.querySelector(".imgReset");
imgReset.addEventListener("click", () => {
  resetImages();
});

function resetImages() {
  gallery.innerHTML = ""; // Borrar todas las imágenes en el contenedor
  searchInput.value = ""; // Restablecer el campo de entrada a una cadena vacía
  //TODO: Restablecer cualquier otra configuración necesaria
}



/*
En esa parte del código, el comentario sugiere ocultar la API Key y el ID del motor de búsqueda 
personalizado utilizando una IIFE (Immediately Invoked Function Expression) en el objeto global window.

La razón detrás de esto es que, en el código proporcionado, la API Key y el ID del motor de 
búsqueda están directamente asignados a las variables API_KEY y SEARCH_ENGINE_ID respectivamente, 
utilizando los valores obtenidos desde window.API_KEY y window.SEARCH_ENGINE_ID. Sin embargo, 
al tratarse de información sensible como claves de API, es importante protegerlas y no exponerlas 
directamente en el código JavaScript que se envía al navegador del usuario.

La sugerencia de utilizar una IIFE implica envolver el código en una función autoejecutable, 
lo que permite mantener las variables API_KEY y SEARCH_ENGINE_ID dentro del alcance local de la 
función y ocultarlas del ámbito global. Esto proporciona una capa adicional de seguridad para 
proteger las claves de API.

La referencia a dotenv, require y import en el comentario indica que normalmente se usaría una 
librería como dotenv junto con un servidor y dependencias como require (para entornos de 
ejecución de Node.js) o import (para entornos de ejecución compatibles con ECMAScript) 
para gestionar variables de entorno y proteger las claves de API. Sin embargo, en este 
caso particular, dado que no hay un servidor y no se pueden utilizar esas dependencias, 
se sugiere la opción de ocultar las claves utilizando una IIFE en window.
*/
