
"use client";

import {redirect, useRouter} from 'next/navigation';
import {FormEvent, useState} from 'react';
//import {useRouter} from 'next/router';

export default function LoginPage() {
	const [loading, setLoading] = useState(true);
	const [userToFind, setUserToFind] = useState('');
	const [userData, setUserData] = useState('');
	/*
		As this is a Client Component, we must use "useRouter()" in order to do a redirection.
		
		
		
		import {redirect} from 'next/navigation';
		***********************************AND*****************************************************
		redirect('/dashboard');
		
		Are STRICLY reserved for Server Components.
		While the browser (and even Next.js itself) may understand what we are doing, 
		it can (AND WILL) result in unexpected, unreliable and undesired behaviours.
		*/
	const router = useRouter();


	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');




	const loginUser = async (email: String, password: String) => {


		let response;

		try {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					email,
					password
				})
			});
			response = await res.json();
			console.log("response");
			console.log(response);
			const {success} = response;


			/*
						if (success) {
							const {userData} = response;
							//console.log(userData);
							const {token} = response;
							//localStorage.setItem('token', token);
							return userData;
						}
						*/
			return success;
		} catch (e) {
			console.log("An error has occured: " + e);
		}


		return response;
	}


	return (
		<div>
			<div>
				<form name="loginForm" action=".../api/auth/login/" onSubmit={async (e) => {
					//Prevents the page from reloading

					e.preventDefault();
					const loginForm = new FormData(e.target);
					const loginEmail = loginForm.get("loginEmail");
					const loginPassword = loginForm.get("loginPassword");
					if (loginEmail) {
						setUserEmail(loginEmail.toString())
					}
					if (loginPassword) {
						setUserPassword(loginPassword.toString())
					}
					console.log(userEmail);
					console.log(userPassword);
				const loginSuccessful = await loginUser(userEmail, userPassword);
				let loginFieldError = document.getElementById("loginFieldError");

				if (loginSuccessful) {
					//alert(thisUser);

					/*
					if (loginFieldError) {
						loginFieldError.style.display = "none";
					}
					*/
					//THIS is the correct way to do a redirect in a client component:
					router.push('/dashboard');
						/*
							As this uses URLs, we can also exploit the APIs of the application.
							This means that it is possible to send information for a GET request using the following technique:


							const findUser = async (user: String) => {
					alert(user);
				const searchParam = user;
				const queryParam = `/api/user/findUser?` + new URLSearchParams({
					searchParam: String(searchParam)
								});

				let response;

				try {
									const res = await fetch(queryParam);
				response = await res.json();
				console.log(response);
				const {success} = response;

				if (success) {
										const {userData} = response;
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

					} else {
						if (loginFieldError) {
					loginFieldError.style.display = "block";
						}
						//alert("Wrong email or password");
					}
				}}>
				<div>
					<label htmlFor="loginEmail">Email</label>
					<input
						name="loginEmail"
						id="loginEmail"
						type='email'
						placeholder='Email...'
						onChange={
							(e) => setUserEmail(e.target.value)
						}
						className="w-full p-2 border rounded text-black"
						required
					/>
					<label htmlFor="loginPassword">Password</label>
					<input
						name="loginPassword"
						id="loginPassword"
						type='password'
						placeholder='Password...'
						onChange={
							(e) => setUserPassword(e.target.value)
						}
						className="w-full p-2 border rounded text-black"
						required
					/>
					<div id="loginFieldError" style={{display: "none", color: "red"}}>Email or password is incorrect</div>
				</div>
				<button type='submit'>Login</button>
			</form>
		</div>
		</div >
	);
}