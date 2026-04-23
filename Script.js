let cats = [];
let currentPage = 1;
const perPage = 10;

async function FetchCats() {
  const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=30&has_breeds=1&api_key=live_TmEsriTI8wfPjZquOmWA8RW1E9NPDirz7nMzyHbci96bFbrvvf0nA3hBhHU5ocEf");
  cats = await response.json();
  showCats();
}

function showCats() {
  const container = document.getElementById("cat-container");
  container.innerHTML = "";

  const filtered = searchCats();
  const start = (currentPage - 1) * perPage;
  const pageCats = filtered.slice(start, start + perPage);

  pageCats.forEach(cat => {
    if (!cat.breeds || cat.breeds.length === 0) return;

    const breed = cat.breeds[0];
    const div = document.createElement("div");
    div.innerHTML = `
      <img src="${cat.url}" width="200">
      <p>${breed.name}</p>
      <p>${breed.origin}</p>
      <button>Add to cart</button>
    `;
    
    div.querySelector("button").addEventListener("click", function() {
      addToCart(cat);
    });

    container.appendChild(div);
  });

  document.getElementById("page-info").textContent = `${currentPage}/3`;  
  document.getElementById("prev-btn").disabled = currentPage === 1;
  document.getElementById("next-btn").disabled = currentPage === 3;
}

function nextPage() {
  if (currentPage < 3) {
    currentPage++;
    showCats();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    showCats();
  }
}

function searchCats() {
  const searchText = document.getElementById("searchbar").value.toLowerCase();
  
  const results = cats.filter(cat => {
    const breed = cat.breeds[0];
    return breed.name.toLowerCase().includes(searchText) || 
           breed.origin.toLowerCase().includes(searchText);
  });

  return results;
}

function addToCart(cat) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(cat);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added cat to cart!");
}

FetchCats();