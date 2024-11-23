const UserModel = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const Signup = async(req,res) => {
    try{
        const {name, email, password, phone} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409).json({message: "user already exit, you can login", success:false});
        }
        const userModel = new UserModel({name, email, password, phone});
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201).json({message: "Signup Successfully", success: true})
    } catch(err){
        res.status(500).json({message: "Internal Server error", success:false});
    }
}

const Login = async(req,res) => {
    try{
        const { email, password } = req.body;
        const user = await UserModel.findOne({email});
        const errorMsg = 'Auth failed email or passwprd is wrong';
        if(!user){
            return res.status(403).json({message:errorMsg, success:false});
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if(!isPassEqual){
            return res.status(403).json({message: errorMsg, success: false});
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expireIn: '24h'}
        )

        res.status(200).json({
            message: "Login Success",
            success: true,
            jwtToken,
            email,
            name: user.name
        })
    } catch(err){
        res.status(500).json({message: "Internal Server error", success:false});
    }
}

module.exports={ Signup, Login };