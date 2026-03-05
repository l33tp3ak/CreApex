
"use client";

import {redirect, useRouter} from 'next/navigation';
import {FormEvent, useState} from 'react';
//import {useRouter} from 'next/router';

export default function FileUpload() {
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


	const [userImage, setUserImage] = useState<File | null>(null);
	const [userEmail, setUserEmail] = useState('');

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







	const uploadFile = async (email: string, image: File) => {


		let avatarPath;
		let response;

		try {
			const response = await findUser(email);
			const user_ID = response.user_ID;

			const formData = new FormData();
			formData.append('user_ID', user_ID as string);


			if (image) {
				formData.append('file', image);

				avatarPath = await fetch(`/api/uploadFile/userAvatar/`, {
					method: 'POST',
					body: formData,
				});
				//console.log(avatarPath);

				if (avatarPath) {
					avatarPath = await avatarPath.json();
					console.log("message");
					console.log(avatarPath.message);
					console.log("newFilePath");
					console.log(avatarPath.newFilePath);
					return avatarPath.success;
				}

			}


			/*
						if (success) {
							const {userData} = response;
							//console.log(userData);
							const {token} = response;
							//localStorage.setItem('token', token);
							return userData;
						}
						*/
			
		} catch (e) {
			console.log("An error has occured: " + e);
		}


		return response;
	}


	return (
		<div>
			<div>
				<form name="imageForm" action=".../api/uploadFile/userAvatar/" onSubmit={async (e) => {
					//Prevents the page from reloading

					e.preventDefault();
					const imageForm = new FormData(e.target);
					const newImage = imageForm.get("imageFile");
					const formEmail = imageForm.get("formEmail");
					if (newImage) {
						setUserImage(newImage as File)
						console.log("newImage");
						console.log(newImage);
					}
					if (formEmail) {
						setUserEmail(formEmail.toString())
						console.log("formEmail");
						console.log(formEmail);
					}
					let loginSuccessful;



					if (formEmail && newImage) {
						loginSuccessful = await uploadFile(formEmail.toString(), newImage as File);
					}
					let imageFieldError = document.getElementById("imageFieldError");

					if (loginSuccessful) {


						if (imageFieldError) {
							imageFieldError.style.display = "none";
						}
						//THIS is the correct way to do a redirect in a client component:
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
						if (imageFieldError) {
							imageFieldError.style.display = "block";
						}
						//alert("Wrong email or password");
					}
				}}>
					<div>
						<label htmlFor="formEmail">Email</label>
						<input
							name="formEmail"
							id="formEmail"
							type='email'
							placeholder='Email...'
							onChange={
								(e) => setUserEmail(e.target.value)
							}
							className="w-full p-2 border rounded text-black"
							required
						/>

						<label htmlFor="imageFile">Avatar: </label>
						<input
							name="imageFile"
							id="imageFile"
							type='file'
							accept="image/*"
							onChange={
								(e) => {
									const files = e.target.files;

									if (files && files.length > 0) {
										setUserImage(files[0])
									}
								}
							}
							className="w-full p-2 border rounded text-black"
							required
						/>
						<div id="imageFieldError" style={{display: "none", color: "red"}}>An error has occured</div>
					</div>
					<button type='submit'>Upload</button>
				</form>
			</div>
		</div >
	);
}
