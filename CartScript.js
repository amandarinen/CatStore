function showCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-container");

  cart.forEach(cat => {
    const div = document.createElement("div");

    div.innerHTML = `
      <img src="${cat.url}" width="200">
    `;

    container.appendChild(div);
  });
}

showCart();