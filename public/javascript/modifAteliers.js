// Affiche le formulaire de modification et le pré-remplit avec les données de l'atelier

function afficherFormulaireModification(bouton) {
    try {
        // Recupere les donnees de l'atelier
        const rangeeAtelier = bouton.closest('.rangeeAtelier');
        const dataElements = rangeeAtelier.querySelectorAll('.dataAtelier');
        
        if (dataElements.length < 3) {
            console.error('Données de l\'atelier incomplètes');
            return;
        }
        
        // Extraire les informations en nettoyant le texte
        const titreText = extraireTexteApresLabel(dataElements[0].textContent, 'Titre : ');
        const dateText = extraireTexteApresLabel(dataElements[1].textContent, 'Date et lieu : ');
        const descriptionText = extraireTexteApresLabel(dataElements[2].textContent, 'Description : ');
        
        // Séparer la date et le lieu (format: "DD/MM/YYYY - Lieu")
        const dateLieuArray = dateText.split(' - ');
        const date = dateLieuArray[0]?.trim() || '';
        const lieu = dateLieuArray[1]?.trim() || '';
        
        // Pré-remplir le formulaire avec les donnees extraites
        preremplirFormulaire({
            titre: titreText,
            date: date,
            lieu: lieu,
            description: descriptionText
        });
        
        // Effectuer la transition d'affichage
        basculerVersFormulaire();
        
    } catch (error) {
        console.error('Erreur lors de l\'affichage du formulaire:', error);
        alert('Une erreur est survenue lors du chargement des données de l\'atelier.');
    }
}


// Retourne à la liste des ateliers et réinitialise le formulaire

function retournerListe() {
    try {
        // Basculer l'affichage vers la liste
        basculerVersListe();
        
        // Réinitialiser le formulaire
        const formulaire = document.querySelector('#modificationSection form');
        if (formulaire) {
            formulaire.reset();
            effacerMessagesErreur();
        }
        
    } catch (error) {
        console.error('Erreur lors du retour à la liste:', error);
    }
}

function extraireTexteApresLabel(texteComplet, label) {
    return texteComplet.replace(label, '').trim();
}

function preremplirFormulaire(donnees) {
    const champs = {
        'titre': donnees.titre,
        'date': donnees.date,
        'lieu': donnees.lieu,
        'description': donnees.description
    };
    
    // Remplir chaque champ s'il existe
    Object.entries(champs).forEach(([id, valeur]) => {
        const element = document.getElementById(id);
        if (element && valeur) {
            element.value = valeur;
        }
    });
}


// Bascule l'affichage vers le formulaire de modification

function basculerVersFormulaire() {
    const listeSection = document.getElementById('listeSection');
    const modificationSection = document.getElementById('modificationSection');
    
    if (listeSection && modificationSection) {
        listeSection.style.display = 'none';
        modificationSection.style.display = 'block';
        
        // Scroll vers le haut avec animation douce
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Focus sur le premier champ du formulaire pour l'accessibilité
        const premierChamp = document.getElementById('titre');
        if (premierChamp) {
            setTimeout(() => premierChamp.focus(), 100);
        }
    }
}


// Bascule l'affichage vers la liste des ateliers

function basculerVersListe() {
    const listeSection = document.getElementById('listeSection');
    const modificationSection = document.getElementById('modificationSection');
    
    if (listeSection && modificationSection) {
        modificationSection.style.display = 'none';
        listeSection.style.display = 'block';
        
        // Scroll vers le haut avec animation douce
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}


// Efface tous les messages d'erreur du formulaire

function effacerMessagesErreur() {
    const messagesErreur = document.querySelectorAll('[id$="-error"]');
    messagesErreur.forEach(message => {
        message.textContent = '';
    });
}


// Gestion de la soumission du formulaire de modification

function gererSoumissionFormulaire() {
    const formulaire = document.querySelector('#modificationSection form');
    
    if (formulaire) {
        formulaire.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Ici vous pouvez ajouter la logique de validation et d'envoi
            console.log('Formulaire soumis');
            
            // Exemple de traitement
            const donneesFormulaire = new FormData(formulaire);
            console.log('Données du formulaire:', Object.fromEntries(donneesFormulaire));
            
            // Après traitement réussi, retourner à la liste
            // retournerListe();
        });
    }
}


// Initialise les données en chargement de "page"

document.addEventListener('DOMContentLoaded', function() {
    gererSoumissionFormulaire();
    
    // Gestion de la touche Échap pour fermer le formulaire
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modificationSection = document.getElementById('modificationSection');
            if (modificationSection && modificationSection.style.display !== 'none') {
                retournerListe();
            }
        }
    });
});