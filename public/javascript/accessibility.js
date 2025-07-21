// Script commun : accessibilité et annonces
const accessibilityToggle = document.getElementById('accessibilityToggle');
const body = document.body;
const announcements = document.getElementById('announcements');

// Charger les préférences sauvegardées
const isAccessibilityMode = JSON.parse(localStorage.getItem('accessibilityMode') || 'false');
if (isAccessibilityMode) {
    enableAccessibilityMode();
}
if (accessibilityToggle) {
    accessibilityToggle.addEventListener('click', function () {
        const isActive = body.classList.contains('accessibility-mode');
        if (isActive) {
            disableAccessibilityMode();
        } else {
            enableAccessibilityMode();
        }
    });
}
function enableAccessibilityMode() {
    body.classList.add('accessibility-mode');
    if (accessibilityToggle) {
        accessibilityToggle.classList.add('active');
        accessibilityToggle.setAttribute('aria-pressed', 'true');
    }
    if (announcements) {
        announcements.textContent = 'Mode accessibilité activé. Taille du texte augmentée, contrastes renforcés.';
    }
    localStorage.setItem('accessibilityMode', 'true');
}
function disableAccessibilityMode() {
    body.classList.remove('accessibility-mode');
    if (accessibilityToggle) {
        accessibilityToggle.classList.remove('active');
        accessibilityToggle.setAttribute('aria-pressed', 'false');
    }
    if (announcements) {
        announcements.textContent = 'Mode accessibilité désactivé. Retour à l\'affichage normal.';
    }
    localStorage.setItem('accessibilityMode', 'false');
}
// Navigation au clavier améliorée
// Raccourci clavier pour activer/désactiver le mode accessibilité (Alt + A)
document.addEventListener('keydown', function (e) {
    if (e.altKey && e.key === 'a') {
        e.preventDefault();
        if (accessibilityToggle) {
            accessibilityToggle.click();
        }
    }
});
// Fonctions utilitaires pour les annonces
function announce(message) {
    if (announcements) {
        announcements.textContent = message;
    }
}
