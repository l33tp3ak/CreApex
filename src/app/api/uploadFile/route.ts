

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
	const arrayBuffer = await file.arrayBuffer();
	const buffer = new Uint8Array(arrayBuffer);
	const filePath = path.resolve('.', "public", 'uploads', "avatars",`${file.name}`); // Saves to the `uploads` folder

	fs.writeFileSync(filePath, buffer);
	NextResponse.json({message: `File uploaded successfully: ${file.name}`}, {status: 200});

	return NextResponse.json({message: `./public/uploads/${file.name}`}, {status: 200}); filePath;
}