
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

export async function GET() {
	//Get all the data from the Note table in the database
	const colour = await prisma.colour.findMany();
	return NextResponse.json(colour);
}

export async function POST(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {name} = body;

	const newColour = await prisma.colour.create({
		data: {name}
	});


	return NextResponse.json(newColour, {status: 201});
}





export async function PATCH(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {colour_ID, name} = body;

	let colourToUpdate;

	try {
		colourToUpdate = await prisma.colour.update({
			where: {colour_ID },
			data: {name}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return NextResponse.json({ message: `An error has occured: ${e}` });
	}



	return NextResponse.json(colourToUpdate, {status: 201});
}






export async function DELETE(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {colour_ID} = body;


	let colourToDelete;

	try {
		colourToDelete = await prisma.colour.delete({
			where: {
				colour_ID
			}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return NextResponse.json({ message: `An error has occured: ${e}` });
	}



	return NextResponse.json(colourToDelete, {status: 201});
}
