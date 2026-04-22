

'use client';
import '@/app/assets/CSS/admin.css';
import {Address, Invoice, Request} from '@/generated/prisma/browser';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';

export default function ITILInvoicePage() {
	const [invoices, setInvoices] = useState<Invoice | null>(null);
	const [addresses, setAddresses] = useState<Address | null>(null);
	const [requests, setRequests] = useState<Request | null>(null);
	const [shippingAddressExist, setShippingAddressExist] = useState(false);
	const [shippingAddresses, setShippingAddress] = useState<Address[]>([]);
	const [billingAddresses, setBillingAddress] = useState<Address[]>([]);

	const searchParams = useSearchParams();

	const getInvoices = async () => {
		let resInvoice: Invoice | null = null;
		//console.log("searchParams");
		//console.log(searchParams);

		const queryParam = `/api/invoice/findInvoice?` + new URLSearchParams({
			ID_string: String(searchParams.get("ID_string")),
			ID_number: String(searchParams.get("ID_number")),
		});


		let response;

		try {
			const res = await fetch(queryParam);
			response = await res.json();
			//console.log("response");
			//console.log(response);
			const {success} = response;

			if (success) {
				const {invoiceData} = response;
				//console.log("invoiceData");
				//console.log(invoiceData);
				resInvoice = invoiceData;

				const test1 = JSON.stringify(resInvoice);
				const test2 = JSON.stringify(invoices);
				if (resInvoice && (test1 != test2)) {

					setInvoices(resInvoice);
					//This checks if the shipping address exists and if it does, that it isn't the same as the billing address
					if (resInvoice.shippingAddressID && (resInvoice.shippingAddressID != resInvoice.billingAddressID)) {
						setShippingAddressExist(true);
					}
				}

				return resInvoice;
			}
		} catch (e) {
			console.log("An error has occured: " + e);
		}
		return response;
	}





	const getBillingAddresses = async (invoiceAddressID: string | null, requestorID: string | null = null) => {
		let resAddresse: Address[] = [];
		//console.log("searchParams");
		//console.log(searchParams);

		const queryParam = `/api/address/findAddress?` + new URLSearchParams({
			invoiceAdressID: String(invoiceAddressID),
			requestorID: String(requestorID),
		});


		let response;

		try {
			const res = await fetch(queryParam);
			response = await res.json();
			//console.log("response");
			//console.log(response);
			const {success} = response;

			if (success) {
				const {addressData} = response;
				//console.log("invoiceData");
				//console.log(invoiceData);
				resAddresse = addressData;

				const test1 = JSON.stringify(resAddresse);
				const test2 = JSON.stringify(billingAddresses);
				if (resAddresse && test1 != test2) {

					setBillingAddress(resAddresse);
				}
				return resAddresse;
			}
		} catch (e) {
			console.log("An error has occured: " + e);
		}
		return response;
	}


	const getShippingAddresses = async (invoiceAddressID: string | null, requestorID: string | null = null) => {
		let resAddresse: Address[] = [];
		//console.log("searchParams");
		//console.log(searchParams);

		const queryParam = `/api/address/findAddress?` + new URLSearchParams({
			invoiceAdressID: String(invoiceAddressID),
			requestorID: String(requestorID),
		});


		let response;

		try {
			const res = await fetch(queryParam);
			response = await res.json();
			//console.log("response");
			//console.log(response);
			const {success} = response;

			if (success) {
				const {addressData} = response;
				//console.log("invoiceData");
				//console.log(invoiceData);
				resAddresse = addressData;

				const test1 = JSON.stringify(resAddresse);
				const test2 = JSON.stringify(shippingAddresses);
				if (resAddresse && test1 != test2) {

					setShippingAddress(resAddresse);
				}
				return resAddresse;
			}
		} catch (e) {
			console.log("An error has occured: " + e);
		}
		return response;
	}




	const getRequests = async (requestID: number) => {
		let resRequest: Request | null = null;
		//console.log("searchParams");
		//console.log(searchParams);

		//Creating the URL to make a GET request for specific parameters
		const queryParam = `/api/request/findRequest?` + new URLSearchParams({
			ID_string: "REQ",
			ID_number: String(requestID),
		});


		let response;

		try {
			const res = await fetch(queryParam);
			response = await res.json();
			//console.log("response");
			//console.log(response);
			const {success} = response;

			if (success) {
				const {requestData} = response;
				//console.log("requestData");
				//console.log(requestData);
				resRequest = requestData;

				const test1 = JSON.stringify(resRequest);
				const test2 = JSON.stringify(requests);
				if (resRequest && test1 != test2) {

					setRequests(resRequest);
				}
				return resRequest;
			}
		} catch (e) {
			console.log("An error has occured: " + e);
		}
		return response;
	}

	useEffect(() => {
		getInvoices();
	}, []);


	//Trigger if there is a change to invoices
	useEffect(() => {
		if (invoices) {
			getRequests(invoices.purchaseRqNumberID);
		} else {
			getInvoices();
		}
	}, [invoices]);


	//Trigger if there is a change to requests
	useEffect(() => {

		if (requests && invoices && requests.requestorID && shippingAddressExist) {
			getBillingAddresses(invoices.billingAddressID, requests.requestorID);
			getShippingAddresses(invoices.shippingAddressID, requests.requestorID);

		} else if (requests && invoices && requests.requestorID) {
			getBillingAddresses(invoices.billingAddressID, requests.requestorID);
		} else if (requests && invoices && shippingAddressExist) {
			getBillingAddresses(invoices.shippingAddressID);
			getShippingAddresses(invoices.shippingAddressID);
		} else if (requests && invoices) {
			getBillingAddresses(invoices.billingAddressID);
		}
	}, [requests]);

	//Trigger if there is a change to billingAddresses or shippingAddresses
	useEffect(() => {


	}, [billingAddresses, shippingAddresses]);


	//console.log("invoice");
	//console.log(invoices);
	//console.log("requests");
	//console.log(requests);
	//console.log("requests");
	//console.log(requests);


	const formulaire = async (e: React.FormEvent) => {
		/*
		e.preventDefault();
		//To access the backend, we need to do a "fetch(...)" where "..." is the path to our backend folder, here "/api/notes"

		//const response = await fetch(`/api/user/`);
		let response;
		let avatarPath;



		const formData = new FormData;
		formData.append('firstName', firstName);
		formData.append('lastName', lastName);
		formData.append('avatarPath', "");
		formData.append('username', username);
		formData.append('email', email);
		formData.append('password', password);






		if (avatar) {
			formData.append('file', avatar);
			try {
				avatarPath = await fetch("/api/user", {
					method: "POST",
					body: formData
				});
				console.log(avatarPath);
				avatarPath = await avatarPath.json();
				console.log(avatarPath);

				if (avatarPath.success) {
					console.log(avatarPath);
					console.log(avatarPath);
					avatarPath = avatarPath.message;
					
					setLoggedIn(true);
					return router.push('/dashboard');
				}
			} catch (e) {
				console.log("An error has occured: " + e);
				return NextResponse.json({message: `An error has occured: ${e}`});
			}



		}

		const res = await fetch("/api/user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: formData
		});
		response = await res.json();
		//console.log(response);
		const {success} = response;

		if (success) {
			//const {token} = response;
			//console.log(userData);
			//localStorage.setItem('token', token);
			setLoggedIn(true);
			return router.push('/dashboard');
		}





		setFirstName('');
		setLastName('');
		//fetchUsers();
		*/
	};
	
	
	
	const addShippingAddress = () => {
		console.log("test");
		
	}



	if (invoices) {
		return (
			<>
				<div className="center">
					<h1>Invoice {invoices.invoice_ID_string + invoices.invoice_ID_number}</h1>
				</div>
				<div className="center">
					<form onSubmit={formulaire}>
						{/*
					This is a <label> element. 
					The "for=" attribute binds it to another element with a specific "id=" attribute, 
					here the element is the <input> tag with the "id=firstName".
					HOWEVER, because we are in React.JS, we must instead use "htmlFor"
					
					*/}
						<div>
							<label htmlFor="invoice_ID_string">Invoice ID String: </label>
							<input
								id="invoice_ID_string"
								type='text'
								value={invoices.invoice_ID_string}
								className="w-full p-2 border rounded text-black"
								required
								disabled
							/>

							<label htmlFor="invoice_ID_number">Invoice ID Number: </label>
							<input
								id="invoice_ID_number"
								type='text'
								value={invoices.invoice_ID_number}
								className="w-full p-2 border rounded text-black"
								required
								disabled
							/>
						</div>


						<div>
							{requests ? (
								<>
									<label htmlFor="request_ID_string">Request ID String: </label>
									<input
										id="request_ID_string"
										type='text'
										value={requests.request_ID_string}
										className="w-full p-2 border rounded text-black"
										required
										disabled
									/>
									<label htmlFor="request_ID_number">Request ID Number: </label>
									<input
										id="request_ID_number"
										type='text'
										value={requests.request_ID_number}
										className="w-full p-2 border rounded text-black"
										required
										disabled
									/>
								</>
							) : (
								<div>Loading request...</div>
							)}
						</div>


						<div>
							{billingAddresses.length > 0 && (
								<>
									<label htmlFor="billingAddressString">Billing Address: </label>
									<select id="billingAddressString" required>
										{billingAddresses.map((address, index) => (
											<option key={address.address_ID} value={address.address_ID}>{address.streetNumber} {address.streetName}, {address.postalCode}, {address.cityName}</option>
										))}
									</select>
								</>
							)}
						</div>


						<div>
							{shippingAddresses.length > 0 ? (
								<>
									<label htmlFor="shippingAddressString">Shipping Address: </label>
									<select id="shippingAddressString" required>
										{shippingAddresses.map((address, index) => (
											<option key={address.address_ID} value={address.address_ID}>{address.streetNumber} {address.streetName}, {address.postalCode}, {address.cityName}</option>
										))}
									</select>
								</>
							) : (
								<>
									<button onClick={addShippingAddress} type="button">
										Add Shipping Address
									</button>
									
									
								</>
							)}
						</div>


						{/*
					The "type='file'" attribute means that the user can upload a file.
					The "accept='image/*'"   attribute means that only upload images are accepted.
					It is also possible to restrict the type of files accepted to specific extensions.
					*/}

						{/*
						<div>
							<label htmlFor="avatar">Avatar: </label>
							<input
								name="avatar"
								id="avatar"
								type='file'
								accept="image/*"
								onChange={
									(e) => {
										const files = e.target.files;

										if (files && files.length > 0) {
											setAvatar(files[0])
										}
									}
								}
								className="w-full p-2 border rounded text-black"

							/>
						</div>


						<div>
							<label htmlFor="username">Username: </label>
							<input
								id="username"
								type='text'
								placeholder='Enter your Username...'
								onChange={
									(e) => setUsername(e.target.value)
								}
								className="w-full p-2 border rounded text-black"

							/>
						</div>


						<div>
							<label htmlFor="email">Email: </label>
							<input
								id="email"
								type='email'
								placeholder='Enter your Email address...'
								onChange={
									(e) => setEmail(e.target.value)
								}
								className="w-full p-2 border rounded text-black"
								required
							/>

							<label htmlFor="password">Password: </label>
							<input
								id="password"
								type='password'
								placeholder='Enter your Password...'
								onChange={
									(e) => setPassword(e.target.value)
								}
								className="w-full p-2 border rounded text-black"
								required
							/>
						</div>
	*/}
						<button
							type='submit'
							className='bg-blue-500 text-white px-4 py-4 rounded hover:bg-blue-600'>
							Save
						</button>
					</form>
				</div>

			</>
		)

	}


}