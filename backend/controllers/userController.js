import validator from "validator";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// Route for user Login
const loginUser = async (req, res) => {
    try {

        const {email,password} = req.body;

        const user = await userModel.findOne({email});

        if (!user){
           return res.json({success:false, message:"User doesn't exists"}) 
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {

            const token = createToken(user._id)
            res.json({success:true,token})

        }
        else {
            res.json({success:false,message: 'Invalid password'})
        }

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message:error.message });
    }
}

// Route for user register
const registerUser = async (req, res) => {
    try {
        const { name, phone, password } = req.body;

        // Checking if the user already exists
        const exists = await userModel.findOne({ phone });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validating phone number format and strong password
        if (!validator.isMobilePhone(phone, 'bn-BD')) {
            return res.json({ success: false, message: "Please enter a valid Bangladesh phone number" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // hasing user Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name,
            phone,
            password:hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success:true,token})

        // Code to register the user will go here

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message:error.message });
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for empty fields
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }

    // Match admin credentials from environment
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
      return res.status(200).json({ success: true, token, message: "Admin login successful" });
    }

    // Wrong credentials
    return res.status(401).json({ success: false, message: "Invalid credentials" });

  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
