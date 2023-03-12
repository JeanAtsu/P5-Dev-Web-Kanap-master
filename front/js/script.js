// Affichage de tous les produits disponibles
async function displayProducts()
{
  const data = await fetch("http://localhost:3000/api/products");
  const products = await data.json();

  const sectionFiches = document.querySelector("#items");

  for (let product of products)
  {
    //Redirect page produit
    const linkObject = document.createElement("a");
    linkObject.href = "./product.html?id=" + product._id;
    
    const articleObject = document.createElement("article");
    //Image
    const imageObject = document.createElement("img");
    imageObject.alt = product.altTxt;
    imageObject.src = product.imageUrl;

    //Nom du produit
    const nameObject = document.createElement("h3");
    nameObject.innerText = product.name;
    
    //Mise à jour du DOM
    articleObject.appendChild(imageObject);
    articleObject.appendChild(nameObject);
    linkObject.appendChild(articleObject);
    sectionFiches.appendChild(linkObject);
  }
}
displayProducts();
