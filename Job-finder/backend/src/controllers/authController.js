import Users from "../models/userModel.js";


export const login = async (req, res, next) => {
    const {email, password} = req.body
    try {
        if(!email || !password)
        {
            next('Please Provide User Credentials')
            return;
        }

        // find user by email
        const user = await Users.findOne({email}).select('+password');

        if(!user) {
            next("Invalid email or password")
            return;
        }

        // compare password
        const isMatch = await user.comparePassword(password);
        if(!isMatch) {
            next('Invalid email or password');
            return;
        }

        user.password = undefined
        const token = await user.createJWT();
        // console.log(token);
        res.status(201).json({
            success: true,
            message: "Login Successfully",
            user,
            token,
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({message: error.message});
    }
} 

export const register = async (req, res, next) => {
    const {firstName, lastName, email, password} = req.body

    // validate
    if(!firstName) {
        next("First Name is required");
    }

    if(!lastName) {
        next("Last Name is required")
    }

    if(!email) {
        next("Email is required")
    }

    if(!password) {
        next("Password is required")
    }

    try {
        const userExist = await Users.findOne({email});
        if(userExist) {
            next('Email Address have already exists');
            return;
        }

        const user = await Users.create({
            firstName,
            lastName,
            email,
            password
        })

        const token = await user.createJWT();
        res.status(201).send({
            success: true,
            message: "Account Created Successfully",
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                accountType: user.accountType
            },
            token: token
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({message: error.message});
    }
} 