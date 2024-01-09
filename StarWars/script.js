// API URL-ek
const apiBaseUrl = "https://bgs.jedlik.eu/swapi/api";
const starshipsUrl = `${apiBaseUrl}/starships/`;
const speciesUrl = `${apiBaseUrl}/species/`;

// Aszinkron függvény az űrhajók lekérésére
async function fetchStarships() {
  try {
    const response = await fetch(starshipsUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displayStarships(data.results);
  } catch (error) {
    console.error("Hiba az űrhajók lekérésénél:", error);
  }
}

// Aszinkron függvény a lények lekérésére
async function fetchSpecies() {
  try {
    const response = await fetch(speciesUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displaySpecies(data.results);
  } catch (error) {
    console.error("Hiba a lények lekérésénél:", error);
  }
}

// Űrhajók megjelenítése
function displayStarships(starships) {
  const starshipsDiv = document.getElementById("starships");
  starships.forEach((starship) => {
    const starshipDiv = document.createElement("div");
    starshipDiv.classList.add("starship", "col-md-4");
    starshipDiv.innerHTML = `<h3>${starship.name}</h3>`;
    starshipsDiv.appendChild(starshipDiv);
  });
}

// Lények megjelenítése
function displaySpecies(species) {
  const speciesDiv = document.getElementById("species");
  species.forEach((specie) => {
    const speciesDiv = document.createElement("div");
    speciesDiv.classList.add("species", "col-md-4");
    speciesDiv.innerHTML = `<h3>${specie.name}</h3>`;
    speciesDiv.appendChild(speciesDiv);
  });
}

// Funkciók meghívása az oldal betöltésekor
fetchStarships();
fetchSpecies();
