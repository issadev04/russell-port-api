const usersService = require("../services/usersService");
const reservationsService = require("../services/reservationsService");

/**
 * Affiche le tableau de bord de l'utilisateur connecté.
 *
 * @param {import("express").Request} req - Requête HTTP.
 * @param {import("express").Response} res - Réponse HTTP.
 * @returns {Promise<import("express").Response|void>} Réponse HTTP ou affichage de la vue.
 */
async function getDashboard(req, res) {
    try {
        // Récupère l'utilisateur connecté à partir de son adresse e-mail.
        const user = await usersService.getUserByEmail(req.user.email);

        // Retourne une erreur si l'utilisateur n'existe plus en base de données.
        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable"
            });
        }

        // Récupère les réservations en cours ou à venir.
        const reservations =
            await reservationsService.getCurrentReservations();

        // Affiche le tableau de bord avec les données de l'utilisateur et les réservations.
        return res.render("dashboard", {
            user,
            reservations
        });
    } catch (error) {
        // Enregistre le message d'erreur dans la console du serveur.
        console.error("Erreur tableau de bord :", error.message);

        // Retourne une erreur serveur en cas d'échec.
        return res.status(500).json({
            message: "Erreur serveur"
        });
    }
}

// Exporte le contrôleur pour son utilisation dans les routes.
module.exports = {
    getDashboard
};