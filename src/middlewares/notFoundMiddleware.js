/**
 * Middleware chargé de gérer les routes inexistantes.
 *
 * Renvoie une réponse HTTP 404 lorsque la route demandée
 * ne correspond à aucune route définie dans l'application.
 *
 * @param {import("express").Request} req - Requête HTTP.
 * @param {import("express").Response} res - Réponse HTTP.
 * @returns {import("express").Response} Réponse indiquant que la route est introuvable.
 */
function notFoundMiddleware(req, res) {
    // Retourne le statut 404 avec un message explicite.
    return res.status(404).json({
        message: "Route introuvable"
    });
}

// Export du middleware pour son utilisation dans src/index.js.
module.exports = notFoundMiddleware;