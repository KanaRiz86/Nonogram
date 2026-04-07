
export function initAddEventListenerPopup() {

    let btnConnexion = document.getElementById("btnConnexion")
    let btnAide = document.querySelector(".zoneAide button")
    let popupBackground = document.querySelector(".popupBackground")

    btnConnexion.addEventListener("click", () => {
        const logged = btnConnexion.dataset.logged === "true";

        if (logged) {
        // Déconnexion : redirection vers submit_logout.php
        window.location.href = "traitement/connexion/submit_logout.php";
        } else {
        // Connexion : afficher popup
            afficherPopup("popupConnexion");
        }
    });

    btnAide.addEventListener("click", () => {
        afficherPopup("popupAide")
    })

    popupBackground.addEventListener("click", (event) => {
        if (event.target === popupBackground) {
            cacherPopup()
        }
    })
}

// Popup des règles

let btnRegles = document.getElementById("Règles");

btnRegles.addEventListener("click", () => {
    afficherPopup("popupRegles");
});

export function afficherPopup(idPopup) {
    let popupBackground = document.querySelector(".popupBackground")
    let popups = document.querySelectorAll(".popup")

    popupBackground.classList.add("active")

    popups.forEach(p => p.classList.remove("active"))

    document.getElementById(idPopup).classList.add("active")
}

export function cacherPopup() {
    let popupBackground = document.querySelector(".popupBackground")
    let popups = document.querySelectorAll(".popup")

    popupBackground.classList.remove("active")
    popups.forEach(p => p.classList.remove("active"))
}

