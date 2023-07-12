const options = {method: 'GET'};

// let categories = ['http://localhost:8000/api/v1/titles/?sort_by=-imdb_score','http://localhost:8000/api/v1/titles/?country=france&sort_by=-imdb_score', 'http://localhost:8000/api/v1/titles/?genre=action&sort_by=-imdb_score', 'http://localhost:8000/api/v1/titles/?genre=sci-fi&sort_by=-imdb_score']

// for (let category of categories) {
//   let response = await fetch(category, options);
//   response = await response.json();
//   const list = response.results;

//   for (let movie of list) {
//     let para = document.createElement('p');
//     para.textContent = JSON.stringify(movie);
//     console.log("response " + JSON.stringify(movie));
//     document.getElementsByClassName("test")[0].append(para);
//   }

//   let next = response.next;
//   console.log(next);
//   response = await fetch(next, options);
//   response = await response.json();
//   console.log(response);

//   for(let i = 0; i < 2; i++){
//     let para = document.createElement('p');
//     para.textContent = JSON.stringify(response.results[i]);
//     document.getElementsByClassName("test")[0].append(para);  
//   }
//   let para = document.createElement('p');
//   para.textContent = "-----------------------------------------------------------------------------------------";
//   document.getElementsByClassName("test")[0].append(para);
// }

async function retrieveMovies(url, category) {
  let response = await fetch(url, options);
  response = await response.json();
  console.log(response);
  const listMovies = response.results;

  for (let movie of listMovies) {
    let li = document.createElement('li');
    let img = document.createElement('img');
    img.src = movie.image_url;
    li.append(img)
    li.id = movie.id
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
    li.id = listMoviesPage2[i].id
    const ul = document.getElementById(category);
    ul.appendChild(li);
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
const movieDesc = response.long_description
console.log(response);

let img = document.createElement('img');
img.src = listMovies[0].image_url;
let div = document.getElementsByClassName("bestMovie")[0];
let h2 = document.createElement('h2');
h2.textContent = listMovies[0].title
let p = document.createElement('p');
p.textContent = movieDesc
console.log(div);
div.id = listMovies[0].id
div.appendChild(h2)
div.appendChild(p)
div.appendChild(img)

// let response = await fetch(bestMovies, options);
// response = await response.json();
// const listMovies = response.results;

// for (let movie of listMovies) {
//   let li = document.createElement('li');
//   let img = document.createElement('img');
//   img.src = movie.image_url;
//   li.append(img)
//   const ul = document.getElementById("bestMovies");
//   ul.appendChild(li);
// }

// let next = response.next;
// response = await fetch(next, options);
// response = await response.json();
// const listMoviesPage2 = response.results;

// for(let i = 0; i < 2; i++){
//   let li = document.createElement('li');
//   let img = document.createElement('img');
//   img.src = listMoviesPage2[i].image_url;
//   li.append(img)
//   const ul = document.getElementById("bestMovies");
//   ul.appendChild(li);
// }

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
