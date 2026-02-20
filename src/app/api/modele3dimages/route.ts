
/*
 * In the backend files of a Next.JS project, we define the behaviour of the different possible request, GET, POST, etc
 * Backend files are identified by the ".ts" extension while the frontend files are identified with the ".tsx" extension
*/
import prisma from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET() {
	//Get all the data from the Note table in the database
	const country = await prisma.modele3DImages.findMany();
	return NextResponse.json(country);
}

export async function POST(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {path, parentModeleID} = body;

	const newImage = await prisma.modele3DImages.create({
		data: {path, parentModeleID}
	});


	return NextResponse.json(newImage, {status: 201});
}





export async function PATCH(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {modele_3d_images_ID, path, parentModeleID} = body;

	let imageToUpdate;

	try {
		imageToUpdate = await prisma.modele3DImages.update({
			where: {modele_3d_images_ID },
			data: {path, parentModeleID}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return NextResponse.json({ message: `An error has occured: ${e}` });
	}



	return NextResponse.json(imageToUpdate, {status: 201});
}






export async function DELETE(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {modele_3d_images_ID} = body;


	let imageToDelete;

	try {
		imageToDelete = await prisma.modele3DImages.delete({
			where: {
				modele_3d_images_ID
			}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return NextResponse.json({ message: `An error has occured: ${e}` });
	}



	return NextResponse.json(imageToDelete, {status: 201});
}
