// Function to make API call and generate Bootstrap elements for űrhajók
async function fetchAndDisplaySpaceships(spaceshipIds) {
    const container = document.getElementById('spaceshipsContent');
    container.innerHTML = ''; // Clear previous content

    for (const spaceshipId of spaceshipIds) {
      const spaceshipUrl = `https://bgs.jedlik.eu/swapi/api/starships/${spaceshipId}`;
      const response = await fetch(spaceshipUrl);
      const spaceshipData = await response.json();

      const spaceshipsObject = spaceshipData[0];


      const cardContainer = document.createElement('div');
      cardContainer.classList.add('col-12', 'col-md-2', 'px-1', 'd-flex', 'align-items-stretch', 'cursor-pointer');

      const card = document.createElement('div');
      card.classList.add('card', 'mb-2');

      const img = document.createElement('img');
      img.src = `https://bgs.jedlik.eu/swimages/starships/${spaceshipId}.jpg`;
      img.classList.add('card-img-top', 'rounded-circle', 'p-2');
      img.alt = '...';

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body', 'p-0', 'text-center');

      const cardTitle = document.createElement('h6');
      cardTitle.classList.add('card-title');
      cardTitle.textContent = spaceshipsObject.name;

      // Appending elements
      cardBody.appendChild(cardTitle);
      card.appendChild(img);
      card.appendChild(cardBody);
      cardContainer.appendChild(card);
      container.appendChild(cardContainer);

      card.addEventListener('click', () => {
        displayMovies(spaceshipsObject.films);
      });
    }
  }

  // Function to make API call and generate Bootstrap elements for lények
  async function fetchAndDisplaySpecies(speciesIds) {
    const container = document.getElementById('speciesContent');
    container.innerHTML = ''; // Clear previous content

    for (const speciesId of speciesIds) {
      const speciesUrl = `https://bgs.jedlik.eu/swapi/api/species/${speciesId}`;
      const response = await fetch(speciesUrl);
      const speciesData = await response.json();

      const speciesObject = speciesData[0];

      const cardContainer = document.createElement('div');
      cardContainer.classList.add('col-12', 'col-md-2', 'px-1', 'd-flex', 'align-items-stretch', 'cursor-pointer');

      const card = document.createElement('div');
      card.classList.add('card', 'mb-2');

      const img = document.createElement('img');
      img.src = `https://bgs.jedlik.eu/swimages/species/${speciesId}.jpg`;
      img.classList.add('card-img-top', 'rounded-circle', 'p-2');
      img.alt = '...';

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body', 'p-0', 'text-center');

      const cardTitle = document.createElement('h6');
      cardTitle.classList.add('card-title');
      cardTitle.textContent =  speciesObject.name;

      // Appending elements
      cardBody.appendChild(cardTitle);
      card.appendChild(img);
      card.appendChild(cardBody);
      cardContainer.appendChild(card);
      container.appendChild(cardContainer);

      card.addEventListener('click', () => {
        displayMovies(speciesObject.films);
      });
    }
  }

  // Movie data with starships and species ids
//   const movieData = {
//     "title": "The Empire Strikes Back",
//     "episode_id": 5,
//     // ... (other movie data)
//     "starships": ["3", "10", "11", "12", "15", "17", "21", "22", "23"],
//     "species": ["1", "2", "3", "6", "7"]
//   };

  function createMovieCard(imgSrc, title, openingCrawl,director,producer,release_date) {
    const cardContainer = document.createElement('div');
    

    const card = document.createElement('div');
    card.classList.add('card', 'col-12', 'col-md-6', 'col-lg-4');
    const img = document.createElement('img');
    img.src = imgSrc;
    img.classList.add('card-img-top');
    img.alt = '...';
    

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = title;

    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = openingCrawl + director + producer+ release_date;

    // Appending elements
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    card.appendChild(img);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);

    return cardContainer;
  }

  // Function to fetch movie details and populate card
  async function fetchMovieDetails(movieId) {
    const url = `https://bgs.jedlik.eu/swapi/api/films/${movieId}`;
    const response = await fetch(url);
    const movieData = await response.json();

    const container = document.getElementById('movieDetails');
    container.innerHTML = ''; // Clear previous content
    for (const movie of movieData) {
      const imgSrc = `https://bgs.jedlik.eu/swimages/films/${movie.episode_id}.jpg`;
      const movieCard = createMovieCard(imgSrc, movie.title, movie.opening_crawl,movie.director,movie.producer,movie.release_date);
      container.appendChild(movieCard);
      fetchAndDisplaySpaceships(movie.starships);
      fetchAndDisplaySpecies(movie.species);
    }
   
}

async function displayMovies(films) {
    const moviesContainer = window.open('', '_blank');
    moviesContainer.document.write(`
      <html>
      <head>
        <title>Movies</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
      </head>
      <body class="p-4">
        <div class="row">
          <div class="col-12">
            <h1 class="display-4 mb-5">Movies</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div id="moviesContent" class="row"></div>
          </div>
        </div>
        <script>
          async function fetchAndDisplayMovies() {
            const moviesContainer = document.getElementById('moviesContent');
  
            const movieDataUrl = 'https://bgs.jedlik.eu/swapi/api/films';
            const response = await fetch(movieDataUrl);
  
            for (const movie of ${JSON.stringify(films)}) {
              const movieCard = document.createElement('div');
              movieCard.classList.add('col-12', 'col-md-2', 'px-1', 'd-flex', 'align-items-stretch', 'cursor-pointer');
  
              const card = document.createElement('div');
              card.classList.add('card', 'mb-2');
  
              const img = document.createElement('img');
              img.src = \`https://bgs.jedlik.eu/swimages/films/\${movie}.jpg\`;
              img.classList.add('card-img-top', 'rounded-circle', 'p-2');
              img.alt = '...';
  
              const cardBody = document.createElement('div');
              cardBody.classList.add('card-body', 'p-0', 'text-center');
  
              const cardTitle = document.createElement('h6');
              cardTitle.classList.add('card-title');
              cardTitle.textContent = movie.title;
  
              // Appending elements
              cardBody.appendChild(cardTitle);
              card.appendChild(img);
              card.appendChild(cardBody);
              movieCard.appendChild(card);
              moviesContainer.appendChild(movieCard);
            }
          }
  
          fetchAndDisplayMovies();
        </script>
      </body>
      </html>
    `);
  }
  
  
  
  
  
// Call the functions with starships and species ids from movie data
//   fetchAndDisplaySpaceships(movieDatas.starships);
//   fetchAndDisplaySpecies(movieDatas.species);
  fetchMovieDetails(2);