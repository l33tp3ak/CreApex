

'use client';


import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {User} from "@/generated/prisma/client";
import {language as primaryLanguage} from "@/lib/language";
import jwt from "jsonwebtoken";
import {NextResponse} from "next/server";
import {useAuth} from "../AuthContext";


export default function SecondRegistrationForm() {
	const {role, setRole, loggedIn, setLoggedIn} = useAuth();
	
	//const [stackUser, setStackUser] = useUser();
	const [user, setUser] = useState<User[]>([]);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [language, setLanguage] = useState("en"); //Default fallback language
	const [avatar, setAvatar] = useState<File>();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");






	/*
	Whenever we use "fetch()", we are accessing the backend
	Here, we are specifically accessing "/api/notes" to obtain the content of our Notes table on the database
	*/
	/*
const fetchUsers = async () => {
	const response = await fetch("/api/user");
	const data = await response.json();

	setUser(data);
};
*/
	const router = useRouter();


	//Run  the function "fetchUsers()" ONCE on first render
	useEffect(() => {
		//fetchUsers();
		const languageOfUser = primaryLanguage();
		setLanguage(languageOfUser);
	}, []);


	/*
	Function responsable de la soumission de l'information vers la base de donnees
	*/
	const formulaire = async (e: React.FormEvent) => {
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
	};

	return (
		<>
			<div className="center">
				<h1>Register</h1>
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
						<label htmlFor="firstName">First Name: </label>
						<input
							id="firstName"
							type='text'
							placeholder='Enter your First name...'
							onChange={
								(e) => setFirstName(e.target.value)
							}
							className="w-full p-2 border rounded text-black"
							required
						/>

						<label htmlFor="lastName">Last Name: </label>
						<input
							id="lastName"
							type='text'
							placeholder='Enter your Last name...'
							onChange={
								(e) => setFirstName(e.target.value)
							}
							className="w-full p-2 border rounded text-black"
							required
						/>
					</div>


					{/*
					The "type='file'" attribute means that the user can upload a file.
					The "accept='image/*'"   attribute means that only upload images are accepted.
					It is also possible to restrict the type of files accepted to specific extensions.
					*/}
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

					<button
						type='submit'
						className='bg-blue-500 text-white px-4 py-4 rounded hover:bg-blue-600'>
						Sign Up
					</button>
				</form>
			</div>
		</>
	);
}
