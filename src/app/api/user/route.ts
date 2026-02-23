
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
import bcrypt from "bcryptjs";

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


	return NextResponse.json({message: `User created sucessfully: ${newUser}`}, {status: 201});
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

export async function findUser(req: NextRequest) {
	//const { id } = req.;
	//Extract from the body of the request
	const body = await req.json();
	const {user_ID, stackAuthId, email} = body;


	let userToFind;
	//Get the data from the User table in the database for our user
	try {

		userToFind = await prisma.user.findUniqueOrThrow({
			where: {user_ID, OR: [{stackAuthId}, {email}]}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return NextResponse.json({error: 'User does not exist'}, {status: 401});
	}



	return NextResponse.json(userToFind);
}
