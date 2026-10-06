const Reservation = require("../../models/Reservation");

async function getReservationsByCatway(catwayNumber) {
  return await Reservation.find({ catwayNumber });
}

async function getReservationById(catwayNumber, idReservation) {
  return await Reservation.findOne({
    _id: idReservation,
    catwayNumber
  });
}

async function createReservation(data) {
  const reservation = new Reservation(data);
  return await reservation.save();
}

async function updateReservation(catwayNumber, idReservation, data) {
  return await Reservation.findOneAndUpdate(
    {
      _id: idReservation,
      catwayNumber
    },
    data,
    {
      new: true,
      runValidators: true
    }
  );
}

async function deleteReservation(catwayNumber, idReservation) {
  return await Reservation.findOneAndDelete({
    _id: idReservation,
    catwayNumber
  });
}

module.exports = {
  getReservationsByCatway,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation
};