class Zoom {
  constructor() {
    this.niveauDeZoom = [100, 120, 140]; // Normal moyen et grand
    this.indexNiveauZoom = 0; // Index du niveau actuel
    this.elementsOriginaux = new Map(); // Stocke les tailles original
    
    this.init();
  }
  
  init() {
    // Sauvegarder les tailles originales au chargement
    this.sauvegarderTaillesOriginales();
    
    // Charger le zoom sauvegardé
    this.chargerZoomSauvegarde();
    
    const accessibilityButton = document.getElementById('accessibilityToggle');
    
    if (accessibilityButton) {
      accessibilityButton.addEventListener('click', () => this.cycleZoom());
    }
  }
  
  // Sauvegarde les tailles de police originales de tous les éléments texte
  sauvegarderTaillesOriginales() {
    const selecteurs = 'h1, h2, h3, h4, h5, h6, p, span, div, a, button, input, textarea, select, label, li, td, th, blockquote, code, small';
    const elements = document.querySelectorAll(selecteurs);
    
    elements.forEach(element => {
      const style = window.getComputedStyle(element);
      const fontSize = parseFloat(style.fontSize);
      this.elementsOriginaux.set(element, fontSize);
    });
  }
  
  // Met à jour la liste des éléments (pour le contenu dynamique)
  mettreAJourElements() {
    const selecteurs = 'h1, h2, h3, h4, h5, h6, p, span, div, a, button, input, textarea, select, label, li, td, th, blockquote, code, small';
    const elements = document.querySelectorAll(selecteurs);
    
    elements.forEach(element => {
      if (!this.elementsOriginaux.has(element)) {
        const style = window.getComputedStyle(element);
        const fontSize = parseFloat(style.fontSize);
        this.elementsOriginaux.set(element, fontSize);
      }
    });
  }
  
  cycleZoom() {
    // Passer au 2eme zoom
    this.indexNiveauZoom = (this.indexNiveauZoom + 1) % 3;
    
    // Appliquer le zoom
    this.appliquerZoom();
    
    // Sauvegarder le niveau
    this.sauvegarderZoom();
    
    console.log('Zoom niveau:', this.indexNiveauZoom + 1, '- Taille:', this.niveauDeZoom[this.indexNiveauZoom] + '%');
  }
  
  appliquerZoom() {
    const facteurZoom = this.niveauDeZoom[this.indexNiveauZoom] / 100;
    
    // Mettre à jour la liste des éléments (pour le contenu ajouté dynamiquement)
    this.mettreAJourElements();
    
    // Appliquer le zoom à tous les éléments
    this.elementsOriginaux.forEach((tailleOriginale, element) => {
      // Vérifier que l'élément existe encore dans le DOM
      if (document.contains(element)) {
        const nouvelleTaille = tailleOriginale * facteurZoom;
        element.style.fontSize = nouvelleTaille + 'px';
      }
    });
  }
  
  // Sauvegarde le niveau de zoom
  sauvegarderZoom() {
    localStorage.setItem('zoomAccessibilite', this.indexNiveauZoom);
  }
  
  // Charge le zoom sauvegardé
  chargerZoomSauvegarde() {
    const zoomSauvegarde = localStorage.getItem('zoomAccessibilite');
    
    if (zoomSauvegarde !== null) {
      this.indexNiveauZoom = parseInt(zoomSauvegarde);
      // Appliquer le zoom après un petit délai pour que les éléments soient chargés
      setTimeout(() => {
        this.appliquerZoom();
      }, 100);
    }
  }
  
  // Obtenir le niveau actuel
  getNiveauActuel() {
    return {
      niveau: this.indexNiveauZoom + 1,
      pourcentage: this.niveauDeZoom[this.indexNiveauZoom]
    };
  }
  
  // Remettre à zéro
  reinitialiser() {
    this.indexNiveauZoom = 0;
    this.appliquerZoom();
    this.sauvegarderZoom();
  }
}

// Initialise au chargement de page
document.addEventListener('DOMContentLoaded', function() {
  window.zoomAccessibilite = new Zoom();
});