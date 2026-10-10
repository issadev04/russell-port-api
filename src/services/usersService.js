const bcrypt = require("bcrypt");
const User = require("../models/User");

/**
 * Récupère tous les utilisateurs sans leurs mots de passe.
 *
 * @returns {Promise<Array>} Liste des utilisateurs.
 */
async function getAllUsers() {
    return await User.find().select("-password");
}

/**
 * Recherche un utilisateur par son adresse e-mail sans retourner son mot de passe.
 *
 * @param {string} email - Adresse e-mail de l'utilisateur.
 * @returns {Promise<Object|null>} Utilisateur trouvé ou null.
 */
async function getUserByEmail(email) {
    return await User.findOne({ email }).select("-password");
}

/**
 * Crée un utilisateur en chiffrant son mot de passe avant l'enregistrement.
 *
 * @param {Object} data - Données du nouvel utilisateur.
 * @returns {Promise<Object>} Utilisateur créé sans son mot de passe.
 * @throws {Error} Si le mot de passe contient moins de 8 caractères.
 */
async function createUser(data) {
    // Vérifie la présence du mot de passe et sa longueur minimale.
    if (!data.password || data.password.length < 8) {
        throw new Error("Le mot de passe doit contenir au moins 8 caractères");
    }

    // Chiffre le mot de passe avec bcrypt avant de le stocker.
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Crée l'utilisateur avec le mot de passe chiffré.
    const user = new User({
        ...data,
        password: hashedPassword
    });

    const savedUser = await user.save();

    // Prépare une réponse sans le mot de passe.
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    return userResponse;
}

/**
 * Modifie les informations d'un utilisateur.
 *
 * Seuls les champs transmis sont modifiés. Si un nouveau mot de passe
 * est fourni, il est chiffré avant l'enregistrement.
 *
 * @param {string} email - Adresse e-mail actuelle de l'utilisateur.
 * @param {Object} data - Données à modifier.
 * @returns {Promise<Object|null>} Utilisateur modifié ou null si absent.
 * @throws {Error} Si le nouveau mot de passe contient moins de 8 caractères.
 */
async function updateUser(email, data) {
    // Prépare uniquement les champs autorisés à être modifiés.
    const updateData = {};

    if (data.username) {
        updateData.username = data.username;
    }

    if (data.email) {
        updateData.email = data.email;
    }

    // Vérifie et chiffre le nouveau mot de passe s'il est fourni.
    if (data.password) {
        if (data.password.length < 8) {
            throw new Error("Le mot de passe doit contenir au moins 8 caractères");
        }

        updateData.password = await bcrypt.hash(data.password, 10);
    }

    // Met à jour l'utilisateur et exclut le mot de passe du résultat.
    return await User.findOneAndUpdate(
        { email },
        updateData,
        {
            new: true,
            runValidators: true
        }
    ).select("-password");
}

/**
 * Supprime un utilisateur à partir de son adresse e-mail.
 *
 * @param {string} email - Adresse e-mail de l'utilisateur.
 * @returns {Promise<Object|null>} Utilisateur supprimé ou null si absent.
 */
async function deleteUser(email) {
    return await User.findOneAndDelete({ email });
}

/**
 * Vérifie les identifiants d'un utilisateur.
 *
 * @param {string} email - Adresse e-mail fournie.
 * @param {string} password - Mot de passe fourni.
 * @returns {Promise<Object|null>} Utilisateur authentifié ou null si échec.
 */
async function loginUser(email, password) {
    // Recherche l'utilisateur à partir de son adresse e-mail.
    const user = await User.findOne({ email });

    // Arrête la vérification si l'utilisateur n'existe pas.
    if (!user) {
        return null;
    }

    // Compare le mot de passe fourni avec son empreinte enregistrée.
    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
        return null;
    }

    return user;
}

// Exporte les fonctions utilisées par le contrôleur des utilisateurs.
module.exports = {
    getAllUsers,
    getUserByEmail,
    createUser,
    loginUser,
    updateUser,
    deleteUser
};