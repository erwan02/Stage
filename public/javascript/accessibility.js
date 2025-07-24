class Zoom {
  constructor() {
    this.niveauDeZoom = [100, 120, 140]; // Normal, moyen et grand
    this.indexNiveauZoom = 0; // Index du niveau actuel
    
    this.init();
  }
  
  init() {
    // Ajout styles CSS pour que tout les textes se zoom
    this.ajouterStylesCSS();
    
    // Reprend le niveau du zoom
    this.chargerZoomSauvegarde();
    
    // Lie event au btn
    const accessibilityButton = document.getElementById('accessibilityToggle');
    if (accessibilityButton) {
      accessibilityButton.addEventListener('click', () => this.cycleZoom());
    }
  }
  
  // Ajoute les styles CSS nécessaires pour que le zoom fonctionne partout
  ajouterStylesCSS() {
    const style = document.createElement('style');
    style.textContent = `
      /* S'assurer que tous les textes utilisent la taille de base */
      body {
        font-size: 1rem;
        transition: font-size 0.3s ease;
      }
      
      /* Forcer tous les éléments de texte à hériter de la taille de base */
      h1, h2, h3, h4, h5, h6, p, span, div, a, button, input, textarea, 
      select, label, li, td, th, blockquote, code {
        font-size: inherit !important;
      }
      
      /* Garder les proportions des titres */
      h1 { font-size: 2rem !important; }
      h2 { font-size: 1.75rem !important; }
      h3 { font-size: 1.5rem !important; }
      h4 { font-size: 1.25rem !important; }
      h5 { font-size: 1.1rem !important; }
      h6 { font-size: 1rem !important; }
      
      /* Texte plus petit */
      small { font-size: 0.875rem !important; }
      
      /* Animation douce lors du changement */
      * {
        transition: font-size 0.2s ease;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Change le zoom (3 niveaux)
  cycleZoom() {
    // Passer au niveau suivant
    this.indexNiveauZoom = (this.indexNiveauZoom + 1) % this.niveauDeZoom.length;
    
    // Fairele zoom
    this.appliquerZoom();
    
    // Sauvegarder pr changement de page
    this.sauvegarderZoom();
    
    console.log('Zoom niveau:', this.indexNiveauZoom + 1, '- Taille:', this.niveauDeZoom[this.indexNiveauZoom] + '%');
  }
  
  // Applique le zoom actuel
  appliquerZoom() {
    const zoomValue = this.niveauDeZoom[this.indexNiveauZoom];
    document.documentElement.style.fontSize = zoomValue + '%';
  }
  
  // Sauvegarde niveau de zoom dans navigateur
  sauvegarderZoom() {
    localStorage.setItem('zoomAccessibilite', this.indexNiveauZoom);
  }
  
  // Charge niveau de zoom sauvegarde
  chargerZoomSauvegarde() {
    const zoomSauvegarde = localStorage.getItem('zoomAccessibilite');
    
    if (zoomSauvegarde !== null) {
      this.indexNiveauZoom = parseInt(zoomSauvegarde);
      this.appliquerZoom(); // Appliquee zoom sauvegarde
    }
  }
  
  // Avoir niveau de zoom actuel
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
  // Créer une instance globale pour pouvoir l'utiliser ailleurs si besoin
  window.zoomAccessibilite = new Zoom();
});