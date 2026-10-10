const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const cookieParser = require("cookie-parser");
const path = require("path");
const morgan = require("morgan");

// Middleware et contrôleurs
const notFoundMiddleware = require("./middlewares/notFoundMiddleware");
const usersController = require("./controllers/usersController");

// Routes de l'API
const catwaysRouter = require("./routes/catways");
const reservationsRouter = require("./routes/reservations");
const usersRouter = require("./routes/users");

// Routes des pages web
const dashboardRouter = require("./routes/dashboard");
const catwaysPageRouter = require("./routes/catwaysPage");
const reservationsPageRouter = require("./routes/reservationsPage");
const usersPageRouter = require("./routes/usersPage");
const documentationRouter = require("./routes/documentation");

// Création de l'application Express
const app = express();

// Configuration du moteur de vues EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Autorise la lecture des corps de requêtes au format JSON
app.use(express.json());

// Enregistre les requêtes HTTP dans la console pour faciliter le diagnostic
app.use(morgan("dev"));

// Permet de lire les cookies envoyés par le navigateur
app.use(cookieParser());

// Rend accessibles les fichiers statiques du dossier public
app.use(express.static(path.join(__dirname, "../public"), {
    index: false
}));

// Vérifie que le serveur répond
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

// Affiche la page d'accueil
app.get("/", (req, res) => {
    res.render("index");
});

// Routes des pages du tableau de bord
app.use("/dashboard", dashboardRouter);
app.use("/dashboard/catways", catwaysPageRouter);
app.use("/dashboard/reservations", reservationsPageRouter);
app.use("/dashboard/users", usersPageRouter);

// Route de la documentation de l'API
app.use("/documentation", documentationRouter);

// Routes d'authentification
app.post("/login", usersController.login);
app.get("/logout", usersController.logout);

// Routes de gestion des catways et des réservations
app.use("/catways", catwaysRouter);
app.use("/catways", reservationsRouter);

// Routes de gestion des utilisateurs
app.use("/users", usersRouter);

// Middleware final : traite les URL qui ne correspondent à aucune route
app.use(notFoundMiddleware);

// Port d'écoute du serveur, fourni par l'environnement ou fixé à 3000
const PORT = process.env.PORT || 3000;

/**
 * Démarre le serveur HTTP après la connexion à MongoDB.
 *
 * Le serveur n'accepte aucune requête tant que la base de données
 * n'est pas disponible.
 */
async function startServer() {
    try {
        // Établit la connexion à MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connecté");

        // Démarre le serveur HTTP
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Serveur démarré sur le port ${PORT}`);
        });
    } catch (error) {
        // Affiche l'erreur et arrête le processus si le démarrage échoue
        console.error("Erreur au démarrage de l'application :", error);
        process.exit(1);
    }
}

// Lance l'application
startServer();