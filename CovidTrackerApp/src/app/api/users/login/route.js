import Connection from '@/database/config';
import User from '@/models/user';
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

Connection();

export const POST = async (NextRequest) => {
    try {
        const body = await NextRequest.json();
        const { username, password } = body;

        if (!username || !password) {
            return new Response("Username and Password is required", { status: 401 });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return new Response("Username does not exist", { status: 400 });
        }

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            user.loginattempts += 1;
            await user.save();

        if (user.loginattempts >= 3) {
            user.isblocked=true;
            await user.save();
            return new Response("Account locked. Too many failed login attempts.", { status: 401 });
        }

        return new Response("Incorrect Password", { status: 400 });
        }
        // Reset login attempts on successful login
        user.loginattempts = 0;
        await user.save();

        const tokenData = {
            username: user.username,
            id: user._id
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRETKEY, { expiresIn: '1d' });

        const response = NextResponse.json({ message: "Login successfull" });
        
        response.cookies.set("token", token, { httpOnly: true });
        return response;
    } catch (error) {
        console.log("Error", error.message);
        return new Response("Something went wrong ", { status: 500 });
    }
}