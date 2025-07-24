

// Classe PageNewsletter : gère toute la logique de la page d'envoi de newsletter
class PageNewsletter {
  constructor() {
    // Récupère les éléments du DOM nécessaires
    this.annonces = document.getElementById('announcements');
    this.selectModele = document.getElementById('modele');
    this.zoneContenu = document.getElementById('contenu');
    this.formulaire = document.querySelector('form');
    this.champObjet = document.getElementById('objet');

    // Initialise les événements
    this.initialiserModele();
    this.initialiserFormulaire();
    this.initialiserLogo();
  }

  // Affiche un message dans la zone d'annonces
  annoncer(message) {
    if (this.annonces) {
      this.annonces.textContent = message;
    }
  }

  // Initialise le changement de modèle de newsletter
  initialiserModele() {
    if (this.selectModele && this.zoneContenu) {
      this.selectModele.addEventListener('change', () => {
        switch (this.selectModele.value) {
          case 'modele1':
            this.zoneContenu.value = 'Cher(e) abonné(e),\n\nNous avons le plaisir de vous annoncer un évènement exceptionnel qui se déroulera prochainement.\n\nDate : \nLieu : \nHeure : \n\nN\'hésitez pas à vous inscrire dès maintenant.\n\nCordialement,\nL\'équipe';
            this.annoncer('Modèle "Annonce d\'évènement" appliqué');
            break;
          case 'modele2':
            this.zoneContenu.value = 'Bonjour,\n\nDécouvrez notre dernier article qui traite d\'un sujet passionnant.\n\nTitre de l\'article : \n\nRésumé : \n\nLisez l\'article complet sur notre site web.\n\nBonne lecture !\nL\'équipe';
            this.annoncer('Modèle "Résumé d\'article" appliqué');
            break;
          default:
            if (this.zoneContenu.value.includes('Cher(e) abonné(e)') || this.zoneContenu.value.includes('Bonjour,')) {
              this.zoneContenu.value = '';
              this.annoncer('Modèle supprimé, contenu effacé');
            }
        }
      });
    }
  }

  // Initialise la gestion du formulaire (validation, envoi, reset)
  initialiserFormulaire() {
    if (this.formulaire) {
      this.formulaire.addEventListener('submit', (e) => {
        e.preventDefault();
        let estValide = true;
        // Validation de l'objet
        if (!this.champObjet || !this.champObjet.value.trim()) {
          this.afficherErreur('objet-error', "L'objet est obligatoire");
          estValide = false;
        } else {
          this.cacherErreur('objet-error');
        }
        // Validation du contenu
        if (!this.zoneContenu || !this.zoneContenu.value.trim()) {
          this.afficherErreur('contenu-error', 'Le contenu est obligatoire');
          estValide = false;
        } else {
          this.cacherErreur('contenu-error');
        }
        // Si tout est valide, confirmation et envoi
        if (estValide) {
          if (confirm('Êtes-vous sûr de vouloir envoyer cette newsletter à tous les abonnés ?')) {
            this.annoncer('Newsletter envoyée avec succès à tous les abonnés !');
            alert('Newsletter envoyée avec succès !');
            this.formulaire.reset();
            this.cacherErreur('objet-error');
            this.cacherErreur('contenu-error');
          }
        } else {
          this.annoncer('Veuillez corriger les erreurs dans le formulaire.');
        }
      });
      // Réinitialisation du formulaire
      this.formulaire.addEventListener('reset', () => {
        this.cacherErreur('objet-error');
        this.cacherErreur('contenu-error');
        this.annoncer('Formulaire réinitialisé.');
      });
    }
  }

  // Affiche une erreur sous le champ concerné
  afficherErreur(idErreur, message) {
    const elementErreur = document.getElementById(idErreur);
    if (elementErreur) {
      elementErreur.textContent = message;
      elementErreur.style.display = 'block';
    }
  }

  // Cache l'erreur sous le champ concerné
  cacherErreur(idErreur) {
    const elementErreur = document.getElementById(idErreur);
    if (elementErreur) {
      elementErreur.style.display = 'none';
    }
  }

  // Initialise la redirection sur le logo
  initialiserLogo() {
    document.querySelectorAll('.logo').forEach(logo => {
      logo.style.cursor = 'pointer';
      logo.addEventListener('click', () => {
        window.location.href = '/index';
      });
    });
  }
}

// Instancie la classe PageNewsletter au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  new PageNewsletter();
});
