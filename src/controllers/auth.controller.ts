
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/TypeScriptDataObjectTemplate.ts to edit this template
 */

import prisma from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";
import jwt from "jsonwebtoken";

import {findUser} from "@/app/api/user/route";
import bcrypt from "bcryptjs";



interface LoginBody {
	email: string;
	password: string;
}


/*

export const login = async (req: NextRequest,res: NextResponse) => {
	const {email, password} = await req.json();
	
	const isEmailValid = await findUser(email);

	
	if (!isEmailValid) {
		return NextResponse.json({message: "Wrong email or password"}, {status: 401});
	}
	const dbPassword = isEmailValid.json();
	
	
	const isValid = await bcrypt.compare(password, dbPassword.)

	const token = jwt.sign(
		{
			sub: "user_id_123",
			email: email,
			role: "user"
		},
		process.env.JWT_SECRET as string,
		{
			expiresIn: process.env.JWT_EXPIRES_IN,
			issuer: "api.monapp.com"
		}
	);

	res.json({token});
};
*/