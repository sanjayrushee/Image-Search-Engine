const apiKey = "JX3kmhhzplfs5dyi3d63mnM559zkGy1piw9aL9Oganrg5fkMqhdMuWMk";

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = searchInputEl.value;
  if (inputData.trim()) {
    const url = `https://api.pexels.com/v1/search?query=${inputData}&per_page=10&page=${page}`;

    const response = await fetch(url, {
      headers: {
        Authorization: apiKey
      }
    });
    
    const data = await response.json();

    if (page === 1) {
      searchResultsEl.innerHTML = "";
    }

    const results = data.photos;

    results.forEach(result => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("search-result");
      const image = document.createElement("img");
      image.src = result.src.small;
      image.alt = result.alt_description;
      const imageLink = document.createElement("a");
      imageLink.href = result.url;
      imageLink.target = "_blank";
      imageLink.textContent = result.alt_description;

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);
      searchResultsEl.appendChild(imageWrapper);
    });

    page++;

    if (page > 1) {
      showMoreButtonEl.style.display = "block";
    }
  }
}

formEl.addEventListener("submit", event => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreButtonEl.addEventListener("click", () => {
  searchImages();
});

