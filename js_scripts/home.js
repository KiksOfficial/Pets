let hunger = document.getElementById("hunger");
var img = document.getElementById("syda");

var img = document.getElementById("syda");

function toggleImg() {
  img.hidden = !img.hidden;
  hunger.value = Math.max(100, hunger.value + 5);
}

//Autor - Marcus Kikerpill
