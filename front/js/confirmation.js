
var url_string = window.location.href; 
var url = new URL(url_string);
var orderId = url.searchParams.get("orderId");
document.getElementById("orderId").innerHTML = orderId;

localStorage.clear();