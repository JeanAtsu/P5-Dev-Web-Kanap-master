async function displayCart()
{
  const data = await fetch("http://localhost:3000/api/products");
  const products = await data.json();
  
  //Getting cart 
  var myCart = [] ;

  if (localStorage.getItem("myCart"))
  {
      myCart = JSON.parse(localStorage.getItem('myCart'));
  }

  console.log(myCart);
  
  ////////////////////////
  const cart__items = document.querySelector("#cart__items");

  //Total init
  let totalP = 0;
  let totalQ = 0;

  for (cart of myCart)
  {
      //Return product Id
      function myProduct(product) 
      {
          return product._id === cart.id;
      }
      //Product object
      const product = products.find(myProduct);

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
      cart__item__content = document.createElement("div");
      cart__item__content.classList.add("cart__item__content");
      
      //Content description
      cart__item__content__description = document.createElement("div");
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
      cart__item__content__settings__quantity = document.createElement("div");
      cart__item__content__settings__quantity.classList.add("cart__item__content__settings__quantity");
      
      const qtyLabel = document.createElement("p");
      qtyLabel.innerText = "Quantité : ";
      const qtyObj = document.createElement("input");
      qtyObj.type = "number";
      qtyObj.classList.add("itemQuantity");
      qtyObj.name = "itemQuantity";
      qtyObj.min = "1";
      qtyObj.max = "100";
      qtyObj.value = cart.qty;
      //qtyObj.addEventListener("change", updateQty, false);

      //Content settings
      
      cart__item__content__settings = document.createElement("div");
      cart__item__content__settings.classList.add("cart__item__content__settings");
      
      cart__item__content__settings__quantity.appendChild(qtyLabel);
      cart__item__content__settings__quantity.appendChild(qtyObj);

      cart__item__content__settings.appendChild(cart__item__content__settings__quantity);
      cart__item__content.appendChild(cart__item__content__settings);

      
      //Delete
      const cart__item__content__settings__delete = document.createElement("div");
      cart__item__content__settings__delete.classList.add("cart__item__content__settings__delete");
      const deleteFct = document.createElement("p");
      deleteFct.classList.add("deleteItem");
      deleteFct.innerText ="Supprimer";
      cart__item__content__settings__delete.appendChild(deleteFct);

      //Total Qty
      totalQty();
      
      //Total price
      totalPrice(product);
      
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

   //Total price
  function totalPrice(product) {
    const totalPrice = document.querySelector("#totalPrice");
    totalP += Number.parseInt(product.price);
    totalPrice.innerText = totalP;
    console.log(totalP);
  }
   //Total Qty
  function totalQty() 
  {
    const totalQty = document.querySelector("#totalQuantity");
    totalQ += Number.parseInt(cart.qty);
    totalQty.innerText = totalQ;
    console.log(totalQ);
  }
}
displayCart();
