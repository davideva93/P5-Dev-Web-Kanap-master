let data =[]

fetch("http://localhost:3000/api/products")
.then(function(res){
return res.json()
})
.then(function(res){ data=res})
.then ( function() //affichage articles en vente
    { let  parent = document.getElementById("items");   
        for (let i=0; i<data.length; i++) 
        { let  clone = parent.lastElementChild.cloneNode(true);  //on clone les elements jusqu'à arriver au nombre d'elements presents dans res
            if(i<data.length-1) {parent.appendChild(clone);}; //-1 parce que 1 art déjà présent
            document.getElementsByClassName("productName")[i].innerHTML=data[i].name;
            document.getElementsByClassName("productDescription")[i].innerHTML=data[i].description; 
            document.querySelectorAll("article > img")[i].src=data[i].imageUrl;
            document.querySelectorAll("article > img")[i].alt=data[i].altTxt;
            document.getElementsByClassName("productName")[i].parentNode.setAttribute('id',data[i]._id) //création lien entre id et element
            document.getElementById(data[i]._id).parentNode.href="./product.html?id="+data[i]._id //on change le href
        }})

       

