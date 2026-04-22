



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
	const request_ID_string = req.nextUrl.searchParams.get("ID_string");
	const request_ID_number = req.nextUrl.searchParams.get("ID_number");

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


	let requestToFind;
	//Get the data from the User table in the database for our user
	if (request_ID_string && request_ID_number) {
		try {
			requestToFind = await prisma.request.findUnique({
				where: {request_ID_number: Number(request_ID_number)}
			});
			//console.log("requestToFind");
			//console.log(requestToFind);

		} catch (e) {
			console.log("An error has occured: " + e);
			return NextResponse.json({message: `An error has occured: ${e}`, success: false}, {status: 401});
		}
	}


	if (!requestToFind) {
		return NextResponse.json({message: `Request does not exist`, success: false}, {status: 404});
	}

	return NextResponse.json({requestData: requestToFind, success: true}, {status: 201});
}