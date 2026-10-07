const express = require("express");
const router = express.Router();

const catwaysController = require("../controllers/catwaysController");

router.get("/", catwaysController.getAllCatways);
router.get("/:catwayNumber", catwaysController.getCatwayByNumber);
router.post("/", catwaysController.createCatway);
router.put("/:catwayNumber", catwaysController.updateCatway);
router.delete("/:catwayNumber", catwaysController.deleteCatway);

module.exports = router;