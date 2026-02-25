
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/TypeScriptDataObjectTemplate.ts to edit this template
 */
import prisma from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";
import jwt, {verify} from "jsonwebtoken";

import {findUser} from "@/app/api/user/route";
import bcrypt from "bcryptjs";
import {cookies} from "next/headers";



interface LoginBody {
	email: string;
	password: string;
}




export async function POST(req: NextRequest) {
	const {email, password} = await req.json();

	const res = await findUser(email);
	//console.log("res");
	//console.log(res);
	const response = await res.json();
	//console.log("response");
	//console.log(response);
	const {success} = response;



	if (!success) {
		return NextResponse.json({message: "Email or password is incorrect", success: false}, {status: 401});
	}

	const {userData} = response;


	const isValid = await bcrypt.compare(password, userData.password);
	if (!isValid) {
		return NextResponse.json({message: "Email or password is incorrect", success: false}, {status: 401});
	}

	const token = jwt.sign(
		{
			user_ID: userData.user_ID,
			email: userData.email,
			role: userData.role,
			username: userData.username
		},
		process.env.JWT_SECRET!,
		{expiresIn: '7d'}
	);

	const loginResponse = NextResponse.json(
		{
			message: "User is logged in",
			success: true
		},
		{status: 201});


	loginResponse.cookies.set({
		name: 'token',
		value: token,
		httpOnly: true,       //  prevents JS access from the frontend, preventing XSS attacks
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		path: '/',
		maxAge: 60 * 60 * 24 * 7, // 7 days
	});

	return loginResponse;
};




export async function GET() {
	const cookieSession = await cookies();

	const token = cookieSession.get('token')?.value;
	if (!token) {
		return NextResponse.json({message: "User is not logged in", success: false}, {status: 401});
	}

	try {
		const decoded = await verify(token, process.env.JWT_SECRET!);
		return NextResponse.json({user: decoded, message: "User is logged in", success: true}, {status: 201});
	} catch {
		return NextResponse.json({message: "Invalid token", success: false}, {status: 401});
	}

}