
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
	const provinceState = await prisma.provinceState.findMany();
	return NextResponse.json(provinceState);
}

export async function POST(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {name, countryID} = body;

	let newProvince;

	try {
		newProvince = await prisma.provinceState.create({
			data: {name, countryID}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return NextResponse.json({ message: `An error has occured: ${e}` });
	}



	return NextResponse.json(newProvince, {status: 201});
}



export async function PATCH(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {name, countryID, region_ID} = body;

	let newProvince;

	try {
		newProvince = await prisma.provinceState.update({
			where: {region_ID},
			data: {name, countryID}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return NextResponse.json({ message: `An error has occured: ${e}` });
	}



	return NextResponse.json(newProvince, {status: 201});
}






export async function DELETE(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {region_ID} = body;


	let provinceToDelete;

	try {
		provinceToDelete = await prisma.provinceState.delete({
			where: {
				region_ID: region_ID
			}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return NextResponse.json({ message: `An error has occured: ${e}` });
	}



	return NextResponse.json(provinceToDelete, {status: 201});
}
