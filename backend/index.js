const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const Model = require("./Models/db.js");

require("dotenv").config();

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/signup")
  .then(() => console.log("connected to MongoDB..."))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

// const use = new Model({
//   name: "Alex",
//   email: "alex@gmail.com",
//   password: "12345",
//   phone: 2345678903,
// });
// use.save().then((res)=>{
//   console.log(res);
// });

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
// app.use("/auth",)

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.status(200).send("This is root path!");
});

app.post("/login", (req, res) => {
  res.send("Login successfull..");
});

app.post("/signup", (req, res) => {
  let { name, email, password, phone } = req.body;
  let use = new Model({
    name: name,
    email: email,
    password: password,
    phone: phone,
  });
  console.log(use);
  use
    .save()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  // res.send("signup success...")
  res.redirect("http://localhost:1234");
});
