
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 4545;

// Équivalent de __dirname en modules ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration du moteur de template EJS

app.set('view engine','ejs');
//But : Définit EJS comme moteur de templates par défaut.

app.set('views', path.join(__dirname, '../views'));

// Middleware pour servir les fichiers statiques (CSS, JS, images)
app.use(express.static(path.join(__dirname, '../public')));
//But : Sert les fichiers statiques (CSS, JS, images) depuis le dossier public.
// Utilité : Permet d’accéder à /style.css ou /newsletter.js dans tes pages.
// Middleware pour parser les données des formulaires
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (_req, res) => {
    res.render('tableauDeBord', { title: "Tableau De Bord" });
});

// app.get('/tableauDeBord', (_req, res) => {
//     res.render('tableauDeBord', { title: "Tableau De Bord" });
// });

app.get('/creeAtelier', (_req, res) => {
    res.render('creeAtelier', { title: "Créer un atelier" });
});

app.get('/publicationArticle', (_req, res) => {
    res.render('publicationArticle', { title: "Publication d'article" });
});

app.get('/newsletterPage', (_req, res) => {
    res.render('newsletterPage', { title: "Envoi de la newsletter" });
});

app.get('/adminUserGestion', (_req, res) => {
    res.render('adminUserGestion', { title: "Gestion des utilisateurs" });
});

app.get('/adminAtelierGestion', (_req, res) => {
    res.render('adminAtelierGestion', { title: "Gestion des ateliers" });
});

app.get('/adminModifAtelier', (_req, res) => {
    res.render('adminModifAtelier', { title: "Modification d'atelier" });
});

app.get('/adminArticle',(_req, res)=>{
    res.render('admin-article',{title : "Publication d'article"})
})



app.listen(port, () => {
    console.log(`T'inquiete le serveur a bien demarré : http://localhost:${port}`);
});