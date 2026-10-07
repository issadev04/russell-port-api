const express = require("express");
const reservationsController = require("../src/controllers/reservationsController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router({ mergeParams: true });

router.get("/", authMiddleware, reservationsController.getReservationsByCatway);

router.get("/:idReservation", authMiddleware, reservationsController.getReservationById);

router.post("/", authMiddleware, reservationsController.createReservation);

router.put("/:idReservation", authMiddleware, reservationsController.updateReservation);

router.delete("/:idReservation", authMiddleware, reservationsController.deleteReservation);

module.exports = router;
