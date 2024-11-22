const UserModel = require("../model/User");
const bcrypt = require("bcrypt");

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

module.exports={Signup};