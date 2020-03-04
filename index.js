const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookiesParser = require("cookie-parser");

const config = require("./config/key");
const { User } = require("./models/user");
// Connect mongodb atlas srv
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true })
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookiesParser());

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, userData) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ status: true });
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5000);
