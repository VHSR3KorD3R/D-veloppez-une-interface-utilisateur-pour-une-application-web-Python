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


let bestMovies = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score'

let response = await fetch(bestMovies, options);
response = await response.json();
const listMovies = response.results;

for (let movie of listMovies) {
  let li = document.createElement('li');
  let img = document.createElement('img');
  img.src = movie.image_url;
  li.append(img)
  const ul = document.getElementById("bestMovies");
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
  const ul = document.getElementById("bestMovies");
  ul.appendChild(li);
}

var carousel = document.querySelector('.carousel');
var prevButton = carousel.querySelector('.prev');
var nextButton = carousel.querySelector('.next');
var imageList = carousel.querySelector('ul');
var images = carousel.querySelectorAll('li');

var imageWidth = images[0].offsetWidth;
var currentIndex = 0;

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
