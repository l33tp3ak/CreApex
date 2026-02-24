
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




export const login = async (req: NextRequest) => {
	const {email, password} = await req.json();

	const res = await findUser(email);



	if (!res) {
		return NextResponse.json({message: "Wrong email or password"}, {status: 401});
	}
	const response = await res.json();

	const {userToFind} = response;


	const isValid = await bcrypt.compare(password, userToFind.password);
	if (!isValid) {
		return NextResponse.json({message: "Wrong email or password"}, {status: 401});
	}

	const token = jwt.sign(
		{
			user_ID: userToFind.user_ID,
			email: userToFind.email,
			role: userToFind.role
		},
		process.env.JWT_SECRET as string,
		{expiresIn: "10h"}
	);

	return Response.json({
		token, user: {
			user_ID: userToFind.user_ID,
			email: userToFind.email,
			role: userToFind.role,
			username: userToFind.username
		}
	});
};
