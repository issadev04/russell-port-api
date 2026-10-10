const Reservation = require("../models/Reservation");
const Catway = require("../models/Catway");

/**
 * Récupère toutes les réservations associées à un catway.
 *
 * @param {number|string} catwayNumber - Numéro du catway.
 * @returns {Promise<Array>} Liste des réservations du catway.
 * @throws {Error} Si le catway n'existe pas.
 */
async function getReservationsByCatway(catwayNumber) {
    // Vérifie que le catway existe dans la base de données.
    const catway = await Catway.findOne({ catwayNumber });

    if (!catway) {
        throw new Error("Catway introuvable");
    }

    // Récupère les réservations associées au numéro du catway.
    return await Reservation.find({ catwayNumber });
}

/**
 * Recherche une réservation par son identifiant et le numéro du catway.
 *
 * @param {number|string} catwayNumber - Numéro du catway.
 * @param {string} idReservation - Identifiant de la réservation.
 * @returns {Promise<Object|null>} Réservation trouvée ou null.
 */
async function getReservationById(catwayNumber, idReservation) {
    return await Reservation.findOne({
        _id: idReservation,
        catwayNumber
    });
}

/**
 * Crée une réservation après vérification des dates et du catway.
 *
 * @param {Object} data - Données de la réservation.
 * @returns {Promise<Object>} Réservation enregistrée.
 * @throws {Error} Si les dates sont invalides ou si le catway n'existe pas.
 */
async function createReservation(data) {
    // Convertit les dates reçues en objets Date JavaScript.
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    // Vérifie que les dates sont valides et que la fin suit le début.
    if (
        isNaN(startDate.getTime()) ||
        isNaN(endDate.getTime()) ||
        endDate <= startDate
    ) {
        throw new Error("Dates de réservation invalides");
    }

    // Vérifie que le catway associé à la réservation existe.
    const catway = await Catway.findOne({
        catwayNumber: data.catwayNumber
    });

    if (!catway) {
        throw new Error("Catway introuvable");
    }

    // Crée puis enregistre la réservation.
    const reservation = new Reservation(data);

    return await reservation.save();
}

/**
 * Modifie une réservation existante.
 *
 * @param {number|string} catwayNumber - Numéro du catway.
 * @param {string} idReservation - Identifiant de la réservation.
 * @param {Object} data - Nouvelles données de la réservation.
 * @returns {Promise<Object|null>} Réservation modifiée ou null si absente.
 * @throws {Error} Si les dates de réservation sont invalides.
 */
async function updateReservation(catwayNumber, idReservation, data) {
    // Recherche la réservation pour le catway concerné.
    const reservation = await Reservation.findOne({
        _id: idReservation,
        catwayNumber
    });

    // Retourne null si aucune réservation ne correspond à la recherche.
    if (!reservation) {
        return null;
    }

    // Met à jour uniquement les champs fournis.
    reservation.clientName = data.clientName ?? reservation.clientName;
    reservation.boatName = data.boatName ?? reservation.boatName;
    reservation.startDate = data.startDate ?? reservation.startDate;
    reservation.endDate = data.endDate ?? reservation.endDate;

    // Vérifie la cohérence des dates après modification.
    const startDate = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);

    if (
        isNaN(startDate.getTime()) ||
        isNaN(endDate.getTime()) ||
        endDate <= startDate
    ) {
        throw new Error("Dates de réservation invalides");
    }

    // Enregistre les modifications dans la base de données.
    return await reservation.save();
}

/**
 * Supprime une réservation identifiée par son numéro de catway et son identifiant.
 *
 * @param {number|string} catwayNumber - Numéro du catway.
 * @param {string} idReservation - Identifiant de la réservation.
 * @returns {Promise<Object|null>} Réservation supprimée ou null si absente.
 */
async function deleteReservation(catwayNumber, idReservation) {
    return await Reservation.findOneAndDelete({
        _id: idReservation,
        catwayNumber
    });
}

/**
 * Récupère les réservations en cours aujourd'hui.
 *
 * Une réservation est considérée comme en cours si elle a commencé
 * avant demain et se termine aujourd'hui ou à une date ultérieure.
 *
 * @returns {Promise<Array>} Réservations en cours, triées par date de début.
 */
async function getCurrentReservations() {
    // Définit le début de la journée actuelle.
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calcule le début du jour suivant.
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Recherche les réservations qui couvrent la journée actuelle.
    return await Reservation.find({
        startDate: { $lt: tomorrow },
        endDate: { $gte: today }
    }).sort({ startDate: 1 });
}

// Exporte les fonctions utilisées par les contrôleurs et les autres services.
module.exports = {
    getReservationsByCatway,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation,
    getCurrentReservations
};