const reservationsService = require("../services/reservationsService");

async function getReservationsByCatway(req, res) {
  try {
    const reservations =
      await reservationsService.getReservationsByCatway(
        req.params.catwayNumber
      );

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
}

async function getReservationById(req, res) {
  try {
    const reservation =
      await reservationsService.getReservationById(
        req.params.catwayNumber,
        req.params.idReservation
      );

    if (!reservation) {
      return res.status(404).json({
        message: "Réservation introuvable",
      });
    }

    res.json(reservation);
  } catch (error) {
    res.status(400).json({
      message: "Identifiant de réservation invalide",
    });
  }
}

async function createReservation(req, res) {
  try {
    const reservation = await reservationsService.createReservation({
      ...req.body,
      catwayNumber: req.params.catwayNumber,
    });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({
      message: "Données invalides",
    });
  }
}

async function updateReservation(req, res) {
  try {
    const reservation =
      await reservationsService.updateReservation(
        req.params.catwayNumber,
        req.params.idReservation,
        req.body
      );

    if (!reservation) {
      return res.status(404).json({
        message: "Réservation introuvable",
      });
    }

    res.json(reservation);
  } catch (error) {
    res.status(400).json({
      message: "Données invalides",
    });
  }
}

async function deleteReservation(req, res) {
  try {
    const reservation =
      await reservationsService.deleteReservation(
        req.params.catwayNumber,
        req.params.idReservation
      );

    if (!reservation) {
      return res.status(404).json({
        message: "Réservation introuvable",
      });
    }

    res.json({
      message: "Réservation supprimée",
    });
  } catch (error) {
    res.status(400).json({
      message: "Identifiant de réservation invalide",
    });
  }
}

module.exports = {
  getReservationsByCatway,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
};