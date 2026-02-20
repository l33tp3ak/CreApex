
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
	const language = await prisma.language.findMany();
	return NextResponse.json(language);
}

export async function POST(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {language_ID, name, apiName} = body;

	const newLanguage = await prisma.language.create({
		data: {language_ID, name, apiName}
	});


	return NextResponse.json(newLanguage, {status: 201});
}





export async function PATCH(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {language_ID, name, apiName} = body;

	let languageToUpdate;

	try {
		languageToUpdate = await prisma.language.update({
			where: {language_ID },
			data: {name, apiName}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return NextResponse.json({ message: `An error has occured: ${e}` });
	}



	return NextResponse.json(languageToUpdate, {status: 201});
}






export async function DELETE(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {language_ID} = body;


	let languageToDelete;

	try {
		languageToDelete = await prisma.language.delete({
			where: {
				language_ID
			}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return NextResponse.json({ message: `An error has occured: ${e}` });
	}



	return NextResponse.json(languageToDelete, {status: 201});
}