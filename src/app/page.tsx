

'use client';
import Image from "next/image";
import {Menu} from "./components/Menu";
import {useEffect, useState} from 'react';
import Login from "./components/auth/Login";
import {AuthProvider, useAuth} from "./components/AuthContext";
import FileUpload from "./components/FileUpload";
//filesystem
//https://nodejs.org/api/fs.html
//import fs from "fs";





export default function Home() {
	const [userToFind, setUserToFind] = useState('');
	const [userData, setUserData] = useState('');


	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');

	const {role, setRole, loggedIn, setLoggedIn} = useAuth();



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




		//useEffect(() => {

		/*
		if (typeof navigator !== 'undefined') {
			// Use navigator.languages for the full list, or navigator.language for the primary
			//const browserLanguages = navigator.languages || [navigator.language];

			//We will only implement the primary language for now
			const browserLanguage = navigator.language;
					//The most preferred language is the first one in the array returned by "navigator.languages						//If we were using it, we would instead use the following:

			//const primaryLanguage = browserLanguages[0] || 'en';
			const primaryLanguage = browserLanguage || 'en';
			setLanguage(primaryLanguage);
		}
		*/

		//}, []);


		return response;
	}





	return (
		<>
			{/*
			This is a multi-line comment
			*/}
			<div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
				<h1 className="center">CreApex</h1>
				<h2 className="center verticalAlignTop" style={{"lineHeight": "1px"}}>Making imagination manifest</h2>
				<p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
					Looking for a starting point or more instructions? Head over to{" "}
					<a
						href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
						className="font-medium text-zinc-950 dark:text-zinc-50"
					>
						Templates
					</a>{" "}
					or the{" "}
					<a
						href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
						className="font-medium text-zinc-950 dark:text-zinc-50"
					>
						Learning
					</a>{" "}
					center.
				</p>
			</div>
			<div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
				<a
					className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
					href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						className="dark:invert"
						src="/vercel.svg"
						alt="Vercel logomark"
						width={16}
						height={16}
					/>
					Deploy Now
				</a>
				<br />
				<a
					className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
					href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Documentation
				</a>
				<br />
				<br />
				<br />
				<br />
				<div>
					<form onSubmit={async (e) => {
						//Prevents the page from reloading
						e.preventDefault();
						const thisUser = await findUser(userToFind);
						let emailFieldError = document.getElementById("emailFieldError");

						if (thisUser) {
							alert(thisUser);
							if (emailFieldError) {
								emailFieldError.style.display = "none";
							}
						} else {
							if (emailFieldError) {
								emailFieldError.style.display = "block";
							}
							alert("Wrong email or password");
						}



					}}>

						<div id="emailField">
							<label htmlFor="userToFind">Email</label>
							<input
								id="userToFind"
								type='email'
								placeholder='Enter the email of the user to Find...'
								onChange={
									(e) => setUserToFind(e.target.value)
								}
								className="w-full p-2 border rounded text-black"
								required
							/>
							<div id="emailFieldError" style={{display: "none", color: "red"}}>Email or password is incorrect</div>
						</div>
						<button type='submit'>Find</button>
					</form>
				</div>
				<br />
				<br />
				<br />
				<br />
				<Login />
				<br />
				<br />
				<br />
				<br />
				<FileUpload />
				<br />
				<br />
				<br />
				<section id="appDevelopment" className="pageSection">
					<h3>App Development</h3>
					<img className="alignment" src="../images/Blason_ville_ca_Quebec_(Quebec).svg" title="Generic" alt="Generic" />
					<p>Here is where I can put in content about the Level 3 and Application Development.</p>
				</section>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<section id="pythonProgramming" className="pageSection">
					<h3>Python Programming</h3>
					<img className="alignment" src="../images/Generic7.jpg" title="Generic" alt="Generic" />
					<p>Here is where I can put in content about the Level 4 and Python Programming.</p>
				</section>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<section id="machineLearning" className="pageSection">
					<h3>Machine Learning</h3>
					<img className="alignment" src="../images/Generic10.jpg" title="Generic" alt="Generic" />
					<p>Here is where I can put in content about the Level 5 and Machine Learning, the dangerous adaptative AIs.</p>
				</section>
			</div>
		</>
	);
}
