const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * Routes d'affichage des pages liées aux utilisateurs.
 *
 * L'accès à ces pages nécessite une authentification.
 */

// Création du routeur dédié à la page des utilisateurs.
const router = express.Router();

/**
 * Affiche la page des utilisateurs.
 *
 * L'accès nécessite une authentification.
 */
router.get("/", authMiddleware, (req, res) => {
    // Affiche la vue EJS users.ejs.
    res.render("users");
});

// Export du routeur pour son utilisation dans src/index.js.
module.exports = router;