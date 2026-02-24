
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/TypeScriptDataObjectTemplate.ts to edit this template
 */

import prisma from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";
import type {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
	user_ID: string;
	email: string;
	role: string;
	iat?: number;
	exp?: number;
}


export const protect = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization;


	if (!authHeader || !authHeader.startsWith("Bearer")) {
		return res.status(403).json({message: "Unauthorized"});
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET as string
		) as TokenPayload;

		req.user = decoded; // Ajout sur req.user

		next();
	} catch (error) {
		res.status(401).json({error: "Token invalide ou expiré"});
	}
};
