const mongoose = require("mongoose");

/**
 * Schéma décrivant la structure d'un catway dans la base de données.
 */
const catwaySchema = new mongoose.Schema({
    // Numéro du catway : obligatoire et unique.
    catwayNumber: {
        type: Number,
        required: true,
        unique: true
    },

    // Type de catway : seules les valeurs "long" et "short" sont autorisées.
    catwayType: {
        type: String,
        required: true,
        enum: ["long", "short"]
    },

    // État du catway : obligatoire.
    catwayState: {
        type: String,
        required: true
    }
});

// Création et export du modèle Catway à partir du schéma.
module.exports = mongoose.model("Catway", catwaySchema);