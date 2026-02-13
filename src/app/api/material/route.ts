
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
	const material = await prisma.material.findMany();
	return NextResponse.json(material);
}

export async function POST(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {name, weightUnit} = body;

	const newMaterial = await prisma.material.create({
		data: {name, weightUnit}
	});


	return NextResponse.json(newMaterial, {status: 201});
}




export async function PATCH(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {material_ID, name, weightUnit} = body;

	let modeleToUpdate;

	try {
		modeleToUpdate = await prisma.material.update({
			where: {material_ID },
			data: {name, weightUnit}
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
	const {material_ID} = body;


	let modeleToDelete;

	try {
		modeleToDelete = await prisma.material.delete({
			where: {
				material_ID
			}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return ("An error has occured: " + e);
	}



	return NextResponse.json(modeleToDelete, {status: 201});
}