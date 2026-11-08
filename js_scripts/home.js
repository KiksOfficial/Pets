let hunger = document.getElementById("hunger");
var img = document.getElementById("syda");
hunger.value -= 10; //Or whatever you want to do with it.

var img = document.getElementById("syda");

function toggleImg() {
  img.hidden = !img.hidden;
  hunger.value = Math.max(100, hunger.value + 5);
}
