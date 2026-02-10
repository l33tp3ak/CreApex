
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
import {ITILTicketType} from "@/generated/prisma/client";

export async function GET() {
	//Get all the data from the Note table in the database in the JSON format
	const notes = await prisma.workOrder.findMany();
	return NextResponse.json(notes);
}


/*
 * Unsure if the request needs to be autocreated via SQL?
 * If so, then the information will already be entered, this should not be created via the API but rather through the database information
 */
export async function POST(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	//MUST declare the constants representing the properties that will be sent
	const {quantity, modelID, rqNumberID} = body;

	const newNote = await prisma.workOrder.create({
		data: { quantity, modelID, rqNumberID}
	});


	return NextResponse.json(newNote, {status: 201});
}


/*
 * Unsure if the request needs to be autocreated via SQL?
 * If so, then the information will already be entered, this should not be created via the API but rather through the database information
 */
export async function PATCH(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	//MUST declare the constants representing the properties that will be sent
	const {quantity, modelID, rqNumberID} = body;

	const newNote = await prisma.workOrder.create({
		data: { quantity, modelID, rqNumberID}
	});
	
	


	return NextResponse.json(newNote, {status: 201});
}
