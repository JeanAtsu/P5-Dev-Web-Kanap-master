
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
//Import data
function importDataFromAPI()
{
  
}

//Exécution du code
const products = await getDataFromAPI();
console.log(products);
const myCart = getCartFromStorage();
console.log(myCart);
