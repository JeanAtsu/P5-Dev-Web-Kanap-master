async function displayProducts()
{
  const data = await fetch("http://localhost:3000/api/products");
  const products = await data.json();
  console.log(products); 

  const sectionFiches = document.querySelector("#items");

  //select all items
  for (let product of products)
  {
    //Redirect link
    const linkObject = document.createElement("a");
    linkObject.href = "./product.html?id=" + product._id;
    
    const articleObject = document.createElement("article");
    //Image
    const imageObject = document.createElement("img");
    imageObject.alt = product.altTxt;
    imageObject.src = product.imageUrl;

    //Name
    const nameObject = document.createElement("h3");
    nameObject.innerText = product.name;
    
    //Update design
    articleObject.appendChild(imageObject);
    articleObject.appendChild(nameObject);
    linkObject.appendChild(articleObject);
    sectionFiches.appendChild(linkObject);
  }
}
displayProducts();