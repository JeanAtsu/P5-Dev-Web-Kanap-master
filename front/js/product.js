async function displayProduct()
{
    const data = await fetch("http://localhost:3000/api/products");
    const products = await data.json();

    class cart 
    {
        constructor(id, qty, colors) 
        {
            this.id = id;
            this.qty = qty;
            this.colors = colors;
        }
    } 

    //Retrieve id
    console.log(products); 
    const url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    console.log(id);

    //localStorage.removeItem('myCart');

    //Return product Id
    function myProduct(product) 
    {
        return product._id === id;
    }
    
    //Product object
    console.log(products.find(myProduct));
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

    //Available colors
    let nbColors = product.colors.length;
    const colorSection = document.querySelector("#colors");
    for(let i = 0; i < nbColors; i++) 
    {
        let colorsObject = document.createElement("option"); 
        colorsObject.innerText = product.colors[i];
        colorSection.appendChild(colorsObject);
    } 

    //Add item to cart function  
    function addToCart() 
    { 
        //Initializing cart 
        var myCart = [] ;

        if (localStorage.getItem("myCart") && JSON.parse(localStorage.getItem('myCart') != null))
        {
            myCart = JSON.parse(localStorage.getItem('myCart'));
        }

         //New cart line
         const cartLine = new cart(product._id, Number.parseInt(document.querySelector("#quantity").value), document.querySelector("#colors").value);   
          
         //Update current quantity
         function updateQty(i = 0, _qty = 0) 
         {         
            myCart[i].qty += Number.parseInt(_qty);
         }

         //Product exist
         function existId(myCart = [])
         {
            let ref = false;

            for (let i=0;i< myCart.length;i++)
            {
                if (myCart[i]._id == cartLine.id)
                    ref = true;
            }

            return ref;
         }

         //Color exist
         function existColor(myCart = [])
         {
            let ref = false;

            for (let i=0;i< myCart.length;i++)
            {
                if (myCart[i].colors == cartLine.colors)
                    ref = true;
            }
            return ref;
         }

         //Null quantity
         function isNullQty()
         {
            if (Number.parseInt(cartLine.qty) == 0)
                return true;
            else
                return false;
         }

         //Update preparing
         let idExist = existId(myCart);
         let colorExist = existColor(myCart);
         let qtyZero = isNullQty();
         
         if (!idExist && !colorExist)
         {
            if (!qtyZero)
                myCart.push(cartLine);

            else
            {
                alert("La quantité est nulle !!!");
                console.log("La quantité est nulle !!!");
            }
         }
         else
         {
            for (i=0;i<myCart.length;i++)
            {
                if (myCart[i].colors == cartLine.colors)
                {
                    updateQty(i,Number.parseInt(cartLine.qty));
                }
            }               
         } 
         
         //Update local storage cart
         localStorage.setItem('myCart', JSON.stringify(myCart));

         console.log("MYCART : "+ JSON.parse(localStorage.getItem('myCart')));
         console.log(myCart);
    
    }
    //Add to cart
    const addToCartSection = document.querySelector(".item__content__addButton");
    const addToCartObject = document.querySelector("#addToCart");
    addToCartObject.addEventListener("click", addToCart, false);
    addToCartSection.appendChild(addToCartObject);
    
}
displayProduct();
