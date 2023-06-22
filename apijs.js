const options = {method: 'GET'};

let categories = ['http://localhost:8000/api/v1/titles/?sort_by=-imdb_score','http://localhost:8000/api/v1/titles/?country=france&sort_by=-imdb_score', 'http://localhost:8000/api/v1/titles/?genre=action&sort_by=-imdb_score', 'http://localhost:8000/api/v1/titles/?genre=sci-fi&sort_by=-imdb_score']

for (let category of categories) {
  let response = await fetch(category, options);
  response = await response.json();
  const list = response.results;

  for (let movie of list) {
    let para = document.createElement('p');
    para.textContent = JSON.stringify(movie);
    console.log("response " + JSON.stringify(movie));
    document.getElementsByClassName("test")[0].append(para);
  }

  let next = response.next;
  console.log(next);
  response = await fetch(next, options);
  response = await response.json();
  console.log(response);

  for(let i = 0; i < 2; i++){
    let para = document.createElement('p');
    para.textContent = JSON.stringify(response.results[i]);
    document.getElementsByClassName("test")[0].append(para);  
  }
  let para = document.createElement('p');
  para.textContent = "-----------------------------------------------------------------------------------------";
  document.getElementsByClassName("test")[0].append(para);
}


