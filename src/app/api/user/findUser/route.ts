

import prisma from "@/lib/prisma";
import type {Request, Response} from "express";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
	/*
	Because we are using the Next.JS architecture, we are forced to use the "req.nextUrl.searchParams" structure.
	
	In order to extract the value of a specific search paramater, we need to use req.nextUrl.searchParams.get("...")
	where "..." represents the key of the search paramater that we wish to extract.
	*/
	//console.log(req);
	//console.log(req.nextUrl.searchParams);
	const searchParam = req.nextUrl.searchParams.get("searchParam");

	//console.log(searchParam);

	/*
	const whereName = searchParam ?
		{
			searchParam: {
				contains: searchParam as string,
				mode: 'insensitive' as const
			}
		}
		: {};
	/*
	const body = await req.body.json();
	const {searchParam} = body;
	*/
	//const {searchParam} = req.params;


	let userToFind;
	//Get the data from the User table in the database for our user
	try {
		userToFind = await prisma.user.findUnique({
			where: {user_ID: String(searchParam)}
		});

		if (!userToFind) {
			userToFind = await prisma.user.findUnique({
				where: {stackAuthId: String(searchParam)}
			});
		}

		if (!userToFind) {
			userToFind = await prisma.user.findUnique({
				where: {email: String(searchParam)}
			});
		}
		console.log("userToFind");
		console.log(userToFind);

	} catch (e) {
		console.log("An error has occured: " + e);
		return NextResponse.json({message: `An error has occured: ${e}`, success: false}, {status: 401});
	}
	
	if (!userToFind) {
		return NextResponse.json({message: `User does not exist`, success: false}, {status: 404});
	}

	return NextResponse.json({userData: userToFind, success: true}, {status: 201});
}