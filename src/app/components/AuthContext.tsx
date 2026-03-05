
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/TypeScriptDataObjectTemplate.ts to edit this template
 */

import {Role} from "@/generated/prisma/client";
//import {NextRequest} from "next/server";
import React from "react";
//import jwt from "jsonwebtoken";
//import {cookies} from "next/headers";

/*
 * "React.Dispatch<React.SetStateAction<...>>" is the proper way to declare the type of a Setter for a useState().
 * "..." represents the actual type to be used within our variable and what would be inside of useState(...)
 */
type AuthContextType = {
	role: Role | null;
	setRole: React.Dispatch<React.SetStateAction<Role | null>>;

	loggedIn: boolean | null;
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
};

type Props = {
	children?: React.ReactNode;
};



const AuthContext = React.createContext<AuthContextType | null>(null);


export function AuthProvider({children}: Props) {
	const [role, setRole] = React.useState<Role | null>(null);
	const [loggedIn, setLoggedIn] = React.useState<boolean | null>(false);

	/*
	const isUserLoggedIn = async (user: string) => {
	const isUserLoggedIn = async (request: NextRequest) => {
		//alert(user);
		
		const cookieSession = await cookies();
		const cookieSessiontoken = await cookieSession.get('token')?.value;
		const token = await request.cookies.get('token')?.value;


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



	return (
		<AuthContext.Provider
			value={{
				role,
				setRole,
				loggedIn,
				setLoggedIn
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

	// Custom hooks that will return Context
	// This allows to use the context in any children of the Parent component
	// It also forces the context to be used within the appropriate Parent component
	export function useAuth(): AuthContextType {
		const context = React.useContext(AuthContext);

		if (!context) {
			throw new Error("useAuth must be used within a <Parent />");
		}

		return context;
	}