let data =[]

fetch("http://localhost:3000/api/products")
.then(function(res){
return res.json()
})
.then(function(res){ data=res })
        .then (
        function pageControle(){ //controle l'id et affiche les détails
            for (let i=0; i<data.length; i++) 
                { if(window.location.href.includes(data[i]._id)) {
                    document.getElementById("title").textContent=data[i].name;
                    document.querySelector(".item img").src=data[i].imageUrl
                    document.querySelector(".item__content__titlePrice p").textContent+=" "+data[i].price
                    document.querySelector(".item__content__description p").textContent+=" "+data[i].description
                    let numberOfColor=data[i].colors.length
                    for (let a=0; a<numberOfColor; a++) 
                        {let numberOfPresetColor=document.getElementById("colors").length-1
                            if(numberOfPresetColor<numberOfColor) {let  clone = colors.lastElementChild.cloneNode(true); 
                                {colors.appendChild(clone);}} //si les couleurs préexistantes (2) sont moins que les couleurs du sofa choisi, on clone une couleur préexistante pour pouvoir ensuite effectuer le remplacement
                            document.getElementById("colors")[a+1].innerHTML=data[i].colors[a];
                            document.getElementById("colors")[a+1].value=data[i].colors[a]} //remplace les couleur standard avec les vrais

                
                } ;}})

addToCart.addEventListener("click",ajouterAuPanier)

function ajouterAuPanier() {let idCanape = window.location.href.split("=")[1] //pour trouver l'id du produit
let colorCanape=document.getElementById("colors").value
let quantityCanape=document.getElementById("quantity").value
    if(document.getElementById("quantity").value==0) {alert("Il faut choisir une quantité")} //controle quantité
    else if (colorCanape==""){alert("il faut choisir une couleur")}//controle couleur
    //quantité et couleur choisis:
    else if( window.localStorage.getItem(idCanape+","+colorCanape)== null)   //si le produit n'existe pas dans le localStorage il faut le créer
        {window.localStorage.setItem(idCanape+","+colorCanape,colorCanape+","+quantityCanape); 
        document.getElementById("quantity").value=0; document.getElementById("colors").value=""}            
    else if(window.localStorage.getItem(idCanape+","+colorCanape).split(",")[0]==colorCanape)  //si le produit existe déjà et la couleur est la pareille, il faut convertir la quantité presente et la quantité à ajouter en number, faire l'addition et mettre à jour
        {quantityCanape=parseInt(quantityCanape)+parseInt(window.localStorage.getItem(idCanape+","+colorCanape).split(",")[1]);
         window.localStorage.setItem(idCanape+","+colorCanape,colorCanape+","+quantityCanape )
         document.getElementById("quantity").value=0; document.getElementById("colors").value=""}
    else{console.log("Erreur ligne 38; rien se passe")}


}