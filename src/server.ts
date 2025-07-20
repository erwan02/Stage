import express from "express";
import path from "path";
import { fileURLToPath } from "url";
<<<<<<< HEAD:src/server.js

=======
// @ts-ignore
import ejsMate from "ejs-mate" 
>>>>>>> 47e9b86588ee5d51e80ee3905643f82192818923:src/server.ts

const app = express();
const port = 4545;

// Équivalent de __dirname en modules ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration du moteur de template EJS


//Utilité : Permet d’utiliser les layouts (<%- body %>)
//  et les partials facilement dans EJS.

app.set('view engine','ejs');
//But : Définit EJS comme moteur de templates par défaut.
//Utilité : Tu peux utiliser res.render('page') pour afficher une vue .ejs.

app.set('views', path.join(__dirname, '../views'));
//But : Indique à Express où trouver tes fichiers de vues.
//Utilité : Toutes tes pages .ejs doivent être dans ce dossier.

// Middleware pour servir les fichiers statiques (CSS, JS, images)
app.use(express.static(path.join(__dirname, '../public')));
//But : Sert les fichiers statiques (CSS, JS, images) depuis le dossier public.
// Utilité : Permet d’accéder à /style.css ou /newsletter.js dans tes pages.
// Middleware pour parser les données des formulaires
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Exemple de route pour la newsletter
app.get('/newsletter-page', (_req, res) => {
    res.render('newsletter-page', { title: "Envoi de la newsletter" });
});

app.listen(port, () => {
    console.log(`T'inquiete le serveur a bien demarré : http://localhost:${port}/newsletter-page`);
});