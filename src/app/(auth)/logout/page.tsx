

"use client";
import {redirect, useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

export default function logoutPage() {
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');
	
	const router = useRouter();



	const logoutUser = async () => {


		let response;

		try {
			const res = await fetch("/api/auth/logout");
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
	
	
	useEffect(() => {
		logoutUser()
		router.push('/');
		//console.log("response");
		//console.log(response);
	}, [])

	return (
		
			<div>Please wait while you are being logged out...</div>
	);
}