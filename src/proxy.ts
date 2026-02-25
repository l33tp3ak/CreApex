

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/TypeScriptDataObjectTemplate.ts to edit this template
 */


import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import jwt from "jsonwebtoken";
import {cookies} from "next/headers";

export async function proxy(request: NextRequest) {
	const cookieSession = await cookies();
	const cookieSessiontoken = await cookieSession.get('token')?.value;
	const token = await request.cookies.get('token')?.value;
	//console.log("token");
	//console.log(token);

	if (!token && !cookieSessiontoken) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	try {
		const tokenDecoded = await jwt.verify(token as string, process.env.JWT_SECRET as string);
		const cookieSessiontokenDecoded = await jwt.verify(token as string, process.env.JWT_SECRET as string);
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