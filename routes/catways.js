const express = require("express");
const catwaysController = require("../src/controllers/catwaysController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, catwaysController.getAllCatways);

router.get("/:catwayNumber", authMiddleware, catwaysController.getCatwayByNumber);

router.post("/", authMiddleware, catwaysController.createCatway);

router.put("/:catwayNumber", authMiddleware, catwaysController.updateCatway);

router.delete("/:catwayNumber", authMiddleware, catwaysController.deleteCatway);

module.exports = router;