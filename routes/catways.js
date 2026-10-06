const express = require("express");
const Catway = require("../models/Catway");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.get("/:catwayNumber", async (req, res) => {
    try {
        const catway = await Catway.findOne({
            catwayNumber: req.params.catwayNumber
        });

        if (!catway) {
            return res.status(404).json({ message: "Catway introuvable" });
        }

        res.json(catway);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

router.post("/", async (req, res) => {
    try {
        const catway = new Catway(req.body);
        const savedCatway = await catway.save();

        res.status(201).json(savedCatway);
    } catch (error) {
        res.status(400).json({ message: "Données invalides" });
    }
});

router.put("/:catwayNumber", async (req, res) => {
    try {
        const catway = await Catway.findOneAndUpdate(
            { catwayNumber: req.params.catwayNumber },
            { catwayState: req.body.catwayState },
            { new: true, runValidators: true }
        );

        if (!catway) {
            return res.status(404).json({ message: "Catway introuvable" });
        }

        res.json(catway);
    } catch (error) {
        res.status(400).json({ message: "Données invalides" });
    }
});

router.delete("/:catwayNumber", async (req, res) => {
  try {
    const catway = await Catway.findOneAndDelete({
      catwayNumber: req.params.catwayNumber,
    });

    if (!catway) {
      return res.status(404).json({ message: "Catway introuvable" });
    }

    res.json({ message: "Catway supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;