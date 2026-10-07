const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middlewares/authMiddleware");

const usersController = require("./controllers/usersController");

const catwaysRouter = require("./routes/catways");
const reservationsRouter = require("./routes/reservations");
const usersRouter = require("./routes/users");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/login", usersController.login);
app.get("/logout", usersController.logout);
app.get("/", (req, res) => {
    res.json({ message: "API Port de Plaisance Russell" });
});

app.use("/catways", catwaysRouter);
app.use("/catways", reservationsRouter);
app.use("/users", usersRouter);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connecté");

        app.listen(3000, () => {
            console.log("Serveur démarré sur le port 3000");
        });
    })
    .catch((error) => {
        console.error("Erreur de connexion MongoDB :", error);
    });