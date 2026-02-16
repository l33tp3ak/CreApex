
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
	const modele3D = await prisma.modele3D.findMany();
	return NextResponse.json(modele3D);
}

export async function POST(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {name, path, netVolume, description,uploaderID} = body;


	let newModele3D;
	try {
		newModele3D = await prisma.modele3D.create({
			data: {name, path, netVolume, description, uploaderID}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return ("An error has occured: " + e);
	}


	return NextResponse.json(newModele3D, {status: 201});
}



export async function PATCH(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {modele_3d_ID, name, path, netVolume, description, uploaderID} = body;

	let modeleToUpdate;

	try {
		modeleToUpdate = await prisma.modele3D.update({
			where: {modele_3d_ID},
			data: {name, path, netVolume, description, uploaderID}
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
	const {modele_3d_ID} = body;


	let modeleToDelete;

	try {
		modeleToDelete = await prisma.modele3D.delete({
			where: {
				modele_3d_ID
			}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return ("An error has occured: " + e);
	}



	return NextResponse.json(modeleToDelete, {status: 201});
}
