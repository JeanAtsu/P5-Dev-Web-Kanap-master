// Afficher les infos du produit sélectionné
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

    //Récupérer l'ID du produit sélectionné
   
    const url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    
    //Objet produit
    function myProduct(product) 
    {
        return product._id === id;
    }
   
    const product = products.find(myProduct);

    //Image
    const sectionImage = document.querySelector(".item__img");

    const imageObject = document.createElement("img");
    imageObject.alt = product.altTxt;
    imageObject.src = product.imageUrl;
    sectionImage.appendChild(imageObject); 

    const sectionTitrePrix = document.querySelector(".item__content__titlePrice");

    //Titre - Nom produit
    const titleObject = document.createElement("h1");
    titleObject.innerText = product.name;
    sectionTitrePrix.appendChild(titleObject);
    //Prix
    const priceObject = document.querySelector("#price");
    priceObject.innerText = product.price;
  
    //Description 
    const descriptionObject = document.querySelector("#description");
    descriptionObject.innerText = product.description;

    //Couleurs disponibles
    let nbColors = product.colors.length;
    const colorSection = document.querySelector("#colors");
    for(let i = 0; i < nbColors; i++) 
    {
        let colorsObject = document.createElement("option"); 
        colorsObject.innerText = product.colors[i];
        colorSection.appendChild(colorsObject);
    } 

    //Ajouter le produit au panier
    function addToCart() 
    { 
        
        var myCart = [] ;

        if (localStorage.getItem("myCart") && JSON.parse(localStorage.getItem('myCart') != null))
        {
            myCart = JSON.parse(localStorage.getItem('myCart'));
        }

        //New cart
        const cartLine = new cart(product._id, Number.parseInt(document.querySelector("#quantity").value), document.querySelector("#colors").value);   
        
        //Modification quantité
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
                {
                    ref = true;
                }
            }
            return ref;
        }

        //Test quantity
        function isQtyKo()
        {
            if ((Number.parseInt(cartLine.qty) <= 0) || (Number.parseInt(cartLine.qty) > 100))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        //Mise à jour du panier
        let idExist = existId(myCart);
        let colorExist = existColor(myCart);
        let qtyKo = isQtyKo();
 
        if (!idExist && !colorExist)
        {
            if (!qtyKo)
            {
                if (cartLine.colors == "")
                {
                    alert("La couleur n'est pas choisie !!!")
                }
                else
                {
                
                    myCart.push(cartLine);
                    alert("Ajouté au panier")
                }              
            }
            else
            {
                alert("La quantité est incorrecte !!!");
                return;
            }
        }
        else
        {
            for (i=0;i<myCart.length;i++)
            {
                if (myCart[i].colors == cartLine.colors)
                {
                    updateQty(i,Number.parseInt(cartLine.qty));
                    if (!qtyKo)
                    {
                        alert("Ajouté au panier")
                    }
                }
            }               
        }       
        // Mise à jour du Local storage
        localStorage.setItem('myCart', JSON.stringify(myCart));

    }
    
    const addToCartSection = document.querySelector(".item__content__addButton");
    const addToCartObject = document.querySelector("#addToCart");
    //Listener - Ajouter au panier
    addToCartObject.addEventListener("click", addToCart, false);

    addToCartSection.appendChild(addToCartObject);
    
}
displayProduct();
