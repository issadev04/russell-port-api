const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * Routes d'affichage des pages liées aux réservations.
 *
 * L'accès à ces pages nécessite une authentification.
 */

// Création du routeur dédié à la page des réservations.
const router = express.Router();

/**
 * Affiche la page des réservations.
 *
 * L'accès nécessite une authentification.
 */
router.get("/", authMiddleware, (req, res) => {
    // Affiche la vue EJS reservations.ejs.
    res.render("reservations");
});

// Export du routeur pour son utilisation dans src/index.js.
module.exports = router;