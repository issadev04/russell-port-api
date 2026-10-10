const reservationsService = require("../services/reservationsService");

/**
 * Récupère toutes les réservations associées à un catway.
 *
 * @param {import("express").Request} req - Requête contenant le numéro du catway.
 * @param {import("express").Response} res - Réponse HTTP.
 * @returns {Promise<import("express").Response>} Liste des réservations ou erreur HTTP.
 */
async function getReservationsByCatway(req, res) {
    try {
        // Recherche les réservations du catway demandé.
        const reservations =
            await reservationsService.getReservationsByCatway(
                req.params.catwayNumber
            );

        return res.json(reservations);
    } catch (error) {
        // Retourne 404 si le catway demandé n'existe pas.
        if (error.message === "Catway introuvable") {
            return res.status(404).json({
                message: "Catway introuvable"
            });
        }

        // Enregistre l'erreur pour faciliter le diagnostic.
        console.error("Erreur getReservationsByCatway :", error);

        return res.status(500).json({
            message: "Erreur serveur"
        });
    }
}

/**
 * Récupère une réservation à partir du catway et de son identifiant.
 *
 * @param {import("express").Request} req - Requête contenant les identifiants.
 * @param {import("express").Response} res - Réponse HTTP.
 * @returns {Promise<import("express").Response>} Réservation trouvée ou erreur HTTP.
 */
async function getReservationById(req, res) {
    try {
        // Recherche la réservation pour le catway et l'identifiant indiqués.
        const reservation =
            await reservationsService.getReservationById(
                req.params.catwayNumber,
                req.params.idReservation
            );

        // Retourne 404 si aucune réservation ne correspond à la recherche.
        if (!reservation) {
            return res.status(404).json({
                message: "Réservation introuvable"
            });
        }

        return res.json(reservation);
    } catch (error) {
        // Retourne 400 si l'identifiant ne peut pas être traité.
        return res.status(400).json({
            message: "Identifiant de réservation invalide"
        });
    }
}

/**
 * Crée une réservation pour un catway.
 *
 * @param {import("express").Request} req - Requête contenant les données de réservation.
 * @param {import("express").Response} res - Réponse HTTP.
 * @returns {Promise<import("express").Response>} Réservation créée ou erreur HTTP.
 */
async function createReservation(req, res) {
    try {
        // Associe le numéro du catway à la réservation créée.
        const reservation = await reservationsService.createReservation({
            ...req.body,
            catwayNumber: req.params.catwayNumber
        });

        // Retourne la réservation créée avec le statut HTTP 201.
        return res.status(201).json(reservation);
    } catch (error) {
        // Enregistre l'erreur pour faciliter le diagnostic.
        console.error("Erreur createReservation :", error);

        // Retourne 404 si le catway demandé n'existe pas.
        if (error.message === "Catway introuvable") {
            return res.status(404).json({
                message: "Catway introuvable"
            });
        }

        // Retourne 400 si les données de réservation sont invalides.
        return res.status(400).json({
            message: "Données invalides"
        });
    }
}

/**
 * Modifie une réservation existante.
 *
 * @param {import("express").Request} req - Requête contenant les identifiants et les données.
 * @param {import("express").Response} res - Réponse HTTP.
 * @returns {Promise<import("express").Response>} Réservation modifiée ou erreur HTTP.
 */
async function updateReservation(req, res) {
    try {
        // Transmet les identifiants et les nouvelles données au service.
        const reservation = await reservationsService.updateReservation(
            req.params.catwayNumber,
            req.params.idReservation,
            req.body
        );

        // Retourne 404 si la réservation n'existe pas.
        if (!reservation) {
            return res.status(404).json({
                message: "Réservation introuvable"
            });
        }

        return res.json(reservation);
    } catch (error) {
        // Enregistre l'erreur pour faciliter le diagnostic.
        console.error("Erreur updateReservation :", error);

        return res.status(400).json({
            message: "Données invalides"
        });
    }
}

/**
 * Supprime une réservation existante.
 *
 * @param {import("express").Request} req - Requête contenant les identifiants.
 * @param {import("express").Response} res - Réponse HTTP.
 * @returns {Promise<import("express").Response>} Confirmation de suppression ou erreur HTTP.
 */
async function deleteReservation(req, res) {
    try {
        // Recherche et supprime la réservation demandée.
        const reservation =
            await reservationsService.deleteReservation(
                req.params.catwayNumber,
                req.params.idReservation
            );

        // Retourne 404 si la réservation n'existe pas.
        if (!reservation) {
            return res.status(404).json({
                message: "Réservation introuvable"
            });
        }

        // Confirme la suppression.
        return res.json({
            message: "Réservation supprimée"
        });
    } catch (error) {
        // Retourne 400 si l'identifiant ne peut pas être traité.
        return res.status(400).json({
            message: "Identifiant de réservation invalide"
        });
    }
}

// Exporte les fonctions utilisées par le routeur des réservations.
module.exports = {
    getReservationsByCatway,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation
};