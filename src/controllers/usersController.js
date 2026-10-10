const jwt = require("jsonwebtoken");
const usersService = require("../services/usersService");

/**
 * Gère les erreurs rencontrées lors du traitement des utilisateurs.
 *
 * @param {import("express").Response} res - Réponse HTTP.
 * @param {Error} error - Erreur rencontrée.
 * @returns {import("express").Response} Réponse HTTP adaptée à l'erreur.
 */
function handleError(res, error) {
    // Identifie les erreurs liées aux données reçues ou à leur validation.
    if (
        error.name === "ValidationError" ||
        error.name === "CastError" ||
        error.code === 11000 ||
        error.message.includes("Le mot de passe doit contenir au moins 8")
    ) {
        return res.status(400).json({
            message: "Données invalides"
        });
    }

    // Renvoie une erreur générique pour les autres problèmes.
    return res.status(500).json({
        message: "Erreur serveur"
    });
}

/**
 * Récupère la liste de tous les utilisateurs.
 *
 * @param {import("express").Request} req - Requête HTTP.
 * @param {import("express").Response} res - Réponse HTTP.
 * @returns {Promise<import("express").Response>} Liste des utilisateurs ou erreur HTTP.
 */
async function getAllUsers(req, res) {
    try {
        const users = await usersService.getAllUsers();

        return res.json(users);
    } catch (error) {
        return handleError(res, error);
    }
}

/**
 * Recherche un utilisateur à partir de son adresse e-mail.
 *
 * @param {import("express").Request} req - Requête contenant l'adresse e-mail.
 * @param {import("express").Response} res - Réponse HTTP.
 * @returns {Promise<import("express").Response>} Utilisateur trouvé ou erreur HTTP.
 */
async function getUserByEmail(req, res) {
    try {
        const user = await usersService.getUserByEmail(req.params.email);

        // Retourne 404 si aucun utilisateur ne correspond à cette adresse.
        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable"
            });
        }

        return res.json(user);
    } catch (error) {
        return handleError(res, error);
    }
}

/**
 * Crée un nouvel utilisateur.
 *
 * @param {import("express").Request} req - Requête contenant les données utilisateur.
 * @param {import("express").Response} res - Réponse HTTP.
 * @returns {Promise<import("express").Response>} Utilisateur créé ou erreur HTTP.
 */
async function createUser(req, res) {
    try {
        const user = await usersService.createUser(req.body);

        return res.status(201).json(user);
    } catch (error) {
        // Enregistre le détail de l'erreur pour faciliter le diagnostic.
        console.error("Erreur création utilisateur :", error.message);

        return handleError(res, error);
    }
}

/**
 * Modifie les informations d'un utilisateur identifié par son adresse e-mail.
 *
 * @param {import("express").Request} req - Requête contenant l'adresse et les données.
 * @param {import("express").Response} res - Réponse HTTP.
 * @returns {Promise<import("express").Response>} Utilisateur modifié ou erreur HTTP.
 */
async function updateUser(req, res) {
    try {
        const user = await usersService.updateUser(
            req.params.email,
            req.body
        );

        // Retourne 404 si l'utilisateur à modifier n'existe pas.
        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable"
            });
        }

        return res.json(user);
    } catch (error) {
        return handleError(res, error);
    }
}

/**
 * Supprime un utilisateur identifié par son adresse e-mail.
 *
 * @param {import("express").Request} req - Requête contenant l'adresse e-mail.
 * @param {import("express").Response} res - Réponse HTTP.
 * @returns {Promise<import("express").Response>} Confirmation de suppression ou erreur HTTP.
 */
async function deleteUser(req, res) {
    try {
        const user = await usersService.deleteUser(req.params.email);

        // Retourne 404 si l'utilisateur à supprimer n'existe pas.
        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable"
            });
        }

        return res.json({
            message: "Utilisateur supprimé"
        });
    } catch (error) {
        return handleError(res, error);
    }
}

/**
 * Authentifie un utilisateur et crée un jeton JWT.
 *
 * @param {import("express").Request} req - Requête contenant l'e-mail et le mot de passe.
 * @param {import("express").Response} res - Réponse HTTP.
 * @returns {Promise<import("express").Response>} Résultat de la connexion.
 */
async function login(req, res) {
    try {
        // Récupère les identifiants transmis dans le corps de la requête.
        const { email, password } = req.body;

        // Vérifie que les deux champs obligatoires sont renseignés.
        if (!email || !password) {
            return res.status(400).json({
                message: "Email et mot de passe obligatoires"
            });
        }

        // Vérifie les identifiants à l'aide du service utilisateur.
        const user = await usersService.loginUser(email, password);

        // Refuse la connexion si les identifiants sont incorrects.
        if (!user) {
            return res.status(401).json({
                message: "Email ou mot de passe incorrect"
            });
        }

        // Génère un jeton JWT valable une heure.
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        // Stocke le jeton dans un cookie protégé.
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000
        });

        return res.json({
            message: "Connexion réussie"
        });
    } catch (error) {
        // Enregistre le détail de l'erreur pour faciliter le diagnostic.
        console.error("Erreur login :", error.message);

        return res.status(500).json({
            message: "Erreur serveur"
        });
    }
}

/**
 * Déconnecte l'utilisateur en supprimant le cookie JWT.
 *
 * @param {import("express").Request} req - Requête HTTP.
 * @param {import("express").Response} res - Réponse HTTP.
 * @returns {import("express").Response} Confirmation de déconnexion.
 */
async function logout(req, res) {
    // Supprime le cookie en conservant les mêmes options de sécurité.
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    });

    return res.json({
        message: "Déconnexion réussie"
    });
}

// Exporte les fonctions utilisées par les routes d'authentification et d'utilisateurs.
module.exports = {
    getAllUsers,
    getUserByEmail,
    createUser,
    login,
    logout,
    updateUser,
    deleteUser,
    handleError
};