const reservationsService = require("../services/reservationsService");

async function getReservationsByCatway(req, res) {
  try {
    const reservations =
      await reservationsService.getReservationsByCatway(
        req.params.catwayNumber
      );

    return res.json(reservations);
  } catch (error) {
    if (error.message === "Catway introuvable") {
      return res.status(404).json({
        message: "Catway introuvable"
      });
    }

    console.error("Erreur getReservationsByCatway :", error);

    return res.status(500).json({
      message: "Erreur serveur"
    });
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
        message: "Réservation introuvable"
      });
    }

    return res.json(reservation);
  } catch (error) {
    return res.status(400).json({
      message: "Identifiant de réservation invalide"
    });
  }
}

async function createReservation(req, res) {
  try {
    const reservation = await reservationsService.createReservation({
      ...req.body,
      catwayNumber: req.params.catwayNumber
    });

    return res.status(201).json(reservation);
  } catch (error) {
    console.error("Erreur createReservation :", error);

    if (error.message === "Catway introuvable") {
      return res.status(404).json({
        message: "Catway introuvable"
      });
    }

    return res.status(400).json({
      message: "Données invalides"
    });
  }
}

async function updateReservation(req, res) {
  try {
    const reservation = await reservationsService.updateReservation(
      req.params.catwayNumber,
      req.params.idReservation,
      req.body
    );

    if (!reservation) {
      return res.status(404).json({
        message: "Réservation introuvable"
      });
    }

    return res.json(reservation);
  } catch (error) {
    console.error("Erreur updateReservation :", error);

    return res.status(400).json({
      message: "Données invalides"
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
        message: "Réservation introuvable"
      });
    }

    return res.json({
      message: "Réservation supprimée"
    });
  } catch (error) {
    return res.status(400).json({
      message: "Identifiant de réservation invalide"
    });
  }
}

module.exports = {
  getReservationsByCatway,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation
};