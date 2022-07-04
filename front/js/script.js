let data =[]

fetch("http://localhost:3000/api/products")
.then(function(res){
return res.json()
})
.then(function(res){ data=res})
        .then ( function(){ let  parent = document.getElementById("items");   for (let i=0; i<data.length; i++) 
        { let  clone = parent.lastElementChild.cloneNode(true);  //on clone les elements jusqu'à arriver au nombre d'elements presents dans res
            if(i<data.length-1) {parent.appendChild(clone);}; //-1 parce que 1 art déjà présent
            document.getElementsByClassName("productName")[i].innerHTML=data[i].name;
            document.getElementsByClassName("productDescription")[i].innerHTML=data[i].description; 
            document.querySelectorAll("article > img")[i].src=data[i].imageUrl;
            document.querySelectorAll("article > img")[i].alt=data[i].altTxt;
            document.getElementsByClassName("productName")[i].parentNode.setAttribute('id',data[i]._id) //création lien entre id et element
            document.getElementById(data[i]._id).parentNode.href="./product.html?id="+data[i]._id //on change le href
        }})

       

//on trouve l'id de l'article cliqué. EXPLICATION: on ecoute le click sur la class items: 
//1)si l'element cliqué a un id (il est l'article), on le prend; dans le cas contraire, on prend l'id du parent (l'article). 
//2)si ni l'element ni le parents ont un id, alors on a pas cliqué sur un article et on laisse tomber
var articleId
items.addEventListener("click", (e)=>{if(e.path[0].id=="items")
{articleId=""}else{e.path[0].id? articleId=(e.path[0].id):articleId=(e.path[1].id)}})





