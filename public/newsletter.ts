const accessibilityToggle = document.getElementById('accessibilityToggle') as HTMLButtonElement | null;
const body = document.body;
const announcements = document.getElementById('announcements') as HTMLElement | null;

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

function enableAccessibilityMode(): void {
    body.classList.add('accessibility-mode');
    if (accessibilityToggle) {
        accessibilityToggle.classList.add('active');
        accessibilityToggle.setAttribute('aria-pressed', 'true');
    }
    if (announcements) announcements.textContent = 'Mode accessibilité activé. Taille du texte augmentée, contrastes renforcés.';
    localStorage.setItem('accessibilityMode', 'true');
}

function disableAccessibilityMode(): void {
    body.classList.remove('accessibility-mode');
    if (accessibilityToggle) {
        accessibilityToggle.classList.remove('active');
        accessibilityToggle.setAttribute('aria-pressed', 'false');
    }
    if (announcements) announcements.textContent = 'Mode accessibilité désactivé. Retour à l\'affichage normal.';
    localStorage.setItem('accessibilityMode', 'false');
}

// Gestion des modèles
const modeleSelect = document.getElementById('modele') as HTMLSelectElement | null;
const contenuTextarea = document.getElementById('contenu') as HTMLTextAreaElement | null;

if (modeleSelect && contenuTextarea && announcements) {
    modeleSelect.addEventListener('change', function (this: HTMLSelectElement) {
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
}

// Validation du formulaire
const form = document.querySelector('form');
const objetInput = document.getElementById('objet') as HTMLInputElement | null;

if (form && objetInput && contenuTextarea && announcements) {
    form.addEventListener('submit', function (e: Event) {
        e.preventDefault();
        let isValid = true;

        // Validation de l'objet
        if (!objetInput.value.trim()) {
            showError('objet-error', 'L\'objet est obligatoire');
            isValid = false;
        } else {
            hideError('objet-error');
        }

        // Validation du contenu
        if (!contenuTextarea.value.trim()) {
            showError('contenu-error', 'Le contenu est obligatoire');
            isValid = false;
        } else {
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
        } else {
            announcements.textContent = 'Veuillez corriger les erreurs dans le formulaire.';
        }
    });

    // Gestion du bouton reset
    form.addEventListener('reset', function () {
        hideError('objet-error');
        hideError('contenu-error');
        announcements.textContent = 'Formulaire réinitialisé.';
    });
}

function showError(errorId: string, message: string): void {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
        (errorElement as HTMLElement).style.display = 'block';
    }
}

function hideError(errorId: string): void {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        (errorElement as HTMLElement).style.display = 'none';
    }
}

// Navigation au clavier améliorée
document.addEventListener('keydown', function (e: KeyboardEvent) {
    // Raccourci clavier pour activer/désactiver le mode accessibilité (Alt + A)
    if (e.altKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        if (accessibilityToggle) accessibilityToggle.click();
    }
});