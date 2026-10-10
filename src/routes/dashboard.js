const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const dashboardController = require("../controllers/dashboardController");

// Création du routeur dédié au tableau de bord.
const router = express.Router();

/**
 * Affiche le tableau de bord de l'utilisateur connecté.
 *
 * L'accès est protégé par le middleware d'authentification.
 */
router.get("/", authMiddleware, dashboardController.getDashboard);

// Export du routeur pour son utilisation dans src/index.js.
module.exports = router;