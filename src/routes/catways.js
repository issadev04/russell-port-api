const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const catwaysController = require("../controllers/catwaysController");

// Création du routeur dédié à la gestion des catways.
const router = express.Router();

/**
 * Routes de gestion des catways.
 *
 * Toutes les routes sont protégées par le middleware d'authentification :
 * l'utilisateur doit être connecté pour accéder aux opérations.
 */

// Récupère la liste de tous les catways.
router.get("/", authMiddleware, catwaysController.getAllCatways);

// Récupère un catway à partir de son numéro.
router.get(
    "/:catwayNumber",
    authMiddleware,
    catwaysController.getCatwayByNumber
);

// Crée un nouveau catway.
router.post("/", authMiddleware, catwaysController.createCatway);

// Modifie un catway identifié par son numéro.
router.put(
    "/:catwayNumber",
    authMiddleware,
    catwaysController.updateCatway
);

// Supprime un catway identifié par son numéro.
router.delete(
    "/:catwayNumber",
    authMiddleware,
    catwaysController.deleteCatway
);

// Export du routeur pour son utilisation dans src/index.js.
module.exports = router;