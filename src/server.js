import express from "express";
// on importe express 
import path from  "path";
// path en gros c pour manipuler les fichiers
import { fileURlToPath } from "url";
//on import la fonction file.. qui convertu une url en chemin de fichier// 



const app =express();
const port = 4545;

// Équivalent de __dirname en modules ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Configuration du moteur de template EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Middleware pour servir les fichiers statiques (CSS, JS, images)
app.use(express.static(path.join(__dirname, '../public')));

// Middleware pour parser les données des formulaires
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.listen(port,()=> {
    console.log(`T'inquiete le serveur a bien demarré au ${port}`)
})


