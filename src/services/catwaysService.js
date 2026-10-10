const Catway = require("../models/Catway");

async function getAllCatways() {
  return await Catway.find();
}

async function getCatwayByNumber(catwayNumber) {
  return await Catway.findOne({ catwayNumber });
}

async function createCatway(data) {
  const catway = new Catway(data);
  return await catway.save();
}

async function updateCatway(catwayNumber, data) {
  return await Catway.findOneAndUpdate(
    { catwayNumber },
    data,
    { new: true, runValidators: true }
  );
}

async function deleteCatway(catwayNumber) {
  return await Catway.findOneAndDelete({ catwayNumber });
}

module.exports = {
  getAllCatways,
  getCatwayByNumber,
  createCatway,
  updateCatway,
  deleteCatway
};