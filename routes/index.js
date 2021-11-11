const express = require("express");
const router = express.Router();
const Model = require("../models/urlModel");

router.get("/:code", async (req, res) => {
  try {
    await Model.findOne({ urlCode: req.params.code }, (err, url) => {
      if (!err) {
        if (url) {
          res.redirect(url.longUrl);
        } else {
          res.status(404).json("No url Found");
        }
      } else {
        console.log(err);
        res.status(500).json("Server Error");
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
