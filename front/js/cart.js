
async function getDataFromAPI()
{
  const data = await fetch("http://localhost:3000/api/products");
  const products = await data.json();
  //console.log(products);
  return products
}
//Récupérer les données du panier
function getCartFromStorage()
{
  let myCart = [] ;

  if (localStorage.getItem("myCart"))
  {
      myCart = JSON.parse(localStorage.getItem('myCart'));
  }
  //console.log(myCart);
  return myCart
}
//Afficher les éléments du DOM
async function displayCart(myCart, products)
{
  const cart__items = document.querySelector("#cart__items");

  for(let i = 0; i < myCart.length ; i++)
  {
      const cart = myCart[i];
      //Product object
      const product = products.find(product => product._id === cart.id);

      console.log(product);
      console.log(product._id);
  
      const cart__item = document.createElement("article");
      cart__item.classList.add("cart__item");
      //Image
      const cart__item__img = document.createElement("div");
      cart__item__img.classList.add("cart__item__img");
      const image = document.createElement("img");
      image.alt = "Photographie d'un canapé";
      image.src = product.imageUrl;
      cart__item__img.appendChild(image);
      cart__item.appendChild(cart__item__img);

      //Item content
      const cart__item__content = document.createElement("div");
      cart__item__content.classList.add("cart__item__content");
      
      //Content description
      const cart__item__content__description = document.createElement("div");
      cart__item__content__description.classList.add("cart__item__content__description");
      const name = document.createElement("h2");
      name.innerText = "Produit : " +  product.name;
      const color = document.createElement("p");
      color.innerText = "Couleur : " + cart.colors;
      const price = document.createElement("p");
      price.innerText = "Prix : " + product.price;

      cart__item__content__description.appendChild(name);
      cart__item__content__description.appendChild(color);
      cart__item__content__description.appendChild(price);

      cart__item__content.appendChild(cart__item__content__description);

      //Qty
      const cart__item__content__settings__quantity = document.createElement("div");
      cart__item__content__settings__quantity.classList.add("cart__item__content__settings__quantity");
      
      const qtyLabel = document.createElement("p");
      qtyLabel.innerText = "Quantité : ";
      const qtyObj = document.createElement("input");
      qtyObj.type = "number";
      qtyObj.dataset.index = i;
      qtyObj.classList.add("itemQuantity");
      qtyObj.name = "itemQuantity";
      qtyObj.min = "1";
      qtyObj.max = "100";
      qtyObj.value = cart.qty;
      
      //Content settings
      
      const cart__item__content__settings = document.createElement("div");
      cart__item__content__settings.classList.add("cart__item__content__settings");
      
      cart__item__content__settings__quantity.appendChild(qtyLabel);
      cart__item__content__settings__quantity.appendChild(qtyObj);

      cart__item__content__settings.appendChild(cart__item__content__settings__quantity);
      cart__item__content.appendChild(cart__item__content__settings);

      
      //Delete
      const cart__item__content__settings__delete = document.createElement("div");
      cart__item__content__settings__delete.classList.add("cart__item__content__settings__delete");
      const deleteFct = document.createElement("p");
      deleteFct.dataset.index = i;
      deleteFct.classList.add("deleteItem");
      deleteFct.innerText ="Supprimer";
      cart__item__content__settings__delete.appendChild(deleteFct);

      
      //Update DOM
      cart__item__content__settings.appendChild(cart__item__content__description);
      cart__item__content__settings.appendChild(cart__item__content__settings__quantity);
      cart__item__content__settings.appendChild(cart__item__content__settings__delete);

      cart__item__content.appendChild(cart__item__content__settings);
      ////
      cart__item.appendChild(cart__item__content);
      //
      cart__items.appendChild(cart__item);
  }
}
//Calculer les totaux
function calculateTotalQuantity(cart)
{
  let total = 0;
  cart.forEach(elt => total += parseInt(elt.qty));
  const totalQtyElt = document.querySelector('#totalQuantity');
  totalQtyElt.textContent = total;
}

function calculateTotalPrice(cart, products)
{
  let totalPrice = 0;
  cart.forEach(elt => {
    const product = products.find(product => product._id === elt.id);
    totalPrice += parseInt(elt.qty) * parseInt(product.price);
  })
  const totalPriceElt = document.querySelector('#totalPrice');
  totalPriceElt.textContent = totalPrice;
  
}

//Listener - Modifier les quantités
function addListenerToQty()
{
  const qtyInputs = Array.from(document.querySelectorAll('.itemQuantity'));
  qtyInputs.forEach(input => {
    input.addEventListener('change', (e)=> {
      const index = e.target.dataset.index;
      console.log(index, e.target.value);
      const cart = getCartFromStorage();
      cart[index].qty = e.target.value;
      localStorage.setItem('myCart', JSON.stringify(cart));
      calculateTotalQuantity(cart);
      calculateTotalPrice(cart, products);
    })
  })
}
//Listener - Supprimer un article
function addListenerToDelete()
{
  const deleteInputs = Array.from(document.querySelectorAll('.deleteItem'));
  deleteInputs.forEach(input => {
    input.addEventListener('click', (e)=> {
      const index = e.target.dataset.index;
      const cart = getCartFromStorage();
      cart.splice(index,1);
      input.closest('.cart__item').remove();
      localStorage.setItem('myCart', JSON.stringify(cart));
      calculateTotalQuantity(cart);
      calculateTotalPrice(cart, products);
    })
  })
}
//Export data
export function addListenerEnvoyerCommande() {
  const formulaireCommande = document.querySelector(".cart__order__form");
  formulaireCommande.addEventListener("submit", function (event) {
  // Désactivation / défaut du navigateur
  event.preventDefault();

  const orderUser = {
    prenom: event.target.querySelector("[name=firstName]").value,
    nom: event.target.querySelector("[name=lastName").value,
    adresse: event.target.querySelector("[name=address]").value,
    ville: event.target.querySelector("[name=city").value,
    email: event.target.querySelector("[name=email]").value
  };

  // Charge utile au format JSON
  const chargeUtile = JSON.stringify(orderUser);

  console.log(chargeUtile);

  fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: chargeUtile
    });
  });
}

//Exécution du code
const products = await getDataFromAPI();
console.log(products);
const myCart = getCartFromStorage();
console.log(myCart);
displayCart(myCart, products);
calculateTotalQuantity(myCart);
calculateTotalPrice(myCart, products);
addListenerToQty(products);
addListenerToDelete();
addListenerEnvoyerCommande();