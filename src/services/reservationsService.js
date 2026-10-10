const Reservation = require("../models/Reservation");
const Catway = require("../models/Catway");

async function getReservationsByCatway(catwayNumber) {
  const catway = await Catway.findOne({ catwayNumber });

  if (!catway) {
    throw new Error("Catway introuvable");
  }

  return await Reservation.find({ catwayNumber });
}

async function getReservationById(catwayNumber, idReservation) {
  return await Reservation.findOne({
    _id: idReservation,
    catwayNumber
  });
}

async function createReservation(data) {
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);

  if (
    isNaN(startDate.getTime()) ||
    isNaN(endDate.getTime()) ||
    endDate <= startDate
  ) {
    throw new Error("Dates de réservation invalides");
  }

  const catway = await Catway.findOne({
    catwayNumber: data.catwayNumber
  });

  if (!catway) {
    throw new Error("Catway introuvable");
  }

  const reservation = new Reservation(data);

  return await reservation.save();
}

async function updateReservation(catwayNumber, idReservation, data) {
  const reservation = await Reservation.findOne({
    _id: idReservation,
    catwayNumber
  });

  if (!reservation) {
    return null;
  }

  reservation.clientName = data.clientName ?? reservation.clientName;
  reservation.boatName = data.boatName ?? reservation.boatName;
  reservation.startDate = data.startDate ?? reservation.startDate;
  reservation.endDate = data.endDate ?? reservation.endDate;

  const startDate = new Date(reservation.startDate);
  const endDate = new Date(reservation.endDate);

  if (
    isNaN(startDate.getTime()) ||
    isNaN(endDate.getTime()) ||
    endDate <= startDate
  ) {
    throw new Error("Dates de réservation invalides");
  }

  return await reservation.save();
}

async function deleteReservation(catwayNumber, idReservation) {
  return await Reservation.findOneAndDelete({
    _id: idReservation,
    catwayNumber
  });
}

async function getCurrentReservations() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return await Reservation.find({
    startDate: { $lt: tomorrow },
    endDate: { $gte: today }
  }).sort({ startDate: 1 });
}

module.exports = {
  getReservationsByCatway,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
  getCurrentReservations
};