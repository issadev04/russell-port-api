const express = require("express");
const router = express.Router();

const reservationsController = require("../controllers/reservationsController");

router.get("/:catwayNumber/reservations", reservationsController.getReservationsByCatway);
router.get("/:catwayNumber/reservations/:idReservation", reservationsController.getReservationById);
router.post("/:catwayNumber/reservations", reservationsController.createReservation);
router.put("/:catwayNumber/reservations", reservationsController.updateReservation);
router.delete("/:catwayNumber/reservations/:idReservation", reservationsController.deleteReservation);

module.exports = router;