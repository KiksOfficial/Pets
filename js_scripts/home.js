let hunger = document.getElementById("hunger");
let kassitoit = document.getElementById("kassitoit");

let img = document.getElementById("syda");
let toit_kogus = 100;
kassitoit.textContent = toit_kogus;

async function toggleImg() {
  if (toit_kogus < 5 && toit_kogus > 0) {
    img.hidden = !img.hidden;
    hunger.value = Math.min(100, hunger.value + toit_kogus);
    toit_kogus = 0;
    kassitoit.textContent = toit_kogus;
    await sleep(500);
    img.hidden = !img.hidden;
  }
  else if (toit_kogus > 0) {
    img.hidden = !img.hidden;
    hunger.value = Math.min(100, hunger.value + 5);
    toit_kogus -= 5;
    kassitoit.textContent = toit_kogus;
    await sleep(500);
    img.hidden = !img.hidden;
  }
  else {
    alert("Toit otsas, mine mangi plinkot");
  }
}

//Marcus Kikerpill

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

//  https://www.geeksforgeeks.org/javascript/what-is-the-javascript-version-of-sleep-method/


var i = 0;

// reaalne intervall = 300000
function drainHungerMain() {
  setInterval(drainHunger, 300)
  function drainHunger() {
    if (hunger.value > 0) {
      hunger.value -= 1;
    } else {
      alert("KASS ON SURNUD!!!!!!!!!!!!!")
    }
  };
}

drainHungerMain();

// Marcus Kikerpill
