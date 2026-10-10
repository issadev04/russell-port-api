const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  catwayNumber: {
    type: Number,
    required: true
  },
  clientName: {
    type: String,
    required: true
  },
  boatName: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        const startDate = this.startDate;

        if (!startDate) {
          return true;
        }

        return value > startDate;
      },
      message:
        "La date de fin doit être strictement postérieure à la date de début."
    }
  }
});

module.exports = mongoose.model("Reservation", reservationSchema);