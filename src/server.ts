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

app.get('/index', (_req, res) => {
    res.render('index', {message : "Welcome les copains bien venu a la page d'accueil"})})

app.get('/newsletter-page', (_req, res) => {
    res.render('newsletter-page', { title: "Envoi de la newsletter" });
});

app.get('/adminUserGestion', (_req, res) => {
    res.render('adminUserGestion', { title: "Gestion des utilisateurs" });
});

app.get('/admin-article',(_req, res)=>{
    res.render('admin-article',{title : "Publication d'article"})
})

app.listen(port, () => {
    console.log(`T'inquiete le serveur a bien demarré : http://localhost:${port}/index`);
});