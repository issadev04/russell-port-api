const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

const reservationsController = require("../controllers/reservationsController");

router.get("/:catwayNumber/reservations", authMiddleware, reservationsController.getReservationsByCatway);
router.get("/:catwayNumber/reservations/:idReservation", authMiddleware, reservationsController.getReservationById);
router.post("/:catwayNumber/reservations", authMiddleware, reservationsController.createReservation);
router.put("/:catwayNumber/reservations/:idReservation", authMiddleware, reservationsController.updateReservation);
router.delete("/:catwayNumber/reservations/:idReservation", authMiddleware, reservationsController.deleteReservation);

module.exports = router;