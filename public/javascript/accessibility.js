class SimpleZoom {
  constructor() {
    this.niveauDeZoom = [100, 120, 140]; // Normal, Moyen, Grand
    this.indexNiveauZoom = 0; // Index du niveau actuel
    
    this.init();
  }
  
  init() {
    const accessibilityButton = document.getElementById('accessibilityToggle');
    
    if (accessibilityButton) {
      accessibilityButton.addEventListener('click', () => this.cycleZoom());
    }
  }
  
  cycleZoom() {
    // Passer au 2eme zoom
    this.indexNiveauZoom = (this.indexNiveauZoom + 1) % 3;
    
    // Appliquer zoom
    const zoomValue = this.niveauDeZoom[this.indexNiveauZoom];
    document.documentElement.style.fontSize = zoomValue + '%';
    
    console.log('Zoom niveau:', this.indexNiveauZoom + 1, '- Taille:', zoomValue + '%');
  }
}

// Initialise au chargenent de page
document.addEventListener('DOMContentLoaded', function() {
  new SimpleZoom();
});