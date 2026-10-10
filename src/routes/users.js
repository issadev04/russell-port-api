const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const usersController = require("../controllers/usersController");

// Création du routeur dédié à la gestion des utilisateurs.
const router = express.Router();

/**
 * Routes de gestion des utilisateurs.
 *
 * La création d'un compte est accessible sans authentification.
 * Les autres opérations nécessitent une connexion.
 */

// Récupère la liste de tous les utilisateurs.
router.get("/", authMiddleware, usersController.getAllUsers);

// Récupère un utilisateur à partir de son adresse e-mail.
router.get("/:email", authMiddleware, usersController.getUserByEmail);

// Crée un compte utilisateur sans authentification préalable.
router.post("/", usersController.createUser);

// Modifie les informations d'un utilisateur identifié par son e-mail.
router.put("/:email", authMiddleware, usersController.updateUser);

// Supprime un utilisateur identifié par son e-mail.
router.delete("/:email", authMiddleware, usersController.deleteUser);

// Export du routeur pour son utilisation dans src/index.js.
module.exports = router;