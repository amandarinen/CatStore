function showCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(cart);
  const container = document.getElementById("cart-container");

  cart.forEach(cat => {
    if (!cat.breeds || cat.breeds.length === 0) return;

    const breed = cat.breeds[0];
    const div = document.createElement("div");

    div.innerHTML = `
      <img src="${cat.url}" alt="">
      <p>${breed.name}</p>
      <p>${breed.origin}</p>
      <button>Remove</button>
    `;
    
    div.querySelector("button").addEventListener("click", function() {
      removeFromCart(cat);
    });

    container.appendChild(div);
  });
}

function removeFromCart(cat) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(c => c.id !== cat.id);
  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById("cart-container").innerHTML = "";
  showCart();
}

function checkout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const catnames = cart.map(cat => cat.breeds[0].name).join(", ");

  const name = document.getElementById("fname").value;
  const mail = document.getElementById("mail").value;
  const address = document.getElementById("shippingaddress").value;

  localStorage.clear();
  document.getElementById("cart-container").innerHTML = "";
  alert(`Checkout done! Thank you! :3\nYour order: ${catnames}. \nYour information: \nName: ${name} \nEmail: ${mail} \nAddress: ${address}`);
}

showCart();