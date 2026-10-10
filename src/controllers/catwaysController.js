const catwaysService = require("../services/catwaysService");

/**
 * Gère les erreurs rencontrées lors du traitement d'une requête.
 *
 * @param {import("express").Response} res - Réponse HTTP Express.
 * @param {Error} error - Erreur rencontrée.
 * @returns {import("express").Response} Réponse HTTP avec le code adapté.
 */
function handleError(res, error) {
    // Les erreurs de validation, de conversion et de doublon
    // correspondent à des données que la requête ne peut pas traiter.
    if (
        error.name === "ValidationError" ||
        error.name === "CastError" ||
        error.code === 11000
    ) {
        return res.status(400).json({
            message: "Données invalides"
        });
    }

    // Toute autre erreur est traitée comme une erreur serveur.
    return res.status(500).json({
        message: "Erreur serveur"
    });
}

/**
 * Récupère la liste de tous les catways.
 *
 * @param {import("express").Request} req - Requête HTTP.
 * @param {import("express").Response} res - Réponse HTTP.
 * @returns {Promise<void>} Liste des catways ou erreur HTTP.
 */
async function getAllCatways(req, res) {
    try {
        const catways = await catwaysService.getAllCatways();

        return res.json(catways);
    } catch (error) {
        return handleError(res, error);
    }
}

/**
 * Récupère un catway à partir de son numéro.
 *
 * @param {import("express").Request} req - Requête contenant catwayNumber.
 * @param {import("express").Response} res - Réponse HTTP.
 * @returns {Promise<void>} Catway trouvé ou erreur HTTP.
 */
async function getCatwayByNumber(req, res) {
    try {
        const catway = await catwaysService.getCatwayByNumber(
            req.params.catwayNumber
        );

        // Retourne 404 si aucun catway ne correspond au numéro demandé.
        if (!catway) {
            return res.status(404).json({
                message: "Catway introuvable"
            });
        }

        return res.json(catway);
    } catch (error) {
        return handleError(res, error);
    }
}

/**
 * Crée un nouveau catway à partir des données reçues.
 *
 * @param {import("express").Request} req - Requête contenant les données JSON.
 * @param {import("express").Response} res - Réponse HTTP.
 * @returns {Promise<void>} Catway créé avec le statut HTTP 201.
 */
async function createCatway(req, res) {
    try {
        const catway = await catwaysService.createCatway(req.body);

        return res.status(201).json(catway);
    } catch (error) {
        return handleError(res, error);
    }
}

/**
 * Modifie un catway identifié par son numéro.
 *
 * @param {import("express").Request} req - Requête contenant le numéro et les données.
 * @param {import("express").Response} res - Réponse HTTP.
 * @returns {Promise<void>} Catway modifié ou erreur HTTP.
 */
async function updateCatway(req, res) {
    try {
        const catway = await catwaysService.updateCatway(
            req.params.catwayNumber,
            req.body
        );

        // Retourne 404 si le catway à modifier n'existe pas.
        if (!catway) {
            return res.status(404).json({
                message: "Catway introuvable"
            });
        }

        return res.json(catway);
    } catch (error) {
        return handleError(res, error);
    }
}

/**
 * Supprime un catway identifié par son numéro.
 *
 * @param {import("express").Request} req - Requête contenant le numéro.
 * @param {import("express").Response} res - Réponse HTTP.
 * @returns {Promise<void>} Confirmation de suppression ou erreur HTTP.
 */
async function deleteCatway(req, res) {
    try {
        const catway = await catwaysService.deleteCatway(
            req.params.catwayNumber
        );

        // Retourne 404 si le catway à supprimer n'existe pas.
        if (!catway) {
            return res.status(404).json({
                message: "Catway introuvable"
            });
        }

        return res.json({
            message: "Catway supprimé"
        });
    } catch (error) {
        return handleError(res, error);
    }
}

// Export des fonctions utilisées par le routeur des catways.
module.exports = {
    getAllCatways,
    getCatwayByNumber,
    createCatway,
    updateCatway,
    deleteCatway,
    handleError
};