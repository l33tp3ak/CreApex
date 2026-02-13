
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
	const addressBook = await prisma.addressBook.findMany();
	return NextResponse.json(addressBook);
}

export async function POST(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {addressesID, usersID} = body;

	const newAddressBookEntry = await prisma.addressBook.create({
		data: {addressesID, usersID}
	});


	return NextResponse.json(newAddressBookEntry, {status: 201});
}





export async function PATCH(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {addressesID, usersID} = body;

	let addressBookEntryToUpdate;

	try {
		addressBookEntryToUpdate = await prisma.addressBook.update({
			where: {
				addressesID_usersID: {
					addressesID,
					usersID
				}
			},
			data: {addressesID, usersID}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return ("An error has occured: " + e);
	}



	return NextResponse.json(addressBookEntryToUpdate, {status: 201});
}






export async function DELETE(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {addressesID, usersID} = body;


	let addressBookEntryToDelete;

	try {
		addressBookEntryToDelete = await prisma.addressBook.delete({
			where: {
				addressesID_usersID: {
					addressesID,
					usersID
				}
			}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return ("An error has occured: " + e);
	}



	return NextResponse.json(addressBookEntryToDelete, {status: 201});
}
