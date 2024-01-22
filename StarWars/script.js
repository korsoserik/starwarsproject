const baseUrl = "https://bgs.jedlik.eu/swapi/api/";

function fetchData(endpoint, callback) {
  fetch(`${baseUrl}${endpoint}`)
    .then((response) => response.json())
    .then((data) => callback(data))
    .catch((error) => console.error("Error:", error));
}

function displayMovieData() {
  fetchData("films/2", (data) => {
    document.getElementById("movieData").innerHTML = `
            <h2>${data.title}</h2>
            <p>${data.opening_crawl}</p>
        `;
  });
}

function displayItems(endpoint, containerId) {
  fetchData(endpoint, (data) => {
    const itemsContainer = document.getElementById(containerId);
    itemsContainer.innerHTML = "";
    data.results.forEach((item) => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = item.name || item.title;
      div.onclick = () =>
        alert(`This item appears in: ${item.films.join(", ")}`);
      itemsContainer.appendChild(div);
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  displayMovieData();
  displayItems("starships", "spaceships");
  displayItems("species", "creatures");
});

// ...existing functions...

function displayItems(endpoint, containerId, type) {
  fetchData(endpoint, (data) => {
    const itemsContainer = document.getElementById(containerId);
    itemsContainer.innerHTML = "";
    data.results.forEach((item, index) => {
      const colDiv = document.createElement("div");
      colDiv.className = "col-sm-6 col-md-4 col-lg-3 mb-4";
      const itemDiv = document.createElement("div");
      itemDiv.className =
        "item h-100 d-flex flex-column justify-content-center align-items-center";
      const imageUrl = `https://bgs.jedlik.eu/swimages/${type}/${
        index + 1
      }.jpg`;
      itemDiv.innerHTML = `
              <div class="image-container" style="background-image: url('${imageUrl}');"></div>
              <span>${item.name || item.title}</span>
          `;
      itemDiv.onclick = () =>
        alert(`This item appears in: ${item.films.join(", ")}`);
      colDiv.appendChild(itemDiv);
      itemsContainer.appendChild(colDiv);
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  displayMovieData();
  displayItems("starships", "spaceships", "starships");
  displayItems("species", "creatures", "species");
});
