require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const catwaysRouter = require("./routes/catways");

const reservationsRouter = require("./routes/reservations");



mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connecté");
  })
  .catch((error) => {
    console.error("Erreur de connexion MongoDB :", error);
  });

const app = express();

app.use(express.json());



const PORT = 3000;

app.get("/", (req, res) => {
  res.send("API Port de plaisance Russell");
});

app.use("/catways", catwaysRouter);

app.use("/catways/:catwayNumber/reservations", reservationsRouter);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
