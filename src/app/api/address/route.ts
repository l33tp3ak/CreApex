
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
	const address = await prisma.address.findMany();
	return NextResponse.json(address);
}

export async function POST(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {streetNumber, streetName, postalCode, countryID, regionID} = body;

	const newAddress = await prisma.address.create({
		data: {
			streetNumber,
			streetName,
			postalCode,
			countryID,
			regionID
		}
	});


	return NextResponse.json(newAddress, {status: 201});
}





export async function PATCH(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {address_ID, streetNumber, streetName, postalCode, countryID, regionID} = body;

	let addressToUpdate;

	try {
		addressToUpdate = await prisma.address.update({
			where: {address_ID},
			data: {
				streetNumber,
				streetName,
				postalCode,
				countryID,
				regionID
			}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return NextResponse.json({ message: `An error has occured: ${e}` });
	}



	return NextResponse.json(addressToUpdate, {status: 201});
}






export async function DELETE(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {address_ID} = body;


	let addressToDelete;

	try {
		addressToDelete = await prisma.address.delete({
			where: {
				address_ID
			}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return NextResponse.json({ message: `An error has occured: ${e}` });
	}



	return NextResponse.json(addressToDelete, {status: 201});
}
