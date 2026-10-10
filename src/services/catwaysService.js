const Catway = require("../models/Catway");

/**
 * Récupère tous les catways enregistrés dans la base de données.
 *
 * @returns {Promise<Array>} Liste des catways.
 */
async function getAllCatways() {
    return Catway.find();
}

/**
 * Recherche un catway à partir de son numéro.
 *
 * @param {number|string} catwayNumber - Numéro du catway recherché.
 * @returns {Promise<Object|null>} Catway trouvé ou null si absent.
 */
async function getCatwayByNumber(catwayNumber) {
    return Catway.findOne({ catwayNumber });
}

/**
 * Crée et enregistre un nouveau catway.
 *
 * @param {Object} data - Données du catway à créer.
 * @returns {Promise<Object>} Catway enregistré.
 */
async function createCatway(data) {
    const catway = new Catway(data);

    return catway.save();
}

/**
 * Modifie un catway identifié par son numéro.
 *
 * Les validateurs du modèle sont exécutés avant l'enregistrement
 * des modifications.
 *
 * @param {number|string} catwayNumber - Numéro du catway à modifier.
 * @param {Object} data - Données à modifier.
 * @returns {Promise<Object|null>} Catway modifié ou null si absent.
 */
async function updateCatway(catwayNumber, data) {
    return Catway.findOneAndUpdate(
        { catwayNumber },
        data,
        {
            new: true,
            runValidators: true
        }
    );
}

/**
 * Supprime un catway identifié par son numéro.
 *
 * @param {number|string} catwayNumber - Numéro du catway à supprimer.
 * @returns {Promise<Object|null>} Catway supprimé ou null si absent.
 */
async function deleteCatway(catwayNumber) {
    return Catway.findOneAndDelete({ catwayNumber });
}

// Exporte les fonctions pour qu'elles soient utilisées par le contrôleur.
module.exports = {
    getAllCatways,
    getCatwayByNumber,
    createCatway,
    updateCatway,
    deleteCatway
};