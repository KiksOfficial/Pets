let hunger = document.getElementById("hunger");
let kassitoit = document.getElementById("kassitoit");
let img = document.getElementById("syda");

const KASSITOIT_STORAGE = "kassitoit_storage";
const HUNGER_STORAGE = "hunger_storage";

function init_storage_element(element) {
  const alguses = localStorage.getItem(element);
  const parsitud = alguses == null ? 100 : Number(alguses);
  return Number.isFinite(parsitud) ? parsitud : 100;
}

function uuendaToitKogus(uus) {
  toit_kogus = Math.max(0, uus);
  localStorage.setItem(KASSITOIT_STORAGE, String(toit_kogus));
  if (kassitoit) {
    kassitoit.textContent = Math.round(toit_kogus * 100) / 100;
  }
}

let toit_kogus = init_storage_element(KASSITOIT_STORAGE);
if (kassitoit) {
  kassitoit.textContent = Math.round(toit_kogus * 100) / 100;
}

function uuenda_nalg(uus) {
  const valid = Math.max(0, Math.min(100, uus));
  localStorage.setItem(HUNGER_STORAGE, String(valid));
  if (hunger) {
    hunger.value = valid;
  }
  return valid;
}

// võib-olla toidu kogus ja hunger väärtus säilivad läbi sessioonide

// Tühja ruumi oli jube palju.
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

// toggle image "syda.png"
if (hunger) {
  const praegune_nalg = init_storage_element(HUNGER_STORAGE);
  uuenda_nalg(praegune_nalg);
}

async function toggleImg() {
  if (!hunger) {
    return;
  }

  if (praegune_nalg >= 100) {
    alert("Pets pole näljane");
    return;
  }

  if (toit_kogus <= 0) {
    alert("Toit otsas, mine mangi plinkot");
    return;
  }

  // Kui toitu on alla 5, kasutame kogu allesjäänud toidu
  const kuluv = Math.min(5, toit_kogus);
  const uus_nalg = Math.min(100, praegune_nalg + kuluv);

  hunger.value = uus_nalg;
  localStorage.setItem("hunger_storage", HUNGER_STORAGE);
  uuendaToitKogus(uus_nalg);

  if (img) {
    img.hidden = false;
    await sleep(500);
    img.hidden = true;
  }
}

//Marcus Kikerpill

// loob trigeri, mis käivitub, kui html dokument on parsitud
document.addEventListener("DOMContentLoaded", kuvaTsitaat);

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

//  https://www.geeksforgeeks.org/javascript/what-is-the-javascript-version-of-sleep-method/

// reaalne intervall = 300000
function drainHungerMain() {
  if (!hunger) {
    return;
  }
  setInterval(drainHunger, 300000);
  function drainHunger() {
    const praegune_nalg = Number(hunger.value);
    if (praegune_nalg > 0) {
      uuenda_nalg(praegune_nalg - 1);
    } else {
      alert("PETS ON SURNUD!!!");
    }
  }
}

drainHungerMain();
kuvaTsitaat();

// Marcus Kikerpill
