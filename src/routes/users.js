const express = require("express");

const router = express.Router();

const usersController = require("../controllers/usersController");

router.get("/", usersController.getAllUsers);

router.post("/login", usersController.login);

router.get("/:email", usersController.getUserByEmail);

router.post("/", usersController.createUser);

router.put("/:email", usersController.updateUser);

router.delete("/:email", usersController.deleteUser);

module.exports = router;