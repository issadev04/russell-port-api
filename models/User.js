const mongoose = require("mongoose");

/**
 * Schéma décrivant la structure d'un utilisateur dans la base de données.
 */
const userSchema = new mongoose.Schema({
    // Nom d'utilisateur : obligatoire, unique et d'au moins 2 caractères.
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 2
    },

    // Adresse e-mail : obligatoire et unique.
    email: {
        type: String,
        required: true,
        unique: true
    },

    // Mot de passe : obligatoire et d'au moins 8 caractères.
    password: {
        type: String,
        required: true,
        minlength: 8
    }
});

// Création et export du modèle User à partir du schéma.
module.exports = mongoose.model("User", userSchema);