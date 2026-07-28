const express = require("express");
const router = express.Router();

//POST
//Index
router.get("/", (req, res) => {
    res.send("GET for post");
});

//Show 
router.get("/:id", (req, res) => {
    res.send("GET for post id");
});

//POST 
router.post("/", (req, res) => {
    res.send("POST for post");
});

//DELETE 
router.delete("/:id", (req, res) => {
    res.send("Delete for post");
});

module.exports =   router;
