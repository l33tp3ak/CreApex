
"use client"

import '@/app/assets/CSS/menu.css';
//import {useLocation} from "react-router-dom";
import Link from "next/link";
import React, {act} from "react";
import {useEffect, useState, } from 'react';
import {useRouter} from "next/navigation";
import {useAuth} from '@/app/components/AuthContext';
import {Role} from '@/generated/prisma/browser';
import ITILMainPage from '@/app/components/admin/ITILMain';

/*
	* This allows us to put children elements inside of our prop, making it more modular and speeding up development time.
	* By writing the children as "children?", we make the children optional.
	* If we write the children as "children", they are mandatory.
*/
type Props = {
	children?: React.ReactNode;
};





//
export default function ITSMPage() {
	const {role, setRole, loggedIn, setLoggedIn} = useAuth();
	const router = useRouter();


	const isUserLoggedIn = async () => {

		try {
			const res = await fetch("/api/auth/login");
			const response = await res.json();
			//console.log(response);
			const {success} = response;
			//loggedIn = success;
			setLoggedIn(success)

			let responseRole;
			if (success) {
				const {userData} = response;
				//role = userData.role;
				responseRole = userData.role;
				setRole(userData.role);
				console.log(userData);
			}
			return {loggedIn: success, role: responseRole};
		} catch (e) {
			console.log("An error has occured: " + e);
			return e;
		}
	}

	useEffect(() => {
		let userRole: Role | null;
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
	}, []);
	//console.log("Unauthorized")
	//console.log(role);

	if (role == Role.ADMIN) {
		return (
			<>
				<ITILMainPage />
			</>
		);
	} else {
		alert("You do not have authorization to view this page");
		return router.push('/dashboard');
	}

}
