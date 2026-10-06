const express = require("express");
const catwaysController = require("../src/controllers/catwaysController");

const router = express.Router();

router.get("/", catwaysController.getAllCatways);

router.get("/:catwayNumber", catwaysController.getCatwayByNumber);

router.post("/", catwaysController.createCatway);

router.put("/:catwayNumber", catwaysController.updateCatway);

router.delete("/:catwayNumber", catwaysController.deleteCatway);

module.exports = router;