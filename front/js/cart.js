let data = []

fetch("http://localhost:3000/api/products")
  .then(function (res) {
    return res.json()
  })
  .then(function (res) {
    data = res;
    panierIdArrayf();
    idArrayf();
    idPositionf();
    detailsPanier();

  })


let numberProduitsDifferentsPanier = Object.keys(localStorage).length
cloneArticlePanier() //pour créer x articles dans le panier; x= quantité art. differents
function cloneArticlePanier() {
  for (let i = 0; i < numberProduitsDifferentsPanier - 1; i++) {
    let clone = cart__items.lastElementChild.cloneNode(true);
    console.log(cart__items);
    cart__items.appendChild(clone);
  }
}


let idArray = []; //array contenant tous les id des produits en vente
function idArrayf() { idArray = []; for (let i = 0; i < data.length; i++) { console.log("idarray"); idArray.push(data[i]._id) } }



let panierIdArray = []; //array contentant tous les id des produits differents achetés
function panierIdArrayf() {
  panierIdArray = []; for (let i = 0; i < Object.keys(localStorage).length; i++) {
    console.log("panierid");
    panierIdArray.push(Object.keys(localStorage)[i].split(",")[0])
  }
}


let idPosition = [] //array contenant les positions des articles achetés dans le catalogue de vente
function idPositionf() {
  idPosition = [];
  for (const value of panierIdArray) {
    for (let i = 0; i < idArray.length; i++) {
      console.log("idposition");
      if (value == idArray[i]) {
        idPosition.push(i)
      }
    }
  }
}

let buttonsSupprimer = document.querySelectorAll(".deleteItem")
buttonsSupprimer.forEach((buttonSupprimer) => { buttonSupprimer.addEventListener("click", (e) => { localStorage.removeItem(e.path[4].attributes[1].nodeValue + "," + e.path[4].attributes[2].nodeValue); e.path[4].remove(); panierIdArrayf(); idPositionf(); detailsPanier() }) }) //button supprimer BUG!


let buttonsQuantity = document.querySelectorAll(".itemQuantity")
buttonsQuantity.forEach((buttonQuantity) => {
  buttonQuantity.addEventListener("click", (e) => //met à jour la quantité dans le localStorage en recréant la value de la key interessée et relance detailsPanier pour mettre à jour le  total affiché
  { localStorage.setItem(e.path[4].attributes[1].nodeValue + "," + e.path[4].attributes[2].nodeValue, e.path[4].attributes[2].nodeValue + "," + buttonQuantity.value); console.log("itemquantiti"); detailsPanier() })
})


function detailsPanier() {
  let a = 0; let total = 0; if (panierIdArray.length == 0) {
    document.getElementById("totalPrice").textContent = total;
    document.querySelector("article.cart__item ") ? document.querySelector("article.cart__item ").remove() : none;


  }

  for (let i = 0; i < panierIdArray.length; i++) {
    console.log("details");
    document.querySelectorAll(".cart__item")[i].dataset.id = panierIdArray[i]; //l'id de l'objet n°0 = id objet n°0 dans le panier
    document.querySelectorAll(".cart__item")[i].dataset.color = Object.keys(localStorage)[i].split(",")[1];
    document.querySelectorAll(".cart__item__content__description h2")[i].innerHTML = data[idPosition[i]].name;//vise le seul h2 de [i] (le nom du produit) et le met à jour
    document.querySelectorAll("input.itemQuantity")[i].value = window.localStorage.getItem(Object.keys(localStorage)[i]).split(",")[1] //vise le seul input.quantity de [i]  et le met à jour
    document.querySelectorAll(".cart__item__img img")[i].src = data[idPosition[i]].imageUrl; //vise la seule img de [i] et met à jour
    document.querySelectorAll(".cart__item__img img")[i].alt = data[idPosition[i]].altTxt//alt


    if (i == 0) {
      console.log("i=0"); //si [i] est 0 on vise les deux <p> (couleur et prix) presents dans le 1er article . Dans ce cas, <p>[0] et <p>[1]
      document.querySelectorAll(".cart__item__content__description p")[i].innerHTML = Object.keys(localStorage)[i].split(",")[1]; //couleur pris par localStorage
      document.querySelectorAll(".cart__item__content__description p")[i + 1].innerHTML = data[idPosition[i]].price; //prix pris par le back
      total = total + data[idPosition[i]].price * parseInt(document.querySelectorAll("input.itemQuantity")[i].value) //on met à jour le total: prix * quantité
      document.getElementById("totalPrice").textContent = total;
    }//on affiche le total qu'on vient de mettre à jour
    else {
      console.log("else" + i);// on vise les deux <p> de l'article [i]. Le pair est la couleur, l'impair est le prix. a est necessaire parce que pour chaque article (et donc chaque [i]) il y a deux <p> a modifier
      document.querySelectorAll(".cart__item__content__description p")[i + 1 + a].innerHTML = Object.keys(localStorage)[i].split(",")[1];//i=1..3..5..
      document.querySelectorAll(".cart__item__content__description p")[i + 2 + a].innerHTML = data[idPosition[i]].price;//i=2..4..6..
      total = total + data[idPosition[i]].price * parseInt(document.querySelectorAll("input.itemQuantity")[i].value);//on met à jour le total: prix * quantité
      document.getElementById("totalPrice").textContent = total;//on affiche le total qu'on vient de mettre à jour
      a = a + 1;
    }
  }
}



//formulaire
document.getElementById("order").addEventListener("click", goToConfirmation)//si le formulaire est valide, submit nous porte a confirmation.html

function goToConfirmation(event) //!!!!!!!!!!!!!
{
  event.preventDefault(); if (document.getElementById("cityErrorMsg").textContent == "" && document.getElementById("city").value != "" &&
    document.getElementById("firstNameErrorMsg").textContent == "" && document.getElementById("firstName").value != "" &&
    document.getElementById("lastNameErrorMsg").textContent == "" && document.getElementById("lastName").value != "" &&
    document.getElementById("addressErrorMsg").textContent == "" && document.getElementById("address").value != "" &&
    document.getElementById("emailErrorMsg").textContent == "" && document.getElementById("email").value != "") { window.location.href = "http://127.0.0.1:5500/front/html/confirmation.html" } else { alert("Pour valider est necessaire completer le formulaire") }
}






//formulaire incomplet ou non correct

const formulaireElements = document.querySelectorAll(".cart__order__form__question input");
formulaireElements.forEach((formulaireElement) => { //on passe ce qu'on tape a la clavier a les functions concernées
  formulaireElement.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "firstName": prenomf(e.target.value)
        break;
      case "lastName": nomf(e.target.value)
        break;
      case "address": adressef(e.target.value)
        break;
      case "city": villef(e.target.value)
        break;
      case "email": emailf(e.target.value)
        break;
      default: null;
    }
  })
})

function prenomf(value) {
  if (value.match(/^[a-zA-Z-. êèé\.]+$/) == null) { document.getElementById("firstNameErrorMsg").innerHTML = "Le prénom peut contenir que des lettres" } else { document.getElementById("firstNameErrorMsg").innerHTML = "" }

}

function nomf(value) {
  if (value.match(/^[a-zA-Z-. êèé\.]+$/) == null) { document.getElementById("lastNameErrorMsg").innerHTML = "Le nom peut contenir que des lettres" } else { document.getElementById("lastNameErrorMsg").innerHTML = "" } //nom ok

}
function adressef(value) {
  if (value.match(/^[a-zA-Z0-9-. êèé\.]+$/) == null) { document.getElementById("addressErrorMsg").innerHTML = "L'adresse ne semble pas valide" } else { document.getElementById("addressErrorMsg").innerHTML = "" }
}
function villef(value) {
  if (value.match(/^[a-zA-Z-. êèé\.]+$/) == null) { document.getElementById("cityErrorMsg").innerHTML = "Le nom de la ville doit contenir que des lettres" }
  else { document.getElementById("cityErrorMsg").innerHTML = "" }

}
function emailf(value) {
  if (value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) == null) { document.getElementById("emailErrorMsg").innerHTML = "L'email semble incorrecte ou incomplete" } else { document.getElementById("emailErrorMsg").innerHTML = "" }

}



