const jwt = require("jsonwebtoken");

/**
 * Vérifie l'authentification de l'utilisateur à partir du cookie JWT.
 *
 * Si le jeton est valide, les informations décodées sont ajoutées à req.user
 * et la requête poursuit son traitement.
 *
 * @param {import("express").Request} req - Requête HTTP.
 * @param {import("express").Response} res - Réponse HTTP.
 * @param {import("express").NextFunction} next - Fonction permettant de poursuivre la requête.
 * @returns {void} Réponse HTTP en cas d'erreur ou poursuite du traitement.
 */
function authMiddleware(req, res, next) {
    // Récupère le jeton d'authentification dans le cookie.
    const token = req.cookies.token;

    // Refuse l'accès si aucun jeton n'est présent.
    if (!token) {
        return res.status(401).json({
            message: "Authentification requise"
        });
    }

    try {
        // Vérifie le jeton avec la clé secrète de l'application.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Rend les informations du jeton accessibles aux traitements suivants.
        req.user = decoded;

        // Autorise la poursuite de la requête.
        next();
    } catch (error) {
        // Refuse l'accès si le jeton est invalide ou expiré.
        return res.status(401).json({
            message: "Token invalide ou expiré"
        });
    }
}

// Export du middleware pour protéger les routes de l'application.
module.exports = authMiddleware;