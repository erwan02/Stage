// Classe Zoom : gère le zoom de l'interface pour l'accessibilité
class Zoom {
  constructor() {
    // Niveaux de zoom disponibles (en %)
    this.niveaux = [100, 120, 140];
    // Index du niveau de zoom actuel
    this.index = 0;
    // Initialisation du bouton d'accessibilité
    this.init();
  }

  // Initialise le bouton et l'événement
  init() {
    const bouton = document.getElementById('accessibilityToggle');
    if (bouton) {
      bouton.addEventListener('click', () => this.changerZoom());
    }
  }

  // Change le niveau de zoom à chaque clic
  changerZoom() {
    this.index = (this.index + 1) % this.niveaux.length;
    const zoom = this.niveaux[this.index];
    document.documentElement.style.fontSize = zoom + '%';
    console.log(`Niveau de zoom : ${this.index + 1} - Taille : ${zoom}%`);
  }
}

// Instancie la classe Zoom au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  new Zoom();
});