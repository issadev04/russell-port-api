const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * Routes d'affichage des pages liées aux catways.
 *
 * L'accès à ces pages nécessite une authentification.
 */

// Création du routeur dédié à la page des catways.
const router = express.Router();

/**
 * Affiche la page des catways.
 *
 * L'accès nécessite une authentification.
 */
router.get("/", authMiddleware, (req, res) => {
    // Affiche la vue EJS catways.ejs.
    res.render("catways");
});

// Export du routeur pour son utilisation dans src/index.js.
module.exports = router;