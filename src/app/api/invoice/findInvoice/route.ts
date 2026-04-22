



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
	const invoice_ID_string = req.nextUrl.searchParams.get("ID_string");
	const invoice_ID_number = req.nextUrl.searchParams.get("ID_number");

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


	let invoiceToFind;
	//Get the data from the User table in the database for our user
	if (invoice_ID_string && invoice_ID_number) {
		try {
			invoiceToFind = await prisma.invoice.findUnique({
				where: {invoice_ID_number: Number(invoice_ID_number)}
			});
			//console.log("invoiceToFind");
			//console.log(invoiceToFind);

		} catch (e) {
			console.log("An error has occured: " + e);
			return NextResponse.json({message: `An error has occured: ${e}`, success: false}, {status: 401});
		}
	}


	if (!invoiceToFind) {
		return NextResponse.json({message: `Invoice does not exist`, success: false}, {status: 404});
	}

	return NextResponse.json({invoiceData: invoiceToFind, success: true}, {status: 201});
}