import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/userModel.js";

export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        // check user exist in DB or not
        const existUser = await User.findOne({email });
        if(!existUser) {
            res.status(404).json({message: 'User does not exist'});
        }
        
        // check password user input với password in db có giống nhau không
        const isPasswordCorrect = await bcrypt.compare(password, existUser.password)
        if(!isPasswordCorrect) {
            res.status(400).json({message: 'Password is not correct'});
        }

        const token = jwt.sign({email: existUser.email, id: existUser._id }, 'test', {expiresIn: '1h'});
        res.status(200).json({result: existUser, token: token});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong'});
    }
}

export const register = async (req, res) => {
    const {email, password, confirmPassword, firstName, lastName} = req.body;
    try {
        // check user exist in DB or not
        const existUser = await User.findOne({email });
        if(existUser) {
            res.status(400).json({message: 'Email already exists'});
        }

        if(password !== confirmPassword) {
            return res.status(400).json({message: "Password don't match"});
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const result = await User.create({email, password: hashPassword, name: `${firstName} ${lastName}`})
        const token = jwt.sign({email: result.email, id: result._id, }, 'test', {expressIn: '1h'});
        res.status(200).json({result: result, token: token});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong'});
    }
}
