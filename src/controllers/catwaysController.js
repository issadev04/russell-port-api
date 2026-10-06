const catwaysService = require("../services/catwaysService");

async function getAllCatways(req, res) {
  try {
    const catways = await catwaysService.getAllCatways();
    res.json(catways);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
}

async function getCatwayByNumber(req, res) {
  try {
    const catway = await catwaysService.getCatwayByNumber(
      req.params.catwayNumber
    );

    if (!catway) {
      return res.status(404).json({ message: "Catway introuvable" });
    }

    res.json(catway);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
}

async function createCatway(req, res) {
  try {
    const catway = await catwaysService.createCatway(req.body);
    res.status(201).json(catway);
  } catch (error) {
    res.status(400).json({ message: "Données invalides" });
  }
}

async function updateCatway(req, res) {
  try {
    const catway = await catwaysService.updateCatway(
      req.params.catwayNumber,
      req.body.catwayState
    );

    if (!catway) {
      return res.status(404).json({ message: "Catway introuvable" });
    }

    res.json(catway);
  } catch (error) {
    res.status(400).json({ message: "Données invalides" });
  }
}

async function deleteCatway(req, res) {
  try {
    const catway = await catwaysService.deleteCatway(
      req.params.catwayNumber
    );

    if (!catway) {
      return res.status(404).json({ message: "Catway introuvable" });
    }

    res.json({ message: "Catway supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
}

module.exports = {
  getAllCatways,
  getCatwayByNumber,
  createCatway,
  updateCatway,
  deleteCatway
};