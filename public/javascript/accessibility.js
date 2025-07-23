// ====== CONFIG ======
const DEFAULT_FONT_SIZE = 100; // %
const MIN_FONT = 70;
const MAX_FONT = 300;

// ====== ELEMENTS ======
const ROOT = document.documentElement;
const body = document.body;

const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');
const zoomResetBtn = document.getElementById('zoomReset');

const accessibilityToggle = document.getElementById('accessibilityToggle');
const announcements = document.getElementById('announcements');

// ====== STATE INIT ======
let currentFontSize = parseInt(localStorage.getItem('fontSizePercent') || DEFAULT_FONT_SIZE, 10);
ROOT.style.fontSize = currentFontSize + '%';

const isAccessibilityMode = JSON.parse(localStorage.getItem('accessibilityMode') || 'false');
if (isAccessibilityMode) enableAccessibilityMode();

// ====== EVENTS ======
zoomInBtn?.addEventListener('click', () => changeFontSize(10));
zoomOutBtn?.addEventListener('click', () => changeFontSize(-10));
zoomResetBtn?.addEventListener('click', resetFontSize);

accessibilityToggle?.addEventListener('click', () => {
  body.classList.contains('accessibility-mode') ? disableAccessibilityMode() : enableAccessibilityMode();
});

// Raccourcis clavier: Alt + = / Alt + - / Alt + 0 / Alt + A
document.addEventListener('keydown', (e) => {
  if (!e.altKey) return;

  switch (e.key) {
    case '+':
    case '=':
      e.preventDefault(); changeFontSize(10); break;
    case '-':
      e.preventDefault(); changeFontSize(-10); break;
    case '0':
      e.preventDefault(); resetFontSize(); break;
    case 'a':
    case 'A':
      e.preventDefault();
      accessibilityToggle?.click();
      break;
    default:
      break;
  }
});

// ====== FUNCTIONS ======
function changeFontSize(delta) {
  currentFontSize = clamp(currentFontSize + delta, MIN_FONT, MAX_FONT);
  ROOT.style.fontSize = currentFontSize + '%';
  localStorage.setItem('fontSizePercent', currentFontSize);
  announce(`Taille du texte ${currentFontSize}%`);
}

function resetFontSize() {
  currentFontSize = DEFAULT_FONT_SIZE;
  ROOT.style.fontSize = currentFontSize + '%';
  localStorage.setItem('fontSizePercent', currentFontSize);
  announce('Taille du texte réinitialisée');
}

function enableAccessibilityMode() {
  body.classList.add('accessibility-mode');
  accessibilityToggle?.classList.add('active');
  accessibilityToggle?.setAttribute('aria-pressed', 'true');
  localStorage.setItem('accessibilityMode', 'true');
  announce('Mode accessibilité activé.');
}

function disableAccessibilityMode() {
  body.classList.remove('accessibility-mode');
  accessibilityToggle?.classList.remove('active');
  accessibilityToggle?.setAttribute('aria-pressed', 'false');
  localStorage.setItem('accessibilityMode', 'false');
  announce('Mode accessibilité désactivé.');
}

function announce(message) {
  if (announcements) announcements.textContent = message;
}

function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}
