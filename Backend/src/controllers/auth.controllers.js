import express from "express";
import {User} from "../models/users.models.js"
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js"
import jwt from  "jsonwebtoken"


async function generateAccessAndRefreshToken(userId){
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken() ;
        const refreshToken = user.generateRefreshToken() ;

        

        user.refreshToken = refreshToken 
        await user.save({validateBeforeSave : false})

        return {accessToken , refreshToken}
        
    }catch(Error){
        throw new apiError(500 , "Something went wrong while generating token")
    }
}

const UserLogin = asyncHandler(async (req, res) => {
    let { login, password } = req.body;

    login = login?.trim();
    password = password?.trim();

    if (!login || !password) {
        throw new apiError(400, "Both Fields are required");
    }

    const loginLower = login.toLowerCase();
    
    const user = await User.findOne({
             email: loginLower 
    }, { refreshToken: 0 });

    if (!user) {
        console.log("no user");
        throw new apiError(400, "Invalid Login or Password");
    }

    const isPassValid = await user.isPasswordCorrect(password);

    if (!isPassValid) {
        console.log("password invalid");
        throw new apiError(400, "Invalid Login or Password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: '/'
    };

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, {
            message: "User logged in successfully",
            accessToken,
            refreshToken,
            userId: user._id
        }));
});



const UserRegister = asyncHandler(async (req, res) => {
    let { firstName, lastName, email, phoneNumber, password } = req.body;

    firstName = firstName?.trim();
    lastName = lastName?.trim() || "";
    email = email?.trim().toLowerCase();
    password = password?.trim();

    if (!firstName || !email || !password) {
        throw new apiError(400, "All Fields are required");
    }

    const ExistingUser = await User.findOne({
        email,
    });

    if (ExistingUser) {
        throw new apiError(400, "User Already exists");
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        password
    });

    console.log(user)

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    };

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, {
            message: "User registered successfully",
            accessToken,
            refreshToken,
            userId: user._id
        }));
});


const isLoggedIn = asyncHandler(async (req, res) => {
    let AT = req.cookies.accessToken;  
    // let AT ;  

    if (!AT && req.headers.authorization?.startsWith("Bearer ")) {
        AT = req.headers.authorization.split(" ")[1];
    }


    if (!AT) {
        throw new apiError(400, "No token present");
    }

    let decoded;
    try {
        decoded = jwt.verify(AT, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
        console.log("Token verification failed", err);
        throw new apiError(401, "Invalid or expired token");
    }

    res.status(200).json(new ApiResponse(200, decoded, "User is logged in"));
});




const UserLogout = asyncHandler(async (req, res) => {
    const cookieOptions = {
        httpOnly: true,
        secure: true, 
        sameSite: 'None', 
        path: '/' 
    };

    // Clear both accessToken and refreshToken cookies
    res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);

    // Return the response after clearing the cookies
    return res.status(200).json(new ApiResponse(200, "user logged out"));
});

const UserRefreshAccessToken = asyncHandler(async(req,res)=>{
    const oldRefreshToken = req.cookies.refreshToken

    if(!oldRefreshToken){
        throw new apiError(401 , "Unauthorized access , RAT")
    }

    const decoded = jwt.verify(oldRefreshToken , process.env.REFRESH_TOKEN_SECRET)
    
    const user = await User.findById(decoded._id).select("-password")

    if(!user){
        throw new apiError(401 , "Unauthorized access , RAT")
    }
    
    const {accessToken , refreshToken} = await generateAccessAndRefreshToken(user._id)

    // console.log(accessToken) 

        
    const options = {
        httpOnly : true ,
        secure : true
    }

    res.status(200)
        .cookie("accessToken" , accessToken , options )
        .cookie("refreshToken" , refreshToken , options)
        .json(new ApiResponse(200 , {accessToken} , "refreshed token"))

})






export {UserLogin , UserRegister,UserLogout,UserRefreshAccessToken , isLoggedIn}