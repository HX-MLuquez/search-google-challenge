
## Params motor de búsqueda
https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list?hl=es-419



Ejemplo:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Buscador de Imágenes Avanzado</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Buscador de Imágenes Avanzado</h1>
    <div class="search-container">
      <input type="text" id="search-input" placeholder="Ingresa tu término de búsqueda">
      <button id="search-button">Buscar</button>
    </div>
    <div class="gallery"></div>
    <button id="load-more-button">Cargar más imágenes</button>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

CSS (styles.css):
```css
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.search-container {
  margin-bottom: 20px;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;
}

.gallery img {
  width: 100%;
  height: auto;
  cursor: pointer;
}

#load-more-button {
  margin-top: 20px;
}
```

JavaScript (script.js):

```javascript
// API Key obtenida desde la consola de desarrolladores de Google
const API_KEY = 'tu_api_key';
const SEARCH_ENGINE_ID = 'tu_search_engine_id';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.getElementById('load-more-button');

let nextPageToken = '';

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value;
  searchImages(searchTerm);
});

loadMoreButton.addEventListener('click', () => {
  const searchTerm = searchInput.value;
  searchImages(searchTerm, nextPageToken);
});

function searchImages(searchTerm, pageToken = '') {
  // URL de la API de búsqueda de imágenes de Google
  const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(searchTerm)}&searchType=image&pageToken=${pageToken}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      nextPageToken = data.nextPageToken || '';
      displayImages(data.items);
    })
    .catch(error => {
      console.log('Error al realizar la búsqueda:', error);
    });
}

function displayImages(images) {
  images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image.link;
    imgElement.alt = image.title;

    // Agregar evento para ampliar la imagen al hacer clic
    imgElement.addEventListener('click', () => {
      window.open(image.link, '_blank');
    });

    gallery.appendChild(imgElement);
  });
}
```
Reemplazar 'tu_api_key' y 'tu_search_engine_id' con propias claves de la API de búsqueda de imágenes de Google.

## Obtener API-KEY

### API Key y el Search Engine ID en Google

1. Ve a la Consola de Desarrolladores de Google.
2. Crea un nuevo proyecto o selecciona uno existente en la parte superior del panel.
3. En el panel izquierdo, haz clic en "Biblioteca" para buscar y habilitar la API de búsqueda personalizada (Custom Search API).
4. Después de habilitar la API, regresa al panel izquierdo y haz clic en "Credenciales".
5. En la pestaña "Credenciales", haz clic en "Crear credenciales" y selecciona "Clave de API".
6. Selecciona "Clave de API de servidor" y luego "Crear".
7. Copia la API Key generada. Esa será tu 'tu_api_key'.

### Para obtener el Search Engine ID

1. Ve al Sitio de Google Custom Search.
2. Haz clic en "Comenzar ahora" y crea un nuevo Motor de Búsqueda Programable.
3. Completa los detalles requeridos, como el nombre, la descripción, las palabras clave y los sitios web que deseas buscar.
4. Después de crear el Motor de Búsqueda Programable, en la página de configuración, verás una opción para obtener el código de búsqueda.
5. Haz clic en "Obtener código" y se abrirá una ventana emergente.
6. En la ventana emergente, busca el parámetro cx en el código generado. El valor de cx será tu 'tu_search_engine_id'.

```
Precios
La API de Custom Search JSON proporciona 100 consultas de búsqueda por día de forma gratuita. Si necesitas más, puedes registrarte para la facturación en la Consola de API. Las solicitudes adicionales cuestan $5 por 1,000 consultas, hasta 10,000 consultas por día.

Si necesita más de 10,000 búsquedas por día y el Motor de Búsqueda Programable busca en 10 sitios o menos, es posible que le interese usar la API de JSON de sitios de búsqueda personalizados restringida, que no tiene un límite diario de consultas.
```

# RECURSOS en la doc. de GOOGLE

Información sobre la API de búsqueda personalizada de Google en la documentación oficial de Google Custom Search JSON API. Aquí hay algunos recursos útiles:

1. Google Custom Search JSON API Overview: Proporciona una visión general de la API, incluyendo cómo funciona y qué puedes hacer con ella.

https://developers.google.com/custom-search/docs/overview?hl=es-419

2. Getting Started Guide: Te guía a través del proceso de creación de un motor de búsqueda personalizado y obtención de las claves de API necesarias.

https://developers.google.com/custom-search/docs/tutorial/creatingcse?hl=es-419

3. API Reference: Detalla los endpoints, parámetros y respuestas de la API.

https://developers.google.com/custom-search/docs/json_api_reference?hl=es-419

4. Samples and Libraries: Ofrece ejemplos de código y bibliotecas de clientes en diferentes lenguajes de programación para ayudarte a comenzar a usar la API.

5. Support and FAQ: Proporciona recursos adicionales de soporte, incluyendo preguntas frecuentes y la comunidad de ayuda de Google.

https://developers.google.com/custom-search/docs/support?hl=es-419


## Primeros pasos con el motor de búsqueda programable
https://support.google.com/programmable-search/answer/12397162?hl=es-419
## Getting started with Programmable Search Engine
https://support.google.com/programmable-search/answer/11082370?hl=es&ref_topic=4513742&sjid=2640559347017418319-SA#zippy=%2Cpaso-elige-qu%C3%A9-quieres-buscar-en-el-buscador%2Cpaso-elige-la-configuraci%C3%B3n-de-b%C3%BAsqueda%2Cpaso-crea-el-buscador%2Cdirectrices-de-branding



# Error nextPage

https://support.google.com/programmable-search/search?q=nextPage&sjid=2640559347017418319-SA

```
Cuando realiza una consulta, (esto se cuenta para sus 100 consultas gratuitas) se entregan 10 resultados (de forma predeterminada). Ahora, cuando hace clic en el enlace Siguiente, se realiza una consulta posterior que ofrece más de 10 resultados. La consulta posterior se tomará como consulta que se agrega a sus 100 libres y no a los 10 resultados.
```


```
Por favor, ¿cómo puedo aumentar la cantidad de páginas que me producen los resultados de búsqueda de la búsqueda programable de 10 páginas a tantas como sea posible? Digamos que se supone que deben mostrarse 675 páginas de mi búsqueda, pero solo aparecen 10 páginas. ¿Cómo cambio eso para poder seguir saltando a la página siguiente hasta que llegue a la última página, la página 675?
Gracias por tu ayuda
Detalles
Resultados de la búsqueda
bloqueado
Esta pregunta está bloqueada y la respuesta ha sido deshabilitada.

tengo la misma pregunta (0)

Suscribir
Es posible que el contenido de la comunidad no esté verificado o actualizado. Más información
Todas las respuestas
D
Deepak
Administrador de la comunidad
4 de abril de 2021

Hola,

El motor de búsqueda programable solo servirá 10 páginas (100 resultados). Solo puede recuperar 100 resultados para una consulta.

Gracias
```


# TEST search img real

https://www.google.com/search?rlz=1C1UEAD_esAR998AR998&sxsrf=APwXEddvy062FATZtqRUFYx0DM-gin13_g:1688048468699&q=alf&tbm=isch&sa=X&ved=2ahUKEwiHm9zK1uj_AhXvq5UCHVP3D68Q0pQJegQIDRAB&biw=1280&bih=577&dpr=1.5

https://www.google.com/search?rlz=1C1UEAD_esAR998AR998&sxsrf=APwXEddvy062FATZtqRUFYx0DM-gin13_g:1688048468699&q=alf&tbm=isch&sa=X&ved=2ahUKEwiHm9zK1uj_AhXvq5UCHVP3D68Q0pQJegQIDRAB&biw=1280&bih=577&dpr=1.5


como hacer para usar el search de google para desarrolladores y que muestre solo 10 img y luego las siguientes 10

const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${query}&searchType=image&start=${startIndex}&num=${numImages}`;
