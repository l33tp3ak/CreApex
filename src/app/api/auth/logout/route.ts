
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/TypeScriptDataObjectTemplate.ts to edit this template
 */
import {NextRequest, NextResponse} from "next/server";
import jwt, {verify} from "jsonwebtoken";

import bcrypt from "bcryptjs";
import {cookies} from "next/headers";



export async function GET() {
	const cookieSession = await cookies();

	const token = cookieSession.get('token')?.value;
	if (!token) {
		return NextResponse.json({message: "User is not logged in", success: true}, {status: 200});
	}

	try {
		const decoded = await verify(token, process.env.JWT_SECRET!);
		cookieSession.delete('token');
		const logoutResponse = NextResponse.json({
			message: "User is logged out",
			success: true
		},
			{status: 200})

		logoutResponse.cookies.set({
			name: 'token',
			value: '',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			path: '/',
			expires: new Date(0), // Expire immediately
		});
		cookieSession.delete('token');
		
		

		return logoutResponse;
	} catch {
		return NextResponse.json({message: "Invalid token", success: true}, {status: 200});
	}

}