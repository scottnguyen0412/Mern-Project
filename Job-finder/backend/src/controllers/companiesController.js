import mongoose from "mongoose";
import Companies from '../models/companiesModel.js'

export const registerCompany = async(req, res, next) => {
    const {name, email, password} = req.body
    if(!name) {
        next("Company Name is required");
        return;
    }

    if(!email) {
        next("Email Address is required");
        return;
    }

    if(!password) {
        next("Password is required and must be greater than 6 characters");
        return;
    }

    try {
        const accountExist =  await Companies.findOne({email});
        if(accountExist) {
            next("Email Address have already exists, Please Login");
            return;
        }

        // create new account
        const newAccount = await Companies.create({
            name, email, password
        }) 

        const token = newAccount.createJWT();

        res.status(201).json({
            success: true,
            message: "Company Account Created Successfully",
            user: {
                _id: newAccount._id,
                name: newAccount.name,
                email: newAccount.email,
            },
            token
        })

    } catch (error) {
        console.error(error);
        res.status(404).json({message: error.message})
    }
}

export const loginCompany = async (req, res, next) => {
    const { email, password} = req.body
    try {
        if(!email || !password){
            next("Please Provide User Credentials");
            return;
        }

        const companyAccount = await Companies.findOne({email}).select("+passsword");

        if(!companyAccount){
            next("Invalid email or password");
            return;
        }

        const isMatch = await Companies.comparePassword(password);
        // compare password
        if(!isMatch){
            next("Invalid email or password");
            return;
        }
        // security
        companyAccount.password = undefined
        const token = companyAccount.createJWT();

        res.status(200).json({
            success: true,
            message: "Login Successfully",
            user: companyAccount,
            token
        })
    
    } catch (error) {
        console.error(error);
        res.status(404).json({
            message: error.message
        });
    }
} 

export const updateCompanyProfile = async (req, res, next) => {
    const {name, contact, location, profileUrl, about} = req.body;
    try {
        // validation
        if(!name || !contact || !location || !profileUrl || !about){
            next("Please Provide All Required Fields")
            return;
        }

        const id = req.body.user.userId;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send(`No Company with id: ${id}`)
        }

        const updateCompany = {
            name, contact, location, profileUrl, about, _id: id
        }

        const newCompany = await Companies.findByIdAndUpdate(id, updatedCompany, {
            new: true
        });

        const token = newCompany.createJWT();
        company.password = undefined;
        res.status(200).json({
            success: true,
            message: "Compay Profile Updated Successfully",
            company,
            token
        })
    } catch (error) {
        console.error(error);
        res.status(404).json({
            message: error.message
        });
    }
}

export const getCompany = async (req, res, next) => {
    try {
        const id = req.body.user.userId;
        const company = await Companies.findById({_id: id});
        
        if(!company){
            return res.status(200).send({
                message: "Company Not Found",
                success: false,
            });
        }

        company.password = undefined;
        res.status(200).json({
            success: true,
            data: company 
        })
    } catch (error) {
        console.error(error);
        res.status(404).json({
            message: error.message
        });
    }
}

// get all companies
export const getAllCompany = async (req, res, next) => {
    try {
        const {search, sort, locaiton} = req.body

        // condition for searching
        const queryObject = {};

        if(search) {
            // "i" đại diện cho tùy chọn không phân biệt chữ hoa chữ thường trong tìm kiếm.
            queryObject.name = {$regex: search, $options: "i"};
        }
        
        if(location) {
            queryObject.location = {$regex: location, $options: "i"};
        }

        let queryResult = Companies.find(queryObject).select("-password");

        // Sorting
        // if(sort === "Newest") {
        //     queryResult = queryResult.sort("-createdAt");
        // }
        // if(sort === "Oldest") {
        //     queryResult = queryResult.sort("createdAt");
        // }

        switch (sort) {
            case "Newest":
                queryResult = queryResult.sort("-createdAt");
                break;
            case "Oldest":
                queryResult = queryResult.sort("createdAt");
                break;
            case "A-Z":
                queryResult = queryResult.sort("name");
                break;
            case "Z-A":
                queryResult = queryResult.sort("-name");
                break;
            default:
              // Xử lý khi giá trị sort không khớp với các case trên
              break;
          }

        // Paginations
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 20
        const skip = (page -1) * limit;
        // records count
        const total = await Companies.countDocuments(queryResult);

        const numOfPage = Math.ceil(total/ limit);

        // move next page
        // áp dụng phân trang và giới hạn kết quả truy vấn
        // queryResult = queryResult.skip(skip).limit(limit);

        // show more instead of moving to next page
        queryResult = queryResult.limit(limit * page);

        const companies = await queryResult;
        res.stauts(200).json({
            success: true,
            total,
            data: companies,
            page,
            numOfPage
        })

    } catch (error) {
        console.error(error);
        res.status(404).json({
            message: error.message
        });
    }
}

// Get company job
export const getCompanyJob = async (req, res, next) => {
    const {search, sort} = req.body;
    const id = req.body.user.userId;

    try {
        // condition for searching
        const queryObject = {};
    
        if(search) {
            // "i" đại diện cho tùy chọn không phân biệt chữ hoa chữ thường trong tìm kiếm.
            queryObject.location = {$regex: search, $options: "i"};
        }
        
        let sorting;
        // sorting 
        switch (sort) {
            case "Newest":
                sorting = "-createdAt";
                break;
            case "Oldest":
                sorting = "createdAt";
                break;
            case "A-Z":
                sorting = "name"
                break;
            case "Z-a":
                sorting = "-name"
                break;
            default:
                break;
        }

        let queryResult = await Companies.findById({_id: id}).populate({
            path: "jobPosts",
            options: {sorting}
        })

        const companies = await queryResult;
        res.status(200).json({
            success: true,
            companies
        })
    } catch (error) {
        console.error(error);
        res.status(404).json({
            message: error.message
        })
    }
}