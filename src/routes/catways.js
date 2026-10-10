const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

const catwaysController = require("../controllers/catwaysController");

router.get("/", authMiddleware, catwaysController.getAllCatways);
router.get("/:catwayNumber", authMiddleware, catwaysController.getCatwayByNumber);
router.post("/", authMiddleware, catwaysController.createCatway);
router.put("/:catwayNumber", authMiddleware, catwaysController.updateCatway);
router.delete("/:catwayNumber", authMiddleware, catwaysController.deleteCatway);

module.exports = router;