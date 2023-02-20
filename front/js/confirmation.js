
//Retrieve id
const url = new URL(window.location.href);
var orderId = url.searchParams.get("orderId");
console.log(orderId);

const sectionOrder = document.querySelector("#orderId");
sectionOrder.innerText = orderId;
//remove cart
localStorage.removeItem('myCart');

