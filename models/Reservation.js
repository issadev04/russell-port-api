const mongoose = require("mongoose");

/**
 * Schéma décrivant la structure d'une réservation dans la base de données.
 */
const reservationSchema = new mongoose.Schema({
    // Numéro du catway associé à la réservation.
    catwayNumber: {
        type: Number,
        required: true
    },

    // Nom du client ayant effectué la réservation.
    clientName: {
        type: String,
        required: true
    },

    // Nom du bateau concerné par la réservation.
    boatName: {
        type: String,
        required: true
    },

    // Date de début de la réservation.
    startDate: {
        type: Date,
        required: true
    },

    // Date de fin de la réservation.
    endDate: {
        type: Date,
        required: true
    }
});

// Création et export du modèle Reservation à partir du schéma.
module.exports = mongoose.model("Reservation", reservationSchema);