const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const connectDb = require("./config/db");
app.use(express.json({ extented: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
connectDb();

app.use("/", require("./routes/index"));
app.use("/api/urls", require("./routes/urls"));

app.get("/", (req, res) => {
  res.render("home", { urlCode: "", longUrl: "", shortUrl: "" });
});

app.listen(5000, () => console.log("Server is Running on 5000"));
