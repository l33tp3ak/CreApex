
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
	const invoice = await prisma.invoice.findMany();
	return NextResponse.json(invoice);
}

export async function POST(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {purchaseRqNumberID, billingAddressID, shippingAddressID, totalBeforeTaxes, taxes, totalAfterTaxes, reservationFee, totalAfterFee} = body;

	const newInvoice = await prisma.invoice.create({
		data: {purchaseRqNumberID, billingAddressID, shippingAddressID, totalBeforeTaxes, taxes, totalAfterTaxes, reservationFee, totalAfterFee}
	});


	return NextResponse.json(newInvoice, {status: 201});
}





export async function PATCH(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {invoice_ID_number, purchaseRqNumberID, billingAddressID, shippingAddressID, totalBeforeTaxes, taxes, totalAfterTaxes, reservationFee, totalAfterFee} = body;

	let invoiceToUpdate;

	try {
		invoiceToUpdate = await prisma.invoice.update({
			where: {invoice_ID_number },
			data: {purchaseRqNumberID, billingAddressID, shippingAddressID, totalBeforeTaxes, taxes, totalAfterTaxes, reservationFee, totalAfterFee}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return ("An error has occured: " + e);
	}



	return NextResponse.json(invoiceToUpdate, {status: 201});
}






export async function DELETE(req: NextRequest) {
	//Extract from the body of the request
	const body = await req.json();
	const {invoice_ID_number} = body;


	let invoiceToDelete;

	try {
		invoiceToDelete = await prisma.invoice.delete({
			where: {
				invoice_ID_number
			}
		});
	} catch (e) {
		console.log("An error has occured: " + e);
		return ("An error has occured: " + e);
	}



	return NextResponse.json(invoiceToDelete, {status: 201});
}
