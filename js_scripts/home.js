var hunger = document.getElementById("hunger");
var kassitoit = document.getElementById("kassitoit");

var img = document.getElementById("syda");
var toit_kogus = 100;
kassitoit.textContent = toit_kogus;

localStorage.setItem("hunger", hunger);
localStorage.setItem("kassitoit", kassitoit);

const tsitaadid = [
  "The world is yours",
  "I never sleep 'cause sleep is the cousin of death.",
  "There's one life, one love, so there can only be one king.",
  "That buck that bought a bottle could've struck the lotto.",
  "You couldn’t catch me in the streets without a ton of reefer. That’s like Malcolm X catching the Jungle Fever",
  "The champion has a name, and his name is Charles Oliveira.",
  "I can't let you get close!",
  "Train by day, Joe Rogan podcast by night, all day.",
  "Don't be scared, homie!",
  "Just remember ALL CAPS when you spell the man name",
  "There's only one beer left",
  "Cruising down the street in my 6-4",
  "Living off borrowed time, the clock tick faster",
  "If you want to be the best, you've got the beat the best, and the best is 'Blessed,' baby",
];

function kuvaTsitaat() {
  const index = Math.floor(Math.random() * tsitaadid.length);
  const element = document.getElementById("tsitaat");

  if (element) {
    element.textContent = `"${tsitaadid[index]}"`;
  }
}

//Marcus Kikerpill

document.addEventListener("DOMContentLoaded", kuvaTsitaat);

async function toggleImg() {
  if (hunger.value >= 100) {
    alert("Pets pole näljane");
  } else if (toit_kogus < 5 && toit_kogus > 0) {
    img.hidden = !img.hidden;
    hunger.value = Math.min(100, hunger.value + toit_kogus);
    toit_kogus = 0;
    kassitoit.textContent = toit_kogus;
    await sleep(500);
    img.hidden = !img.hidden;
  } else if (toit_kogus > 0) {
    img.hidden = !img.hidden;
    hunger.value = Math.min(100, hunger.value + 5);
    toit_kogus -= 5;
    kassitoit.textContent = toit_kogus;
    await sleep(500);
    img.hidden = !img.hidden;
  } else {
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
  setInterval(drainHunger, 3000);
  function drainHunger() {
    if (hunger.value > 0) {
      hunger.value -= 1;
    } else {
      alert("KASS ON SURNUD!!!!!!!!!!!!!");
    }
  }
}

drainHungerMain();

// Marcus Kikerpill
