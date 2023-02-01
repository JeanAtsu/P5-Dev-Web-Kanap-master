async function displayProduct()
{
    const data = await fetch("http://localhost:3000/api/products");
    const products = await data.json();

    //Retrieve id
    //console.log(products); 
    const url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    console.log(id);

    function myProduct(product) 
    {
        return product._id === id;
    }
    
    //Product buffer
    //console.log(products.find(myProduct));
    const product = products.find(myProduct);

    //Image
    const sectionImage = document.querySelector(".item__img");

    const imageObject = document.createElement("img");
    imageObject.alt = product.altTxt;
    imageObject.src = product.imageUrl;
    sectionImage.appendChild(imageObject); 

    //Title & price
    const sectionTitrePrix = document.querySelector(".item__content__titlePrice");
    //Title
    const titleObject = document.createElement("h1");
    titleObject.innerText = product.name;
    sectionTitrePrix.appendChild(titleObject);
    //Price
    const priceObject = document.querySelector("#price");
    priceObject.innerText = product.price;
  
    //Description 
    const descriptionObject = document.querySelector("#description");
    descriptionObject.innerText = product.description;

    //Colors
    let nbColors = product.colors.length;
    const colorSection = document.querySelector("#colors");

    for(let i = 0; i < nbColors; i++) 
    {
        let colorsObject = document.createElement("option"); 
        colorsObject.innerText = product.colors[i];
        colorSection.appendChild(colorsObject);
    } 
   
}
displayProduct();
