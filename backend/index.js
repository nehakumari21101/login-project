require('dotenv').config();
require('./model/db');
const {SignupValidation} = require("./middlewares/AuthValidation");
const { Signup } = require("./controllers/AuthController");

const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req,res)=>{
    res.send("login success");
})
app.post("/signup", SignupValidation, Signup);

app.listen(PORT, ()=>{
    console.log("app is listening...");
})
