const mongoose = require("mongoose");

/**
 * Schéma Mongoose définissant la structure d'un utilisateur.
 *
 * Il précise les champs obligatoires, l'unicité du nom d'utilisateur
 * et de l'adresse e-mail, ainsi que la longueur minimale du mot de passe.
 */
const userSchema = new mongoose.Schema({
    // Nom d'utilisateur : obligatoire, unique et composé d'au moins 2 caractères.
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 2
    },

    // Adresse e-mail : obligatoire, unique et vérifiée par une expression régulière.
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },

    // Mot de passe : obligatoire et composé d'au moins 8 caractères.
    password: {
        type: String,
        required: true,
        minlength: 8
    }
});

// Création et export du modèle utilisé pour gérer les utilisateurs dans MongoDB.
module.exports = mongoose.model("User", userSchema);