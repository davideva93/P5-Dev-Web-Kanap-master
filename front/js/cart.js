let data = []

fetch("http://localhost:3000/api/products")
  .then(function (res) {
    return res.json()
  })
  .then(function (res) {
    data = res;

    detailsPanier();

  })

let monPanier = JSON.parse(window.localStorage.getItem("KanapPanier")); //monPanier= localStorage


cloneArticlePanier() //pour créer x articles dans le panier; x= quantité art. differents
function cloneArticlePanier() {
  if (monPanier == null && document.querySelector("article.cart__item ") != null) { document.querySelector("article.cart__item ").remove(); document.getElementById("totalPrice").textContent = 0; return }
  else if (monPanier.length == 0 && document.querySelector("article.cart__item ") != null)//si le panier est vide, aucun article doit s'afficher
  { document.querySelector("article.cart__item ").remove(); document.getElementById("totalPrice").textContent = 0; return }
  else {
    for (let i = 0; i < monPanier.length - 1; i++) {
      let clone = cart__items.lastElementChild.cloneNode(true);
      cart__items.appendChild(clone);
    }
  }
}





let buttonsSupprimer = document.querySelectorAll(".deleteItem")
buttonsSupprimer.forEach((buttonSupprimer) => { //
  buttonSupprimer.addEventListener("click", (e) => { //logique buttons supprimer
    e.path[4].remove();
    let idProduitE = (e.path[4].attributes[1].nodeValue); //id du produit à eliminer
    let colorProduitE = (e.path[4].attributes[2].nodeValue);//couleur du produit à eliminer
    var stockEliminerArrayFiltred = monPanier.filter(function (q) {
      return q.id != idProduitE || q.color != colorProduitE;//on garde juste les elements qui ne sont pas celui eliminé (filtres id et couleur)
    }
    );
    monPanier = stockEliminerArrayFiltred; //panier mis à jour
    localStorage.setItem("KanapPanier", JSON.stringify(monPanier));
    if (monPanier.length == 0) { document.getElementById("totalPrice").textContent = 0 } //mise à jour eventuelle du total
    detailsPanier()
  })
})




let buttonsQuantity = document.querySelectorAll(".itemQuantity")
buttonsQuantity.forEach((buttonQuantity) => { //logique changement quantité

buttonQuantity.addEventListener("focusout", (e) => { //la quantité tapée à la clavier est acceptable? si oui, on enregistre si non on annule
    if (e.target.value > 100 || e.target.value < 1) {
      alert("Le nombre de produits identiques commandés doit être compris entre 1 et 100.  "); detailsPanier()
    }
    else { QAJour(e, buttonQuantity) }
  })
buttonQuantity.addEventListener("click", (f) => { QAJour(f, buttonQuantity) }) //si la quantité est changée a la souris, on met a jour
})


function QAJour(f, buttonQuantity) { //function pour mettre à jour une quantité
  let idProduitQ = (f.path[4].attributes[1].nodeValue); //id du produit dont la quantité change
  let colorProduitQ = (f.path[4].attributes[2].nodeValue);//couleur du produit dont la quantité change
  var stockQuantityArrayFiltred = monPanier.filter(function (q) {
    return q.id == idProduitQ && q.color == colorProduitQ;//on trouve le seul element stocké qui match (filtres id et couleur)
  }
  );
  stockQuantityArrayFiltred[0].quantity = (parseInt(buttonQuantity.value)) //quantité de l'article stocké mis à jour
  localStorage.setItem("KanapPanier", JSON.stringify(monPanier));
  detailsPanier()
}


let idList = []

function detailsPanier() { //affichage détails produits dans le panier
  let a = 0; let total = 0;
  if (monPanier.length != 0) { //si le panier existe
    for (let i = 0; i < monPanier.length; i++) {
      function dataInfo(data) {
        return data._id == monPanier[i].id;
      }

      document.querySelectorAll(".cart__item")[i].dataset.id = monPanier[i].id;  //l'id de l'objet n°0 = id objet n°0 dans le panier
      idList.push(monPanier[i].id);
      document.querySelectorAll(".cart__item")[i].dataset.color = monPanier[i].color;
      document.querySelectorAll("input.itemQuantity")[i].value = monPanier[i].quantity
      document.querySelectorAll(".cart__item__content__description h2")[i].innerHTML = data.find(dataInfo).name;//vise le seul h2 de [i] (le nom du produit) et le met à jour
      document.querySelectorAll(".cart__item__img img")[i].src = data.find(dataInfo).imageUrl; //vise la seule img de [i] et met à jour
      document.querySelectorAll(".cart__item__img img")[i].alt = data.find(dataInfo).altTxt//alt


      if (i == 0) {
        //si [i] est 0 on vise les deux <p> (couleur et prix) presents dans le 1er article . Dans ce cas, <p>[0] et <p>[1]
        document.querySelectorAll(".cart__item__content__description p")[i].innerHTML = monPanier[i].color; //couleur pris par localStorage
        document.querySelectorAll(".cart__item__content__description p")[i + 1].innerHTML = data.find(dataInfo).price; //prix pris par le back
        total = total + data.find(dataInfo).price * parseInt(monPanier[i].quantity) //on met à jour le total: prix * quantité
        document.getElementById("totalPrice").textContent = total;
      }//on affiche le total qu'on vient de mettre à jour
      else {
        // on vise les deux <p> de l'article [i]. Le pair est la couleur, l'impair est le prix. a est necessaire parce que pour chaque article (et donc chaque [i]) il y a deux <p> a modifier
        document.querySelectorAll(".cart__item__content__description p")[i + 1 + a].innerHTML = monPanier[i].color;//i=1..3..5..
        document.querySelectorAll(".cart__item__content__description p")[i + 2 + a].innerHTML = data.find(dataInfo).price;//i=2..4..6..
        total = total + data.find(dataInfo).price * parseInt(monPanier[i].quantity);//on met à jour le total: prix * quantité
        document.getElementById("totalPrice").textContent = total;//on affiche le total qu'on vient de mettre à jour
        a = a + 1;
      }
    }
  }
}








//formulaire
document.getElementById("order").addEventListener("click", testFormulaire)//si le formulaire est valide, submit nous porte a confirmation.html


function testFormulaire() { //tous les champs sont bien remplis?
  event.preventDefault();
  if (document.getElementById("cityErrorMsg").textContent == "" && document.getElementById("city").value != "" &&
    document.getElementById("firstNameErrorMsg").textContent == "" && document.getElementById("firstName").value != "" &&
    document.getElementById("lastNameErrorMsg").textContent == "" && document.getElementById("lastName").value != "" &&
    document.getElementById("addressErrorMsg").textContent == "" && document.getElementById("address").value != "" &&
    document.getElementById("emailErrorMsg").textContent == "" && document.getElementById("email").value != "") { goToConfirmation() }
  else {
    alert("Pour valider est necessaire completer le formulaire")
  }

}


function goToConfirmation(event) {



  const order = {
    contact: {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value
    },
    products: idList //res attendu id1, id2, ..

  }
  const headers = new Headers()
  headers.append("content-type", "application/json")
  const reqInit = {
    method: "post",
    body: JSON.stringify(order),
    headers: headers
  }
  fetch("http://localhost:3000/api/products/order", reqInit)
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      const orderId = res.orderId;
      console.log(res)
      window.location.href = "http://127.0.0.1:5501/front/html/confirmation.html?orderId=" + orderId;

    })








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
  if (value.match(/^[a-zA-Z0-9-. êèé\.]{4,}$/) == null) { document.getElementById("addressErrorMsg").innerHTML = "L'adresse ne semble pas valide" } else { document.getElementById("addressErrorMsg").innerHTML = "" }
}
function villef(value) {
  if (value.match(/^[a-zA-Z-. êèé\.]{2,}$/) == null) { document.getElementById("cityErrorMsg").innerHTML = "Le nom de la ville doit contenir que des lettres; 2 minimum" }
  else { document.getElementById("cityErrorMsg").innerHTML = "" }

}
function emailf(value) {
  if (value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) == null) { document.getElementById("emailErrorMsg").innerHTML = "L'email semble incorrecte ou incomplete" } else { document.getElementById("emailErrorMsg").innerHTML = "" }

}



