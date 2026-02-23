
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/TypeScriptDataObjectTemplate.ts to edit this template
 */

import prisma from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";
import jwt from "jsonwebtoken";

interface LoginBody {
	email: string;
	password: string;
}

/*
export const login = (
	req: Request<{}, {}, LoginBody>,
	res: Response
): void => {
	const {email, password} = req.body;

	
	if (email !== "test@example.com" || password !== "123456") {
		res.status(401).json({message: "Identifiants invalides"});
		return;
	}

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