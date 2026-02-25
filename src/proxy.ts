

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/TypeScriptDataObjectTemplate.ts to edit this template
 */


import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import jwt from "jsonwebtoken";

export async function proxy(request: NextRequest) {
	const token = request.cookies.get('token')?.value
	//console.log("token");
	//console.log(token);

	if (!token) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	try {
		const decoded = await jwt.verify(token, process.env.JWT_SECRET!);
		//console.log("decoded");
		//console.log(decoded);
		return NextResponse.next()
	} catch {
		return NextResponse.redirect(new URL('/login', request.url))
	}
}

export const config = {
	matcher: ['/dashboard/:path*'],
}