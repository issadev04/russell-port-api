const catwaysService = require("../services/catwaysService");

function handleError(res, error) {
  if (
    error.name === "ValidationError" ||
    error.name === "CastError" ||
    error.code === 11000
  ) {
    return res.status(400).json({ message: "Données invalides" });
  }

  return res.status(500).json({ message: "Erreur serveur" });
}

async function getAllCatways(req, res) {
  try {
    const catways = await catwaysService.getAllCatways();
    res.json(catways);
  } catch (error) {
    return handleError(res, error);
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
    return handleError(res, error);
  }
}

async function createCatway(req, res) {
  try {
    const catway = await catwaysService.createCatway(req.body);
    res.status(201).json(catway);
  } catch (error) {
    return handleError(res, error);
  }
}

async function updateCatway(req, res) {
  try {
    const catway = await catwaysService.updateCatway(
      req.params.catwayNumber,
      req.body
    );

    if (!catway) {
      return res.status(404).json({ message: "Catway introuvable" });
    }

    res.json(catway);
  } catch (error) {
    return handleError(res, error);
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
    return handleError(res, error);
  }
}

module.exports = {
  getAllCatways,
  getCatwayByNumber,
  createCatway,
  updateCatway,
  deleteCatway,
  handleError
};