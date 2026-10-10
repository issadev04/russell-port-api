const express = require("express");

// Création du routeur dédié à la documentation.
const router = express.Router();

/**
 * Affiche la page de documentation de l'API.
 *
 * @param {import("express").Request} req - Requête HTTP.
 * @param {import("express").Response} res - Réponse HTTP.
 * @returns {void} Affichage de la vue documentation.ejs.
 */
router.get("/", (req, res) => {
    // Affiche la vue EJS documentation.ejs.
    res.render("documentation");
});

// Export du routeur pour son utilisation dans src/index.js.
module.exports = router;