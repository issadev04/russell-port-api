const usersService = require("../services/usersService");
const reservationsService = require("../services/reservationsService");

async function getDashboard(req, res) {
  try {
    const user = await usersService.getUserByEmail(req.user.email);

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable"
      });
    }

    const reservations =
      await reservationsService.getCurrentReservations();

    return res.render("dashboard", {
      user,
      reservations
    });
  } catch (error) {
    console.error("Erreur tableau de bord :", error.message);

    return res.status(500).json({
      message: "Erreur serveur"
    });
  }
}

module.exports = {
  getDashboard
};