
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

//create account
const registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;


    //Fullname
    if (!fullName) {
        return res.status(400).json({ error: true, message: "Fullname is required" })
    }
    //email
    if (!email) {
        return res.status(400).json({ error: true, message: "Email is required" })
    }
    //password
    if (!password) {
        return res.status(400).json({ error: true, message: "Password is required" })
    }

    const isUser = await User.findOne({ email: email });

    if (isUser) {
        return res.json({ error: true, message: "User already exists" })
    }

    const user = new User({ fullName, email, password });
    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration Successful"
    })

}

//Login user
const loginUser = async (req, res) => {

    const { email, password } = req.body;

    //email
    if (!email) {
        return res.status(400).json({ error: true, message: "Email is required" })
    }
    //password
    if (!password) {
        return res.status(400).json({ error: true, message: "Password is required" })
    }

    const UserInfo = await User.findOne({ email: email });

    if (!UserInfo) {
        return res.status(400).json({ error: true, message: "User not found" })
    }

    if (UserInfo.email === email && UserInfo.password === password) {
        const user = { user: UserInfo };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
        return res.json({
            error: false,
            email,
            accessToken,
            message: "Login Successful"
        });
    }
    else {
        return res.status(400).json({
            error: true,
            message: "Invalid Credentials"
        });
    }

}

//get user
const getUser = async (req, res) => {

    const { user } = req.user;
    const isUser = await User.findOne({ _id: user._id });


    if (!isUser) {
        return res.sendStatus(401)
    }

    return res.json({
        error: false,
        user: {
            fullName: isUser.fullName,
            email: isUser.email,
            _id: isUser._id,
        },
        message: ""
    });

}


export { registerUser, loginUser, getUser }