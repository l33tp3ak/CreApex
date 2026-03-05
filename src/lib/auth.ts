
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/TypeScriptDataObjectTemplate.ts to edit this template
 */

import {cookies} from 'next/headers'
import jwt from "jsonwebtoken";
import {NextRequest, NextResponse} from 'next/server';
import {redirect} from 'next/navigation';


export async function getCurrentUser(request: NextRequest) {
	const cookieSession = await cookies();
	const cookieSessiontoken = await cookieSession.get('token')?.value;
	const token = await request.cookies.get('token')?.value;
	if (!token) {
		return redirect('/login');
	}

	try {
		const decoded = await jwt.verify(token, process.env.JWT_SECRET!);
		return NextResponse.json({userData: decoded, message: `User is logged in`, success: true}, {status: 201});
	} catch {
		return redirect('/login');
	}
}