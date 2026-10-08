const bcrypt = require("bcrypt");
const User = require("../models/User");

async function getAllUsers() {
  return await User.find().select("-password");
}

async function getUserByEmail(email) {
  return await User.findOne({ email }).select("-password");
}

async function createUser(data) {
  if (!data.password || data.password.length < 8) {
    throw new Error("Le mot de passe doit contenir au moins 8 caractères");
  }

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
  const updateData = {};

  if (data.username) {
    updateData.username = data.username;
  }

  if (data.email) {
    updateData.email = data.email;
  }

  if (data.password) {
    if (data.password.length < 8) {
      throw new Error("Le mot de passe doit contenir au moins 8 caractères");
    }

    updateData.password = await bcrypt.hash(data.password, 10);
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

async function loginUser(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    return null;
  }

  const passwordCorrect = await bcrypt.compare(password, user.password);

  if (!passwordCorrect) {
    return null;
  }

  return user;
}

module.exports = {
  getAllUsers,
  getUserByEmail,
  createUser,
  loginUser,
  updateUser,
  deleteUser
};