// ControlPopup.js
export function initAddEventListenerPopup() {
    const btnConnexion = document.getElementById("btnConnexion");
    const btnAide = document.querySelector(".zoneAide button");
    const popupBackground = document.querySelector(".popupBackground");
    const btnRegles = document.getElementById("Règles");
    const btnFermerRegles = document.getElementById("btnFermerRegles");
    const btnMdpPerdu = document.getElementById("btnMdpPerdu");

    // Vérification DOM
    if (!btnConnexion || !btnAide || !popupBackground || !btnRegles || !btnFermerRegles) {
        console.error("Un ou plusieurs boutons popups sont introuvables !");
        return;
    }

    // Connexion / Déconnexion
    btnConnexion.addEventListener("click", () => {
        const logged = btnConnexion.dataset.logged === "true";
        if (logged) {
            window.location.href = "traitement/connexion/submit_logout.php";
        } else {
            afficherPopup("popupConnexion");
        }
    });

    // Bouton Aide
    btnAide.addEventListener("click", () => {
        afficherPopup("popupAide");
    });

    // Bouton Règles
    btnRegles.addEventListener("click", () => {
        afficherPopup("popupRegles");
    });

    // Bouton Fermer Règles
    btnFermerRegles.addEventListener("click", () => {
        cacherPopup();
    });

    btnMdpPerdu.addEventListener("click", () => {
    afficherPopup("popupChangePassword");
    });

    // Clic sur le fond pour fermer toutes les popups
    popupBackground.addEventListener("click", (event) => {
        if (event.target === popupBackground) {
            cacherPopup();
        }
    });
}

// Afficher popup
export function afficherPopup(idPopup) {
    const popupBackground = document.querySelector(".popupBackground");
    const popups = document.querySelectorAll(".popup");

    popupBackground.classList.add("active");

    popups.forEach(p => p.classList.remove("active"));
    document.getElementById(idPopup).classList.add("active");
}

// Cacher popup
export function cacherPopup() {
    const popupBackground = document.querySelector(".popupBackground");
    const popups = document.querySelectorAll(".popup");

    popupBackground.classList.remove("active");
    popups.forEach(p => p.classList.remove("active"));
}