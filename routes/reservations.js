const express = require("express");
const Reservation = require("../models/Reservation");

const router = express.Router();

router.get("/:catwayNumber", async (req, res) => {
  try {
    const reservations = await Reservation.find({
      catwayNumber: req.params.catwayNumber,
    });

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.post("/:catwayNumber", async (req, res) => {
  try {
    const reservation = new Reservation({
  ...req.body,
  catwayNumber: req.params.catwayNumber,
});

    const savedReservation = await reservation.save();

    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(400).json({ message: "Données invalides" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!reservation) {
      return res.status(404).json({ message: "Réservation introuvable" });
    }

    res.json(reservation);
  } catch (error) {
    res.status(400).json({ message: "Données invalides" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: "Réservation introuvable" });
    }

    res.json({ message: "Réservation supprimée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;