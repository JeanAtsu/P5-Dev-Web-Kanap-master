
//Récupérer le numéro de commande
const url = new URL(window.location.href);
var orderId = url.searchParams.get("orderId");

//Afficher le numéro de commande
const sectionOrder = document.querySelector("#orderId");
sectionOrder.innerText = orderId;

//Supprimer le panier
localStorage.removeItem('myCart');

