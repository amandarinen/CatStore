function showCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(cart);
  const container = document.getElementById("cart-container");

  cart.forEach(cat => {
    if (!cat.breeds || cat.breeds.length === 0) return;

    const breed = cat.breeds[0];
    const div = document.createElement("div");

    div.innerHTML = `
      <img src="${cat.url}">
      <p>${breed.name}</p>
      <p>${breed.origin}</p>
    `;

    container.appendChild(div);
  });
}

function checkout() {
  localStorage.clear();
  document.getElementById("cart-container").innerHTML = "";
  alert("Checkout done! Thank you! :3");
}

showCart();