
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import UserModel from "../model/user.js";


const generateToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET  
    );
}  

const UserLogin = async (req , res) => { 

    try {

        const {email , password} = req.body;

        if (!email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }

        const user = await UserModel.findOne({email});
        if (!user) {
            return res.status(400).json({message: "user not found"});
        }
        
        const isMatch = await bcrypt.compare(password , user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid email or password"});
        }
        const token = generateToken(user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }


}





const UserRegister = async (req , res) => {

   try {

    const {firstName , lastName , email , password} = req.body;

    if(!firstName || !lastName || !email || !password) {
        return res.status(400).json({message: "All fields are required"});
    }

    const exit = await UserModel.findOne({email});
    if (exit) {
        return res.status(400).json({message: "user already exist"});
    }

    if (password.length < 6){
        return res.status(400).json({message: "Password must be at least 6 characters long"});
    } 

    if (!validator.isEmail(email)) {
        return res.status(400).json({message: "Invalid email address"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password , salt);
    
    // create user

    const newUser = new UserModel({
        
        firstName,
        lastName,
        email,
        password: hashedpassword
    });   

    const savedUser = await newUser.save();
  
    const token = generateToken(savedUser._id);
    res.status(201).json({
        _id: savedUser._id,
        firstName: savedUser.firstName, 
        lastName: savedUser.lastName,
        email: savedUser.email,
        token
    });

   } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
    
   }

}



// Admin login function

const AdminLogin = async (req , res) => {

    try {

        const {email , password} = req.body;
        if (email === process.env.Admin_Email && password === process.env.Admin_Password) {

            const token = jwt.sign({ email, role: "admin" },process.env.JWT_SECRET);
            // res.json({success: true , token})
            return res.json({
                success: true,
                message: "Admin logged in successfully",
                token
            });
        } else {
            return res.json({
                success: false,
                message: "Invalid admin credentials"
            });
        }
        
    } catch (error) {
        console.log(error);
        res.json({success: false , message: error.message})
        
    }

}


export const getMe = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};




export {UserRegister , UserLogin , AdminLogin };

 