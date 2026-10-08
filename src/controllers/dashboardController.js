const usersService = require("../services/usersService");

async function getDashboard(req, res) {
  try {
    const user = await usersService.getUserByEmail(req.user.email);

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable"
      });
    }

    res.render("dashboard", { user });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur"
    });
  }
}

module.exports = {
  getDashboard
};