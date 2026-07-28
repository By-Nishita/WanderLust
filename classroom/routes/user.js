const express = require("express");
const router = express.Router();
const Listing = require("./models/listing.js");

//Index-users
router.get("/", (req, res) => {
    res.send("GET for users");
});

//Show -users
router.get("/:id", (req, res) => {
    res.send("GET for users id");
});

//POST - users
router.post("/", (req, res) => {
    res.send("POST for users");
});

//DELETE -users
router.delete("/:id", (req, res) => {
    res.send("Delete for users");
});

module.exports = router;