
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
import {ITILTicketType, Request} from "@/generated/prisma/client";

export async function GET() {
	//Get all the data from the Note table in the database in the JSON format
	const requests = await prisma.request.findMany();
	return NextResponse.json(requests);
}


export async function findRequestById(id: number) {

	let rq;


	//Get a singular row from the Note table in the database in the JSON format
	try {
		rq = await prisma.request.findUniqueOrThrow({
			where: {
				request_ID_number: id
			}
		});
	} catch (e) {
		console.log("Request not found: " + e);
		return ("Request not found: " + e);
	}

	return NextResponse.json(rq);
}


/*
 * Unsure if the request needs to be autocreated via SQL?
 * If so, then the information will already be entered, this should not be created via the API but rather through the database information
 */
export async function POST(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	//MUST declare the constants representing the properties that will be sent
	const {userMessage, requestorID} = body;

	let newRequest;

	try {
		newRequest = await prisma.request.create({
			data: {userMessage, requestorID}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return ("An error has occured: " + e);

	}



	return NextResponse.json(newRequest, {status: 201});
}


/*
 * Unsure if the request needs to be autocreated via SQL?
 * If so, then the information will already be entered, this should not be created via the API but rather through the database information
 */
export async function PATCH(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	//MUST declare the constants representing the properties that will be sent
	const {userMessage, requestorID, request_ID_number, status} = body;

	let rq;

	try {
		rq = await prisma.request.update({
			where: {request_ID_number},
			data: {userMessage, requestorID, status}
		});

	} catch (e) {
		console.log("An error has occured: " + e);
		return ("An error has occured: " + e);

	}



	return NextResponse.json(rq, {status: 201});
}


/*
For bookkeeping reason, we do not delete requests outright, we cancel them.

Since we don't delete them, we don't need the DELETE of crud
*/
