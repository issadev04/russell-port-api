const bcrypt = require("bcrypt");
const User = require("../models/User");

async function getAllUsers() {
  return await User.find().select("-password");
}

async function getUserByEmail(email) {
  return await User.findOne({ email }).select("-password");
}

async function createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = new User({
    ...data,
    password: hashedPassword
  });

  const savedUser = await user.save();

  const userResponse = savedUser.toObject();
  delete userResponse.password;

  return userResponse;
}

async function updateUser(email, data) {
  const updateData = { ...data };

  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  return await User.findOneAndUpdate(
    { email },
    updateData,
    {
      new: true,
      runValidators: true
    }
  ).select("-password");
}

async function deleteUser(email) {
  return await User.findOneAndDelete({ email });
}

module.exports = {
  getAllUsers,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser
};