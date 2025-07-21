// adminArticle.js
// Logique spécifique à la page de publication d'article

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const titreInput = document.getElementById('titre');
    const contenuTextarea = document.getElementById('contenu');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Validation du titre
        if (!titreInput.value.trim()) {
            showError('titre-error', 'Le titre est obligatoire');
            isValid = false;
        } else {
            hideError('titre-error');
        }

        // Validation du contenu
        if (!contenuTextarea.value.trim()) {
            showError('contenu-error', 'Le contenu est obligatoire');
            isValid = false;
        } else {
            hideError('contenu-error');
        }

        if (isValid) {
            announce('Article publié avec succès !');
            alert('Article publié avec succès !');
        } else {
            announce('Veuillez corriger les erreurs dans le formulaire.');
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

    form.addEventListener('reset', function() {
        hideError('titre-error');
        hideError('contenu-error');
        announce('Formulaire réinitialisé.');
    });
});

// La fonction announce() est fournie par accessibility.js
