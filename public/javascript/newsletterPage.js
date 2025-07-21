// --- Logique spécifique à la page newsletter ---
const modeleSelect = document.getElementById('modele');
const contenuTextarea = document.getElementById('contenu');
const form = document.querySelector('form');
const objetInput = document.getElementById('objet');

if (modeleSelect && contenuTextarea && announcements) {
    modeleSelect.addEventListener('change', function () {
        switch (this.value) {
            case 'modele1':
                contenuTextarea.value = 'Cher(e) abonné(e),\n\nNous avons le plaisir de vous annoncer un évènement exceptionnel qui se déroulera prochainement.\n\nDate : \nLieu : \nHeure : \n\nN\'hésitez pas à vous inscrire dès maintenant.\n\nCordialement,\nL\'équipe';
                announce('Modèle "Annonce d\'évènement" appliqué');
                break;
            case 'modele2':
                contenuTextarea.value = 'Bonjour,\n\nDécouvrez notre dernier article qui traite d\'un sujet passionnant.\n\nTitre de l\'article : \n\nRésumé : \n\nLisez l\'article complet sur notre site web.\n\nBonne lecture !\nL\'équipe';
                announce('Modèle "Résumé d\'article" appliqué');
                break;
            default:
                if (contenuTextarea.value.includes('Cher(e) abonné(e)') || contenuTextarea.value.includes('Bonjour,')) {
                    contenuTextarea.value = '';
                    announce('Modèle supprimé, contenu effacé');
                }
        }
    });
}

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;
        // Validation de l'objet
        if (!objetInput || !objetInput.value.trim()) {
            showError('objet-error', 'L\'objet est obligatoire');
            isValid = false;
        } else {
            hideError('objet-error');
        }
        // Validation du contenu
        if (!contenuTextarea || !contenuTextarea.value.trim()) {
            showError('contenu-error', 'Le contenu est obligatoire');
            isValid = false;
        } else {
            hideError('contenu-error');
        }
        if (isValid) {
            if (confirm('Êtes-vous sûr de vouloir envoyer cette newsletter à tous les abonnés ?')) {
                announce('Newsletter envoyée avec succès à tous les abonnés !');
                alert('Newsletter envoyée avec succès !');
                form.reset();
                hideError('objet-error');
                hideError('contenu-error');
            }
        } else {
            announce('Veuillez corriger les erreurs dans le formulaire.');
        }
    });
    form.addEventListener('reset', function () {
        hideError('objet-error');
        hideError('contenu-error');
        announce('Formulaire réinitialisé.');
    });
}

function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}
function hideError(errorId) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}
