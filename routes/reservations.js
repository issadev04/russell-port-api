const express = require("express");
const reservationsController = require("../src/controllers/reservationsController");

const router = express.Router({ mergeParams: true });

router.get("/", reservationsController.getReservationsByCatway);

router.get("/:idReservation", reservationsController.getReservationById);

router.post("/", reservationsController.createReservation);

router.put("/:idReservation", reservationsController.updateReservation);

router.delete("/:idReservation", reservationsController.deleteReservation);

module.exports = router;