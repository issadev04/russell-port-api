const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("catways");
});

module.exports = router;