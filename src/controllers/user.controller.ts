
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/TypeScriptDataObjectTemplate.ts to edit this template
 */
 
 import prisma from "@/lib/prisma";
import type {Request, Response} from "express";


export async function findUser(req) {
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



	return userToFind;
}