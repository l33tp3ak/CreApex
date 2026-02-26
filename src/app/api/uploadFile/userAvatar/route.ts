

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/TypeScriptDataObjectTemplate.ts to edit this template
 */

import fs from 'fs';
import path from 'path';
import {NextRequest, NextResponse} from "next/server";



export async function POST(req: NextRequest) {
	const formData = await req.formData();

	const file = formData.get("file") as File;
	const user_ID = formData.get("user_ID") as string;
	const arrayBuffer = await file.arrayBuffer();
	const buffer = new Uint8Array(arrayBuffer);
	const oldFilePath = path.resolve('.', "public", 'uploads', "avatars",`${file.name}`); // Concatenates to our desired path
	//Creates the initial file
	fs.writeFileSync(oldFilePath, buffer);
	
	const fileExt = path.extname(oldFilePath);
	const newFileFullName = user_ID + fileExt;
	const newFilePath = path.resolve('.', "public", 'uploads', "avatars",`${newFileFullName}`);
	
	
	// Creates the final name for the user's avatar image
	fs.renameSync(oldFilePath, newFilePath)
	
	
	
	
	
	

	return NextResponse.json({message: `Successfully uploaded file "${file.name}" as ${newFileFullName}`, newFilePath, success: true}, {status: 200});
}



export async function updateUserPFP(req: FormData) {

	const file = req.get("file") as File;
	const user_ID = req.get("user_ID") as string;
	const arrayBuffer = await file.arrayBuffer();
	const buffer = new Uint8Array(arrayBuffer);
	const oldFilePath = path.resolve('.', "public", 'uploads', "avatars",`${file.name}`); // Concatenates to our desired path
	//Creates the initial file
	fs.writeFileSync(oldFilePath, buffer);
	console.log("file.name");
	console.log(file.name);
	
	console.log("oldFilePath");
	console.log(oldFilePath);
	
	const fileExt = path.extname(oldFilePath);
	const newFileFullName = user_ID + fileExt;
	const newFilePath = path.resolve('.', "public", 'uploads', "avatars",`${newFileFullName}`);
	
	
	// Creates the final name for the user's avatar image
	fs.renameSync(oldFilePath, newFilePath)
	
	
	
	
	
	

	return NextResponse.json({message: `Successfully uploaded file "${file.name}" as ${newFileFullName}`, newFilePath, success: true}, {status: 200});
}