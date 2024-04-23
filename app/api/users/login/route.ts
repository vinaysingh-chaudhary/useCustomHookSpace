import dbconnect from "@/database/dbconnect";
import { users } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

dbconnect(); 
export const POST = async(request: NextRequest) => {
    const {email, password} = await request.json(); 

    if(!email || !password)
        return NextResponse.json({error: "Provide email and password"}, {status: 401}); 

    try {
        const user = await users.findOne({email: email});
        if(!user)
            return NextResponse.json({error: "User doesn't exists with this email"},{status: 500}); 


        const isPasswordCorrect = bcrypt.compare(password, user?.password); 
        if(!isPasswordCorrect)
            return NextResponse.json({error: "Password is incorrect"}, {status: 500}); 


        const generatedAccessToken = jwt.sign(
            {
                _id: user?._id
            },  
            process.env.ACCESS_TOKEN_SECRET!,
            {
                expiresIn: '28d'
            }
         ); 


        const userWithoutPassword = await users.findById(user._id).select(
            "-password -accessToken"
        ); 

        const response = NextResponse.json(
            {
                success: true, 
                message: "User logged in successfully", 
                user: userWithoutPassword
            },
            {
                status: 200
            }
        ); 

        response.cookies.set("accessToken", generatedAccessToken, {httpOnly: true}); 
        
        return response;
    } catch (error: any) {
        return NextResponse.json({success: false, error: error.message || "Failed to login user"}, {status:500}); 
    }
}; 