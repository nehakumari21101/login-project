require('dotenv').config();
require('./model/db');
const {SignupValidation, LoginValidation} = require("./middlewares/AuthValidation");
const { Signup, Login } = require("./controllers/AuthController");

const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.post('/login', LoginValidation, Login);
app.post("/signup", SignupValidation, Signup);

app.listen(PORT, ()=>{
    console.log("app is listening...");
})
