
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
	const notes = await prisma.materialColour.findMany();
	return NextResponse.json(notes);
}

export async function POST(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {materialID, colourID, quantityAvailable, priceByWeight} = body;

	let newMaterialColour;

	try {
		newMaterialColour = await prisma.materialColour.create({
			data: {materialID, colourID, quantityAvailable, priceByWeight}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return ("An error has occured: " + e);
	}



	return NextResponse.json(newMaterialColour, {status: 201});
}




export async function PATCH(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {materialID, colourID, quantityAvailable, priceByWeight} = body;
	//const materialID_colourID = materialID + colourID;

	let modeleToUpdate;

	try {
		/*
		Search for the compound Primary Key using multiple fields.
		We do so by using the name of the compound Primary Key and giving it the value of the multiple fields it requires.
		*/
		modeleToUpdate = await prisma.materialColour.update({
			where: {materialID_colourID: {materialID, colourID}},
			data: {quantityAvailable, priceByWeight}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return ("An error has occured: " + e);
	}



	return NextResponse.json(modeleToUpdate, {status: 201});
}






export async function DELETE(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {materialID, colourID} = body;
	//const materialID_colourID = materialID + colourID;


	let modeleToDelete;

	try {
		modeleToDelete = await prisma.materialColour.delete({
			where: {
				materialID_colourID: {materialID, colourID}
			}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return ("An error has occured: " + e);
	}



	return NextResponse.json(modeleToDelete, {status: 201});
}