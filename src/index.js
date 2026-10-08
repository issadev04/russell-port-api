const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const path = require("path");

const notFoundMiddleware = require("./middlewares/notFoundMiddleware");
const morgan = require("morgan");
const usersController = require("./controllers/usersController");

const catwaysRouter = require("./routes/catways");
const reservationsRouter = require("./routes/reservations");
const usersRouter = require("./routes/users");
const dashboardRouter = require("./routes/dashboard");
const catwaysPageRouter = require("./routes/catwaysPage");
const reservationsPageRouter = require("./routes/reservationsPage");
const usersPageRouter = require("./routes/usersPage");
const documentationRouter = require("./routes/documentation");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static("public", { index: false }));
app.get("/", (req, res) => {
    res.render("index");
});
app.use("/dashboard", dashboardRouter);
app.use("/dashboard/catways", catwaysPageRouter);
app.use("/dashboard/reservations", reservationsPageRouter);
app.use("/dashboard/users", usersPageRouter);
app.use("/documentation", documentationRouter);
app.post("/login", usersController.login);
app.get("/logout", usersController.logout);


app.use("/catways", catwaysRouter);
app.use("/catways", reservationsRouter);
app.use("/users", usersRouter);
app.use(notFoundMiddleware);

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