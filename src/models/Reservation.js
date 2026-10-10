const mongoose = require("mongoose");

/**
 * Schéma Mongoose définissant la structure d'une réservation.
 *
 * Il précise les champs obligatoires et vérifie que la date de fin
 * est strictement postérieure à la date de début.
 */
const reservationSchema = new mongoose.Schema({
    // Numéro du catway concerné par la réservation.
    catwayNumber: {
        type: Number,
        required: true
    },

    // Nom du client qui effectue la réservation.
    clientName: {
        type: String,
        required: true
    },

    // Nom du bateau associé à la réservation.
    boatName: {
        type: String,
        required: true
    },

    // Date de début de la réservation.
    startDate: {
        type: Date,
        required: true
    },

    // Date de fin, obligatoirement postérieure à la date de début.
    endDate: {
        type: Date,
        required: true,
        validate: {
            // Vérifie que la date de fin est postérieure à la date de début.
            validator: function (value) {
                const startDate = this.startDate;

                // Si la date de début n'est pas disponible, cette règle
                // laisse les autres validations traiter le champ manquant.
                if (!startDate) {
                    return true;
                }

                return value > startDate;
            },
            message:
                "La date de fin doit être strictement postérieure à la date de début."
        }
    }
});

// Création et export du modèle utilisé pour gérer les réservations dans MongoDB.
module.exports = mongoose.model("Reservation", reservationSchema);