
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
	const notes = await prisma.note.findMany();
	return NextResponse.json(notes);
}

export async function POST(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {title, content} = body;

	const newNote = await prisma.note.create({
		data: {title, content}
	});


	return NextResponse.json(newNote, {status: 201});
}
