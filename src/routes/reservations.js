const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const reservationsController = require("../controllers/reservationsController");

// Création du routeur dédié à la gestion des réservations.
const router = express.Router();

/**
 * Routes de gestion des réservations associées aux catways.
 *
 * Toutes les routes sont protégées par le middleware d'authentification :
 * l'utilisateur doit être connecté pour accéder aux opérations.
 */

// Récupère toutes les réservations d'un catway.
router.get(
    "/:catwayNumber/reservations",
    authMiddleware,
    reservationsController.getReservationsByCatway
);

// Récupère une réservation précise d'un catway.
router.get(
    "/:catwayNumber/reservations/:idReservation",
    authMiddleware,
    reservationsController.getReservationById
);

// Crée une réservation pour un catway.
router.post(
    "/:catwayNumber/reservations",
    authMiddleware,
    reservationsController.createReservation
);

// Modifie une réservation identifiée par son identifiant.
router.put(
    "/:catwayNumber/reservations/:idReservation",
    authMiddleware,
    reservationsController.updateReservation
);

// Supprime une réservation identifiée par son identifiant.
router.delete(
    "/:catwayNumber/reservations/:idReservation",
    authMiddleware,
    reservationsController.deleteReservation
);

// Export du routeur pour son utilisation dans src/index.js.
module.exports = router;