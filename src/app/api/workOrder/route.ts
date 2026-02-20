
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
	
	
	let newWO;
	try {
		newWO = await prisma.workOrder.create({
			data: {quantity, modelID, rqNumberID}
		});
	} catch (exception) {
		return NextResponse.json({ message: `An error has occured: ${exception}` });
	}


	return NextResponse.json(newWO, {status: 201});
}


/*
 * Unsure if the request needs to be autocreated via SQL?
 * If so, then the information will already be entered, this should not be created via the API but rather through the database information
 */
export async function PATCH(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	//MUST declare the constants representing the properties that will be sent
	const {quantity, modelID, rqNumberID, status, work_order_ID_number} = body;

	let newWO;

	try {
		newWO = await prisma.workOrder.update({
			where: {work_order_ID_number: work_order_ID_number},
			data: {quantity, modelID, rqNumberID, status}
		});
	} catch (e) {
		return NextResponse.json({ message: `An error has occured: ${e}` });
	}





	return NextResponse.json(newWO, {status: 201});
}






export async function DELETE(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {work_order_ID_number} = body;


	let WOToDelete;

	try {
		WOToDelete = await prisma.workOrder.delete({
			where: {
				work_order_ID_number
			}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return NextResponse.json({ message: `An error has occured: ${e}` });
	}



	return NextResponse.json(WOToDelete, {status: 201});
}
