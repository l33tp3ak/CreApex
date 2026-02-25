
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this licens 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/TypeScriptDataObjectTemplate.ts to edit this templat 
 */


/*
 * In the backend files of a Next.JS project, we define the behaviour of the different possible request, GET, POST, etc
 * Backend files are identified by the ".ts" extension while the frontend files are identified with the ".tsx" extension
*/
import prisma from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";
import {Role} from "@/generated/prisma/client";
import 'dotenv/config';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function GET() {
	//Get all the data from the User table in the database
	const user = await prisma.user.findMany();
	return NextResponse.json(user);
}

export async function POST(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {
		stackAuthId,
		firstName,
		lastName,
		avatar,
		username,
		password,
		email,
		lastLogin,
		languageID,
		defaultAddressID
	} = body;

	/*
	Check if the user has a specified role, just in case, and if it does not, assign the default role
	if (!role) {
		role = Role.USER;
	}
	 */

	const existingUser = await prisma.user.findUnique({
		where: {email}
	});
	if (existingUser) {
		return NextResponse.json({message: "User already exists"}, {status: 400});
	}

	// Encrypting the password before saving it to the database
	const hashedPassword = await bcrypt.hash(password, 10);


	const newUser = await prisma.user.create({
		data: {
			stackAuthId,
			firstName,
			lastName,
			avatar,
			username,
			password: hashedPassword,
			email,
			lastLogin,
			languageID,
			defaultAddressID
		}
	});

	// G n r e r le token
	const token = jwt.sign(
		{
			user_ID: newUser.user_ID,
			email: newUser.email,
			role: newUser.role,
			username: newUser.username
		},
		process.env.JWT_SECRET as string,
		{expiresIn: '7d'}
	);

	const loginResponse = NextResponse.json(
		{
			message: `User created sucessfully: ${newUser.email}, ${newUser.firstName} ${newUser.lastName}`,
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
}





export async function PATCH(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {
		user_ID,
		stackAuthId,
		firstName,
		lastName,
		avatar,
		username,
		email,
		password,
		lastLogin,
		languageID,
		defaultAddressID
	} = body;

	let userToUpdate;

	try {
		userToUpdate = await prisma.user.update({
			where: {user_ID, OR: [{stackAuthId}, {email}]},
			data: {
				stackAuthId,
				firstName,
				lastName,
				avatar,
				username,
				email,
				password,
				lastLogin,
				languageID,
				defaultAddressID
			}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return NextResponse.json({message: `An error has occured: ${e}`});
	}



	return NextResponse.json(userToUpdate, {status: 201});
}






export async function DELETE(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {user_ID, stackAuthId, email} = body;


	let userToDelete;

	try {
		userToDelete = await prisma.user.delete({
			where: {user_ID, OR: [{stackAuthId}, {email}]}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return NextResponse.json({message: `An error has occured: ${e}`});
	}



	return NextResponse.json(userToDelete, {status: 201});
}





// Other functions
//findUser using fields from the database with the @unique property 

export async function findUser(searchParam: string) {


	let userToFind;
	//Get the data from the User table in the database for our user
	try {
		userToFind = await prisma.user.findUnique({
			where: {user_ID: String(searchParam)}
		});

		if (!userToFind) {
			userToFind = await prisma.user.findUnique({
				where: {stackAuthId: String(searchParam)}
			});
		}

		if (!userToFind) {
			userToFind = await prisma.user.findUnique({
				where: {email: String(searchParam)}
			});
		}
		console.log(userToFind);

	} catch (e) {
		console.log("An error has occured: " + e);
		return NextResponse.json({message: `An error has occured: ${e}`, success: false}, {status: 400});
	}

	if (!userToFind) {
		return NextResponse.json({message: `User does not exist`, success: false}, {status: 404});
	}

	return NextResponse.json({userData: userToFind, success: true}, {status: 201});
}