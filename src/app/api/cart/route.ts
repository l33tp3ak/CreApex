
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
	const cart = await prisma.cart.findMany();
	return NextResponse.json(cart);
}

export async function POST(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {cartOwnerID, orderedModelID, orderedMaterialID, orderedColourID, quantityOrdered} = body;

	const newCartItem = await prisma.cart.create({
		data: {cartOwnerID, orderedModelID, orderedMaterialID, orderedColourID, quantityOrdered}
	});


	return NextResponse.json(newCartItem, {status: 201});
}





export async function PATCH(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {cartOwnerID, orderedModelID, orderedMaterialID, orderedColourID, quantityOrdered} = body;

	let cartItemToUpdate;

	try {
		cartItemToUpdate = await prisma.cart.update({
			where: {
				cartOwnerID_orderedModelID_orderedMaterialID_orderedColourID: {
					cartOwnerID,
					orderedModelID,
					orderedMaterialID,
					orderedColourID
				}
			},
			data: {quantityOrdered}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return NextResponse.json({ message: `An error has occured: ${e}` });
	}



	return NextResponse.json(cartItemToUpdate, {status: 201});
}






export async function DELETE(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {cartOwnerID, orderedModelID, orderedMaterialID, orderedColourID} = body;


	let cartItemToDelete;

	try {
		cartItemToDelete = await prisma.cart.delete({
			where: {
				cartOwnerID_orderedModelID_orderedMaterialID_orderedColourID: {
					cartOwnerID,
					orderedModelID,
					orderedMaterialID,
					orderedColourID
				}
			}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return NextResponse.json({ message: `An error has occured: ${e}` });
	}



	return NextResponse.json(cartItemToDelete, {status: 201});
}
