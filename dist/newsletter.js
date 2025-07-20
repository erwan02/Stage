// Gestion du mode accessibilité
const accessibilityToggle = document.getElementById('accessibilityToggle');
const body = document.body;
const announcements = document.getElementById('announcements');
// Charger les préférences sauvegardées
const isAccessibilityMode = JSON.parse(localStorage.getItem('accessibilityMode') || 'false');
if (isAccessibilityMode) {
    enableAccessibilityMode();
}
accessibilityToggle.addEventListener('click', function () {
    const isActive = body.classList.contains('accessibility-mode');
    if (isActive) {
        disableAccessibilityMode();
    }
    else {
        enableAccessibilityMode();
    }
});
function enableAccessibilityMode() {
    body.classList.add('accessibility-mode');
    accessibilityToggle.classList.add('active');
    accessibilityToggle.setAttribute('aria-pressed', 'true');
    announcements.textContent = 'Mode accessibilité activé. Taille du texte augmentée, contrastes renforcés.';
    localStorage.setItem('accessibilityMode', 'true');
}
function disableAccessibilityMode() {
    body.classList.remove('accessibility-mode');
    accessibilityToggle.classList.remove('active');
    accessibilityToggle.setAttribute('aria-pressed', 'false');
    announcements.textContent = 'Mode accessibilité désactivé. Retour à l\'affichage normal.';
    localStorage.setItem('accessibilityMode', 'false');
}
// Gestion des modèles
const modeleSelect = document.getElementById('modele');
const contenuTextarea = document.getElementById('contenu');
modeleSelect.addEventListener('change', function () {
    switch (this.value) {
        case 'modele1':
            contenuTextarea.value = 'Cher(e) abonné(e),\n\nNous avons le plaisir de vous annoncer un évènement exceptionnel qui se déroulera prochainement.\n\nDate : \nLieu : \nHeure : \n\nN\'hésitez pas à vous inscrire dès maintenant.\n\nCordialement,\nL\'équipe';
            announcements.textContent = 'Modèle "Annonce d\'évènement" appliqué';
            break;
        case 'modele2':
            contenuTextarea.value = 'Bonjour,\n\nDécouvrez notre dernier article qui traite d\'un sujet passionnant.\n\nTitre de l\'article : \n\nRésumé : \n\nLisez l\'article complet sur notre site web.\n\nBonne lecture !\nL\'équipe';
            announcements.textContent = 'Modèle "Résumé d\'article" appliqué';
            break;
        default:
            if (contenuTextarea.value.includes('Cher(e) abonné(e)') || contenuTextarea.value.includes('Bonjour,')) {
                contenuTextarea.value = '';
                announcements.textContent = 'Modèle supprimé, contenu effacé';
            }
    }
});
// Validation du formulaire
const form = document.querySelector('form');
const objetInput = document.getElementById('objet');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;
    // Validation de l'objet
    if (!objetInput.value.trim()) {
        showError('objet-error', 'L\'objet est obligatoire');
        isValid = false;
    }
    else {
        hideError('objet-error');
    }
    // Validation du contenu
    if (!contenuTextarea.value.trim()) {
        showError('contenu-error', 'Le contenu est obligatoire');
        isValid = false;
    }
    else {
        hideError('contenu-error');
    }
    if (isValid) {
        if (confirm('Êtes-vous sûr de vouloir envoyer cette newsletter à tous les abonnés ?')) {
            announcements.textContent = 'Newsletter envoyée avec succès à tous les abonnés !';
            alert('Newsletter envoyée avec succès !');
            form.reset();
            hideError('objet-error');
            hideError('contenu-error');
        }
    }
    else {
        announcements.textContent = 'Veuillez corriger les erreurs dans le formulaire.';
    }
});
function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}
function hideError(errorId) {
    const errorElement = document.getElementById(errorId);
    errorElement.style.display = 'none';
}
// Gestion du bouton reset
form.addEventListener('reset', function () {
    hideError('objet-error');
    hideError('contenu-error');
    announcements.textContent = 'Formulaire réinitialisé.';
});
// Navigation au clavier amélioréet
document.addEventListener('keydown', function (e) {
    // Raccourci clavier pour activer/désactiver le mode accessibilité (Alt + A)
    if (e.altKey && e.key === 'a') {
        e.preventDefault();
        accessibilityToggle.click();
    }
});
export {};
