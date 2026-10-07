const jwt = require("jsonwebtoken");
const usersService = require("../services/usersService");

async function getAllUsers(req, res) {
  try {
    const users = await usersService.getAllUsers();

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur"
    });
  }
}

async function getUserByEmail(req, res) {
  try {
    const user = await usersService.getUserByEmail(
      req.params.email
    );

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable"
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur"
    });
  }
}

async function createUser(req, res) {
  try {
    const user = await usersService.createUser(req.body);

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({
      message: "Données invalides"
    });
  }
}

async function updateUser(req, res) {
  try {
    const user = await usersService.updateUser(
      req.params.email,
      req.body
    );

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable"
      });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({
      message: "Données invalides"
    });
  }
}

async function deleteUser(req, res) {
  try {
    const user = await usersService.deleteUser(
      req.params.email
    );

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable"
      });
    }

    res.json({
      message: "Utilisateur supprimé"
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur"
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await usersService.loginUser(email, password);

    if (!user) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect"
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

  res.cookie("token", token, {
  httpOnly: true,
  sameSite: "strict",
  maxAge: 60 * 60 * 1000
});

res.json({
  message: "Connexion réussie"
});
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur"
    });
  }
}

async function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict"
  });

  res.json({
    message: "Déconnexion réussie"
  });
}

module.exports = {
  getAllUsers,
  getUserByEmail,
  createUser,
  login,
  logout,
  updateUser,
  deleteUser
};