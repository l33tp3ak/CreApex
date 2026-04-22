

'use client';
import '@/app/assets/CSS/admin.css';
import {Invoice, Request} from '@/generated/prisma/browser';
import Link from 'next/link';
import {useEffect, useState} from 'react';



export default function ITILMainPage() {
	const [invoices, setInvoices] = useState<Invoice[]>([]);
	const [requests, setRequests] = useState<Request[]>([]);


	const getInvoices = async () => {
		let resInvoice: Invoice[] = [];


		let response;

		try {
			const res = await fetch("/api/invoice");
			response = await res.json();

			if (response) {
				resInvoice = response;

				const test1 = JSON.stringify(resInvoice);
				const test2 = JSON.stringify(invoices);
				if (resInvoice && test1 != test2) {

					setInvoices(resInvoice);
				}
				return resInvoice;
			}
		} catch (e) {
			console.log("An error has occured: " + e);
		}
		return response;
	}



	const getRequests = async () => {
		let resRequest: Request[] = [];


		let response;

		try {
			const res = await fetch("/api/request");
			response = await res.json();

			if (response) {
				resRequest = response;


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


	/*
	const findUser = async (user: string) => {
		alert(user);
		const searchParam = user;
		const queryParam = `/api/user/findUser?` + new URLSearchParams({
			searchParam: String(searchParam)
		});

		let response;

		try {
			const res = await fetch(queryParam);
			response = await res.json();
			console.log("response");
			console.log(response);
			const {success} = response;

			if (success) {
				const {userData} = response;
				console.log("userData");
				console.log(userData);
				return userData;
			}

			return success;
		} catch (e) {
			console.log("An error has occured: " + e);
		}

		return response;
	}
	*/

	useEffect(() => {

		/*
		const getInvoices = () => {
			fetch("/api/invoice")
				.then(
					invoiceRes => invoiceRes.json()
						.then(invoiceResponse => {

							if (invoiceResponse) {
								resInvoice = invoiceResponse;
							}
						})
				).finally(() => {
					//Stringifying the response and the value of the invoices allows us to make a check to see if there is a need to do a setting of the invoice and thus do a re-render.
					//This prevents doing an infinite loop where every re-render triggers another re-render.
					//This means that, if the database is updated while the page is open, there will be a re-render. At least, in theory.
					const test1 = JSON.stringify(resInvoice);
					const test2 = JSON.stringify(invoices);


					if (resInvoice && test1 != test2) {

						setInvoices(resInvoice);
					}
				})
		};
		*/

		getInvoices();

		/*
		const getRequests = () => {
			fetch("/api/request")
				.then(
					requestRes => requestRes.json()
						.then(requestResponse => {

							if (requestResponse) {
								resRequest = requestResponse;
							}
						})
				).finally(() => {
					//Stringifying the response and the value of the invoices allows us to make a check to see if there is a need to do a setting of the invoice and thus do a re-render.
					//This prevents doing an infinite loop where every re-render triggers another re-render.
					//This means that, if the database is updated while the page is open, there will be a re-render. At least, in theory.
					const test1 = JSON.stringify(resRequest);
					const test2 = JSON.stringify(requests);
					console.log("test1");
					console.log(test1);
					console.log("test2");
					console.log(test2);


					if (resRequest && test1 != test2) {

						setRequests(resRequest);
					}
				})
		};
		*/


		getRequests();



		/*
		fetch("/api/auth/login")
			.then(
				res => res.json()
					.then(response => {
						//console.log("response");
						//console.log(response);
						const {success} = response;
						setLoggedIn(success);

						if (success) {

							const {userData} = response;
							userRole = userData.role;
							setRole(userData.role);
						}
					})
			).finally(() => {
				if (userRole) {
					setRole(userRole);

				}

			});
		//console.log("response");
		//console.log(response);
		*/
	}, [invoices, requests]);
	console.log("invoice");
	console.log(invoices);






	// Stack uses React Suspense, which will render this page while user data is being fetched.
	// See: https://nextjs.org/docs/app/api-reference/file-conventions/loading
	return (
		<>
			<h1 className="center">ITSM</h1>
			<div className="ITSM-Main">
				<div className="ITSM-Main-Content">
					<div className="ITSM-Labels center">Invoices</div>
					<div>
						<table>
							<thead>
								<tr>
									<th>Invoice ID</th>
									<th>Creation Date</th>
								</tr>
							</thead>
							{invoices.length > 0 ? (

								<tbody>
									{invoices.map((invoice, index) => (

										<tr key={invoice.invoice_ID_string + invoice.invoice_ID_number}>

											<td>
												<Link href={`/dashboard/ITSM/invoice?` + new URLSearchParams({
													ID_string: String(invoice.invoice_ID_string),
													ID_number: String(invoice.invoice_ID_number)
												})}>
													{invoice.invoice_ID_string + invoice.invoice_ID_number}
												</Link>
											</td>
											<td>
												<Link href={`/dashboard/ITSM/invoice?` + new URLSearchParams({
													ID_string: String(invoice.invoice_ID_string),
													ID_number: String(invoice.invoice_ID_number)
												})}>
													{invoice.createdAt.toString()}
												</Link>
											</td>


										</tr>
									))}
								</tbody>
							) : (
								<tbody>
									<tr>
										<td>Loading invoices...</td>
										<td>Loading invoices...</td>
									</tr>
								</tbody>
							)}
						</table>
					</div>
				</div>

				<div className="ITSM-Main-Content">
					<div className="ITSM-Labels center">Requests</div>
					<div>
						<table>
							<thead>
								<tr>
									<th>Request ID</th>
									<th>Creation Date</th>
								</tr>
							</thead>
							{requests.length > 0 ? (

								<tbody>
									{/*
									For every item within the iterable "requests", we execute the code that follows
									*/}
									{requests.map((request, index) => (
										<tr key={request.request_ID_string + request.request_ID_number}>
											<td>{request.request_ID_string + request.request_ID_number}</td>
											<td>{request.createdAt.toString()}</td>
										</tr>
									))}
								</tbody>
							) : (
								<tbody>
									<tr>
										<td>Loading requests...</td>
										<td>Loading requests...</td>
									</tr>
								</tbody>
							)}
						</table>
					</div>
				</div>

			</div>
		</>
	);
}
