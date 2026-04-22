



import prisma from "@/lib/prisma";
import type {Request, Response} from "express";
import {NextRequest, NextResponse} from "next/server";
import {Address} from '@/generated/prisma/client';





export async function GET(req: NextRequest) {
	/*
	Because we are using the Next.JS architecture, we are forced to use the "req.nextUrl.searchParams" structure.
	
	In order to extract the value of a specific search paramater, we need to use req.nextUrl.searchParams.get("...")
	where "..." represents the key of the search paramater that we wish to extract.
	*/
	//console.log(req);
	//console.log(req.nextUrl.searchParams);
	const address_ID_string = req.nextUrl.searchParams.get("invoiceAdressID");
	const user_ID_string = req.nextUrl.searchParams.get("requestorID");

	console.log("address_ID_string");
	console.log(address_ID_string);

	//const {searchParam} = req.params;

	//Here we look for the index of an address in our address array
	function findIndexById(addresses, id) {
		for (let i = 0; i < addresses.length; i++) {
			if (addresses[i].address_ID === id) {
				return i;
			}
		}
		return -1;
	}



	let addressToFind: Address | null;
	let userAddressList: Address[] = [];
	let containsAddressToFind = false;
	//Get the data from the Address table in the database for our user
	if (address_ID_string) {


		try {
			addressToFind = await prisma.address.findUnique({
				where: {address_ID: String(address_ID_string)}
			});
			console.log("Single Address to find");
			console.log(addressToFind);

			if (user_ID_string) {
				try {

					/*
					This does a search for all addresses which a user has in their addressBook.
					We do this by doing a search within address, 
					then we do a search a search within the "AddressBook" table for all records 
					with a specific value for the field "usersID".
					
					In order to do a search using a criteria, we must use the "some" parameter
					
					In this case, we are using the information contained in the variable "user_ID_string",
					which is passed through the URL of the request sent by the Frontend.
					
					
					It returns an arraylist of all the 
					*/
					userAddressList = await prisma.address.findMany({
						where: {
							addressBook: {
								some: {
									users: {
										user_ID: user_ID_string
									}
								}
							}
						}
					});
					console.log("userAddressList");
					console.log(userAddressList);

				} catch (e) {
					console.log("An error has occured: " + e);
					return NextResponse.json({message: `An error has occured: ${e}`, success: false}, {status: 401});
				}

			}


			/*
			Check if our address from the invoice already exists in the list of addresses from the user's AddressBook.
			
			If it does, then we find its index and move it to the end of the array.
			If it doesn't exist, we add it to the array.
			*/
			if (addressToFind) {
				containsAddressToFind = userAddressList.some(address => address.address_ID === address_ID_string);
			}

			if (containsAddressToFind && addressToFind) {
				const indexOfAddress = findIndexById(userAddressList, address_ID_string);

				userAddressList.push(userAddressList.splice(indexOfAddress, 1)[0]);
			} else if (addressToFind) {
				userAddressList = userAddressList.concat(addressToFind);
			}
			console.log("userAddressList");
			console.log(userAddressList);

		} catch (e) {
			console.log("An error has occured: " + e);
			return NextResponse.json({message: `An error has occured: ${e}`, success: false}, {status: 401});
		}
	}


	if (!userAddressList) {
		return NextResponse.json({message: `No address found`, success: false}, {status: 404});
	}




	return NextResponse.json({addressData: userAddressList, success: true}, {status: 201});
}