
class AccessibilityManager {
  constructor() {
    // Config
    this.DEFAULT_FONT_SIZE = 100;
    this.MIN_FONT = 70;
    this.MAX_FONT = 300;

    // Elements
    this.ROOT = document.documentElement;
    this.body = document.body;
    this.zoomInBtn = document.getElementById('zoomIn');
    this.zoomOutBtn = document.getElementById('zoomOut');
    this.zoomResetBtn = document.getElementById('zoomReset');
    this.accessibilityToggle = document.getElementById('accessibilityToggle');
    this.announcements = document.getElementById('announcements');

    // State
    this.currentFontSize = parseInt(localStorage.getItem('fontSizePercent') || this.DEFAULT_FONT_SIZE, 10);
    this.ROOT.style.fontSize = this.currentFontSize + '%';

    const isAccessibilityMode = JSON.parse(localStorage.getItem('accessibilityMode') || 'false');
    if (isAccessibilityMode) this.enableAccessibilityMode();

    // Events
    this.initEvents();
    this.initLogoClick();
    this.initGrowEffect();
  }

  initEvents() {
    this.zoomInBtn?.addEventListener('click', () => this.changeFontSize(10));
    this.zoomOutBtn?.addEventListener('click', () => this.changeFontSize(-10));
    this.zoomResetBtn?.addEventListener('click', () => this.resetFontSize());

    this.accessibilityToggle?.addEventListener('click', () => {
      this.body.classList.contains('accessibility-mode') ? this.disableAccessibilityMode() : this.enableAccessibilityMode();
    });

    document.addEventListener('keydown', (e) => {
      if (!e.altKey) return;
      switch (e.key) {
        case '+':
        case '=':
          e.preventDefault(); this.changeFontSize(10); break;
        case '-':
          e.preventDefault(); this.changeFontSize(-10); break;
        case '0':
          e.preventDefault(); this.resetFontSize(); break;
        case 'a':
        case 'A':
          e.preventDefault(); this.accessibilityToggle?.click(); break;
        default:
          break;
      }
    });
  }

  changeFontSize(delta) {
    this.currentFontSize = this.clamp(this.currentFontSize + delta, this.MIN_FONT, this.MAX_FONT);
    this.ROOT.style.fontSize = this.currentFontSize + '%';
    localStorage.setItem('fontSizePercent', this.currentFontSize);
    this.announce(`Taille du texte ${this.currentFontSize}%`);
  }

  resetFontSize() {
    this.currentFontSize = this.DEFAULT_FONT_SIZE;
    this.ROOT.style.fontSize = this.currentFontSize + '%';
    localStorage.setItem('fontSizePercent', this.currentFontSize);
    this.announce('Taille du texte réinitialisée');
  }

  enableAccessibilityMode() {
    this.body.classList.add('accessibility-mode');
    this.accessibilityToggle?.classList.add('active');
    this.accessibilityToggle?.setAttribute('aria-pressed', 'true');
    localStorage.setItem('accessibilityMode', 'true');
    this.announce('Mode accessibilité activé.');
  }

  disableAccessibilityMode() {
    this.body.classList.remove('accessibility-mode');
    this.accessibilityToggle?.classList.remove('active');
    this.accessibilityToggle?.setAttribute('aria-pressed', 'false');
    localStorage.setItem('accessibilityMode', 'false');
    this.announce('Mode accessibilité désactivé.');
  }

  announce(message) {
    if (this.announcements) this.announcements.textContent = message;
  }

  clamp(val, min, max) {
    return Math.min(max, Math.max(min, val));
  }

  initLogoClick() {
    document.querySelectorAll('.logo').forEach(logo => {
      logo.style.cursor = 'pointer';
      logo.addEventListener('click', () => {
        window.location.href = '/index';
      });
    });
  }

  initGrowEffect() {
    document.querySelectorAll('a, button, input, select, textarea, label').forEach(el => {
      el.addEventListener('click', () => {
        el.classList.add('nav-grow');
      });
    });
  }
}

// Initialisation
window.AccessibilityManager = new AccessibilityManager();
