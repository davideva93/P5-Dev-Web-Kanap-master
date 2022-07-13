let data = []
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId= urlParams.get("id");

fetch("http://localhost:3000/api/products/"+productId)
    .then(function (res) {
        return res.json()
    })
    .then(function (res) { data = res })
    .then(
        function pageControle() { //controle l'id et affiche les détails
                    document.getElementById("title").textContent = data.name;
                    document.querySelector(".item img").src = data.imageUrl
                    document.querySelector(".item__content__titlePrice p").textContent += " " + data.price
                    document.querySelector(".item__content__description p").textContent += " " + data.description
                    let numberOfColor = data.colors.length
                    for (let a = 0; a < numberOfColor; a++) {
                        let numberOfPresetColor = document.getElementById("colors").length - 1
                        if (numberOfPresetColor < numberOfColor) {
                            let clone = colors.lastElementChild.cloneNode(true);
                            { colors.appendChild(clone); }
                        } //si les couleurs préexistantes (2) sont moins que les couleurs du sofa choisi, on clone une couleur préexistante pour pouvoir ensuite effectuer le remplacement
                        document.getElementById("colors")[a + 1].innerHTML = data.colors[a];
                        document.getElementById("colors")[a + 1].value = data.colors[a]
                    } //remplace les couleur standard avec les vrais

        })

addToCart.addEventListener("click", ajouterAuPanier)
var monPanier = [];
function ajouterAuPanier() {
    //si il y a un localStorage, on le met dans la variable monPanier
    if (window.localStorage.getItem("KanapPanier") != null) { monPanier = JSON.parse(window.localStorage.getItem("KanapPanier")) }
    function idExistCheck(monPanier) {
        return monPanier.id === idCanape;
    }
    let idCanape = window.location.href.split("=")[1];//pour trouver l'id du produit
    function colorExistCheck(monPanier) {
        return monPanier.color === colorCanape;
    }
    let colorCanape = document.getElementById("colors").value
    let quantityCanape = document.getElementById("quantity").value
    if (document.getElementById("quantity").value == 0) { alert("Il faut choisir une quantité") } //controle quantité
    else if (colorCanape == "") { alert("il faut choisir une couleur") }//controle couleur
    //quantité et couleur choisis:

    else if (monPanier.filter(colorExistCheck).find(idExistCheck) == null)
    //si le produit n'existe pas dans le localStorage ou si il existe mais en couleur differente, il faut le créer
    { let article = { id: idCanape, color: colorCanape, quantity: quantityCanape }; monPanier.push(article); localStorage.setItem("KanapPanier", JSON.stringify(monPanier)); document.getElementById("quantity").value = 0; document.getElementById("colors").value = "" }
    //si le produit existe déjà et la couleur est la pareille, on met à jour la quantité

    else {
        monPanier.filter(colorExistCheck).find(idExistCheck).quantity = parseInt(monPanier.filter(colorExistCheck).find(idExistCheck).quantity) + parseInt(quantityCanape); localStorage.setItem("KanapPanier", JSON.stringify(monPanier)); document.getElementById("quantity").value = 0; document.getElementById("colors").value = ""
    }


}