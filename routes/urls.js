const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");
const config = require("config");

const Url = require("../models/urlModel");

router.post("/shorten", async (req, res) => {
  const longUrl = req.body.longUrl;
  const baseUrl = config.get("baseurl");

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).send("Invalid base url");
  }

  // Create url code
  const urlCode = shortid.generate();

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.render("home", {
          urlCode: url.urlCode,
          longUrl: url.longUrl,
          shortUrl: url.shortUrl,
        });
      } else {
        const shortUrl = baseUrl + "/" + urlCode;

        url = new Url({
          urlCode: urlCode,
          longUrl: longUrl,
          shortUrl: shortUrl,
          date: new Date(),
        });

        await url.save();

        res.render("home", {
          urlCode: url.urlCode,
          longUrl: url.longUrl,
          shortUrl: url.shortUrl,
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  } else {
    res.status(401).send("Invalid long url");
  }
});

module.exports = router;
