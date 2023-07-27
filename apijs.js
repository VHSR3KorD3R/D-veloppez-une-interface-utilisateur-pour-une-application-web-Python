const options = {method: 'GET'};

async function retrieveMovies(url, category) {
  let response = await fetch(url, options);
  response = await response.json();
  console.log(response);
  const listMovies = response.results;

  for (let movie of listMovies) {
    let li = document.createElement('li');
    let img = document.createElement('img');
    isLinkWorking(movie.image_url)
    .then((result) => {
      if (result) {
        img.src = movie.image_url;
      } else {
        img.src = 'notFound.png';

      }
    })
  .catch((error) => {
    console.error('An error occurred:', error);
  });
    img.id = movie.id;
    li.append(img)
    const ul = document.getElementById(category);
    ul.appendChild(li);
  }

  let next = response.next;
  response = await fetch(next, options);
  response = await response.json();
  const listMoviesPage2 = response.results;

  for(let i = 0; i < 2; i++){
    let li = document.createElement('li');
    let img = document.createElement('img');
    img.src = listMoviesPage2[i].image_url;
    li.append(img)
    img.id = listMoviesPage2[i].id
    const ul = document.getElementById(category);
    ul.appendChild(li);
  }
}

async function isLinkWorking(link) {
  try {
    const response = await fetch(link);

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

let bestMovies = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score'
let bestFrenchMovies = 'http://localhost:8000/api/v1/titles/?country=france&sort_by=-imdb_score'
let bestActionMovies = 'http://localhost:8000/api/v1/titles/?genre=action&sort_by=-imdb_score'
let bestScifiMovies = 'http://localhost:8000/api/v1/titles/?genre=sci-fi&sort_by=-imdb_score'

await retrieveMovies(bestMovies, "bestMovies")
await retrieveMovies(bestFrenchMovies, "bestFrenchMovies")
await retrieveMovies(bestActionMovies, "bestActionMovies")
await retrieveMovies(bestScifiMovies, "bestScifiMovies")

let response = await fetch(bestMovies, options);
response = await response.json();
const listMovies = response.results;

const movieUrl = listMovies[0].url
response = await fetch(movieUrl, options);
response = await response.json();
const movieDesc = response.long_description
console.log(response);

let img = document.createElement('img');
img.src = listMovies[0].image_url;
img.className = "moviePoster";

let div1 = document.getElementsByClassName("movieInfos")[0];
let div2 = document.getElementsByClassName("bestMovie")[0];

let h2 = document.createElement('h2');
h2.className = "bestMovieTitle"
h2.textContent = listMovies[0].title;

let p = document.createElement('p');
p.className = "synopsis"
p.textContent = movieDesc

div2.appendChild(img)
div1.id = listMovies[0].id
div1.appendChild(h2)
div1.appendChild(p)

let carousels = document.querySelectorAll('.carousel');
for (const carousel of carousels) {
  let prevButton = carousel.querySelector('.prev');
  let nextButton = carousel.querySelector('.next');
  let imageList = carousel.querySelector('ul');
  let images = carousel.querySelectorAll('li');

  let imageWidth = images[0].offsetWidth;
  let currentIndex = 0;

  prevButton.addEventListener('click', function () {
    if (currentIndex > 0) {
      currentIndex--;
      imageList.style.left = -currentIndex * imageWidth + 'px';
    }
  });

  nextButton.addEventListener('click', function () {
    if (currentIndex < images.length - 4) {
      currentIndex++;
      imageList.style.left = -currentIndex * imageWidth + 'px';
    }
  });
}

const createAndAppendElement = (tag, textContent) => {
  const element = document.createElement(tag);
  element.textContent = textContent;
  return element;
};

let images = document.getElementsByTagName("img");
for (const image of images) {
  let modal = document.getElementById("modal");

  let modalImage = document.getElementById("modalImage");

  image.onclick = async function() {

    try{
      modal.style.display = "flex";
      modalImage.src = this.src;
      
      let movie = 'http://localhost:8000/api/v1/titles/' + image.id;
      let movieInfos = await fetch(movie, options);
      movieInfos = await movieInfos.json();
    
      const detailsDiv = document.querySelector(".details");
    
      detailsDiv.appendChild(createAndAppendElement("h1", `Titre: ${movieInfos.original_title}`));
      detailsDiv.appendChild(createAndAppendElement("p", `Année: ${movieInfos.year}`));
      detailsDiv.appendChild(createAndAppendElement("p", `Durée: ${movieInfos.duration}mins`));
      detailsDiv.appendChild(createAndAppendElement("p", `Description: ${movieInfos.description}`));
      detailsDiv.appendChild(createAndAppendElement("p", `Note Moyenne: ${movieInfos.imdb_score}`));
      detailsDiv.appendChild(createAndAppendElement("p", `Réalisateur: ${movieInfos.directors}`));
      detailsDiv.appendChild(createAndAppendElement("p", `Scénario: ${movieInfos.writers}`));
      detailsDiv.appendChild(createAndAppendElement("p", `Acteurs: ${movieInfos.actors}`));
      detailsDiv.appendChild(createAndAppendElement("p", `Genres: ${movieInfos.genres}`));
      detailsDiv.appendChild(createAndAppendElement("p", `Pays: ${movieInfos.countries}`));
      detailsDiv.appendChild(createAndAppendElement("p", `Avertissement: ${movieInfos.rated}`));
      detailsDiv.appendChild(createAndAppendElement("p", `Box-Office: ${movieInfos.worldwide_gross_income}`))

      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
  }

  let close = document.getElementsByClassName("close")[0];
  close.onclick = function() {
    modal.style.display = "none";
    document.getElementsByClassName("details")[0].innerHTML = ""
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      document.getElementsByClassName("details")[0].innerHTML = ""
    }
  }
}