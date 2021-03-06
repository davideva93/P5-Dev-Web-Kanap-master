let data = []
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");

fetch("http://localhost:3000/api/products/" + productId)
    .then(function (res) {
        return res.json()
    })
    .then(function (res) { data = res })
    .then(
        function pageControle() { // affiche les détails (sauf couleurs)
            document.getElementById("title").textContent = data.name;
            document.querySelector(".item img").src = data.imageUrl
            document.querySelector(".item__content__titlePrice p").textContent += " " + data.price
            document.querySelector(".item__content__description p").textContent += " " + data.description;
            setColors(data)
        })



function setColors(data) { //affiche les couleurs disponibles
    //si les couleurs préexistantes (2) sont moins que les couleurs du sofa choisi, on clone une couleur préexistante pour pouvoir ensuite effectuer le remplacement
    let numberOfColor = data.colors.length
    for (let a = 0; a < numberOfColor; a++) {
        let numberOfPresetColor = document.getElementById("colors").length - 1
        if (numberOfPresetColor < numberOfColor) {
            let clone = colors.lastElementChild.cloneNode(true);
            colors.appendChild(clone);
        }
        document.getElementById("colors")[a + 1].innerHTML = data.colors[a];
        document.getElementById("colors")[a + 1].value = data.colors[a]
    } //remplace les couleur standard avec les vrais
}


var monPanier = [];


addToCart.addEventListener("click", controleQuantiteEtCouleur)

function controleQuantiteEtCouleur() { // s'assure que l'utilisateur a choisi une quantité et une couleur
    let colorCanape = document.getElementById("colors").value
    let quantityCanape = document.getElementById("quantity").value
    if (quantityCanape <1||quantityCanape>100) 
        { alert("Il faut choisir une quantité (1-100)") } //controle quantité raté
    else if (colorCanape == "") 
        { alert("il faut choisir une couleur") }    //controle couleur raté
    else 
        { ajouterAuPanier(colorCanape, quantityCanape) } //controles ok

}



function ajouterAuPanier(colorCanape, quantityCanape) {  //met a jour le localStorage
  

    if (window.localStorage.getItem("KanapPanier") != null) { // si il y a un localStorage kanapPanier, on le met dans monPanier
        monPanier = JSON.parse(window.localStorage.getItem("KanapPanier"));
        monPanier.filter((item)=>item.color===colorCanape).find((item)=>item.id==productId) == null ?  
        // si dans monPanier il y a déjà un produit pareil, on change la quantité, sinon on crée un nouveau produit 
            createArticle(colorCanape, quantityCanape) : changeQuantité(quantityCanape, colorCanape); 
            // si il n'y a pas le produit, on le crée
    }
    else { createArticle(colorCanape, quantityCanape) } // si il n'y a pas un localStorage KanapPanier, on le crée 
}



function createArticle(colorCanape, quantityCanape) //crée un nouveau article
    { let article = { id: productId, color: colorCanape, quantity: quantityCanape };
    monPanier.push(article);
    localStorage.setItem("KanapPanier", JSON.stringify(monPanier)); 
    document.getElementById("quantity").value = 0;
    document.getElementById("colors").value = "" }


function changeQuantité(quantityCanape, colorCanape) { //met à jour la quantité
    
    

    let quantiteTotDemandee= parseInt(monPanier.filter((item)=>item.color===colorCanape).find((item)=>item.id==productId).quantity) + parseInt(quantityCanape);
    if(quantiteTotDemandee>100) //quantité tot >100: erreur
        {alert("Malheureusement, commander plus que 100 produits identiques est impossible. Veuillez nous excuser pour la gêne occasionnée ") }
    else{ //mise à jour quantité
    monPanier.filter((item)=>item.color===colorCanape).find((item)=>item.id==productId).quantity = quantiteTotDemandee;
    localStorage.setItem("KanapPanier", JSON.stringify(monPanier)); 
    document.getElementById("quantity").value = 0; 
    document.getElementById("colors").value = ""
}}



