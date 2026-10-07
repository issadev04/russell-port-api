const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const usersController = require("../controllers/usersController");

router.get("/", authMiddleware, usersController.getAllUsers);

router.get("/:email", authMiddleware, usersController.getUserByEmail);

router.post("/", usersController.createUser);

router.put("/:email", authMiddleware, usersController.updateUser);

router.delete("/:email", authMiddleware, usersController.deleteUser);

module.exports = router;