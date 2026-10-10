const mongoose = require("mongoose");

/**
 * Schéma Mongoose définissant la structure d'un catway.
 *
 * Il précise les champs obligatoires et les règles de validation
 * appliquées aux données enregistrées dans MongoDB.
 */
const catwaySchema = new mongoose.Schema({
    // Numéro unique du catway, obligatoirement supérieur ou égal à 1.
    catwayNumber: {
        type: Number,
        required: true,
        unique: true,
        min: 1
    },

    // Type de catway : long ou short.
    catwayType: {
        type: String,
        required: true,
        enum: ["long", "short"]
    },

    // État descriptif du catway.
    catwayState: {
        type: String,
        required: true
    }
});

// Création et export du modèle utilisé pour interagir avec la collection Catway.
module.exports = mongoose.model("Catway", catwaySchema);