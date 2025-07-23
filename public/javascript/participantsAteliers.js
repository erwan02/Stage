boutonParticipants = document.getElementById('boutonParticipants');

boutonParticipants.addEventListener('click', function() {
    // Fenetre
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    
    // Contenu fenetre
    const contenu = document.createElement('div');
    contenu.style.cssText = `
        background: white;
        padding: 20px;
        border-radius: 8px;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    
    contenu.innerHTML = `
        <h2>Participants</h2>
        <p>Contenu de ta fenêtre ici...</p>
        <button id="fermerModal">Fermer</button>
    `;
    
    modal.appendChild(contenu);
    document.body.appendChild(modal);
    
    // Fermer fenetre
    document.getElementById('fermerModal').addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // Fermer en cliquant dehors
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
});