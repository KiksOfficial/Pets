const nupud = document.querySelectorAll(".like");

nupud.forEach(nupp => {
    const id = nupp.dataset.id;
    const algneArv = Number(nupp.dataset.likes);

    if (localStorage.getItem(id) === "true") {
        nupp.textContent = "❤️ " + (algneArv + 1);
        nupp.disabled = true;
    }

    nupp.addEventListener("click", () => {
        nupp.textContent = "❤️ " + (algneArv + 1);
        nupp.disabled = true;
        localStorage.setItem(id, "true");
    });
});
