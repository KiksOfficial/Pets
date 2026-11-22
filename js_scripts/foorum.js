// Autor: Egert Kerve, koos ChatGPT abiga
// Edetabelis laikimise funktsioon

// Leiab kõik laikimisnupud
const nupud = document.querySelectorAll(".like");


nupud.forEach(nupp => {
    const id = nupp.dataset.id;
    const algneArv = Number(nupp.dataset.likes);

    //Kontrollib kas pildile on laik antud
    if (localStorage.getItem(id) === "true") {
        nupp.textContent = "❤️ " + (algneArv + 1);
        nupp.disabled = true;
    }
    // Pildile laigi andmine
    nupp.addEventListener("click", () => {
        nupp.textContent = "❤️ " + (algneArv + 1);
        nupp.disabled = true;

        // Salvestab laigi 
        localStorage.setItem(id, "true");
    });
});
