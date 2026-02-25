
import {FormEvent, useState} from 'react';
//import {useRouter} from 'next/router';

export default function LoginPage() {
	const [loading, setLoading] = useState(true);
	const [userToFind, setUserToFind] = useState('');
	const [userData, setUserData] = useState('');
	//const router = useRouter()
	
	
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');


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
			setUserData(response)
			console.log(userData);
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
			//console.log("response");
			//console.log(response);
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
				<form onSubmit={async (e) => {
					//Prevents the page from reloading
					e.preventDefault();
					const thisUser = await loginUser(userEmail, userPassword);
					let loginFieldError = document.getElementById("loginFieldError");

					if (thisUser) {
						//alert(thisUser);
						if (loginFieldError) {
							loginFieldError.style.display = "none";
						}
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
		</div>
	);
}