
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
	const tasks = await prisma.task.findMany();
	return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {woNumberID, selectedMaterial, selectedColour} = body;
	let newTask;


	try {
		newTask = await prisma.task.create({
			data: {woNumberID, selectedMaterial, selectedColour}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return NextResponse.json({ message: `An error has occured: ${e}` });

	}

	return NextResponse.json(newTask, {status: 201});
}



export async function PATCH(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	//MUST declare the constants representing the properties that will be sent
	const {task_ID_number, selectedMaterial, selectedColour, status} = body;


	let taskToUpdate;

	try {
		taskToUpdate = await prisma.task.update({
			where: {task_ID_number},
			data: {selectedMaterial, selectedColour, status}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return NextResponse.json({ message: `An error has occured: ${e}` });

	}




	return NextResponse.json(taskToUpdate, {status: 201});
}






export async function DELETE(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {task_ID_number} = body;


	let taskToDelete;

	try {
		taskToDelete = await prisma.task.delete({
			where: {
				task_ID_number
			}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return NextResponse.json({ message: `An error has occured: ${e}` });
	}



	return NextResponse.json(taskToDelete, {status: 201});
}