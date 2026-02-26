
'use client';


//import type {Metadata} from "next";
//import {Geist, Geist_Mono} from "next/font/google";
import '@/app/assets/CSS/style.css';
import {showTopArrow} from "@/lib/navigation";
import React, {useState} from "react";
import {TopArrow} from "./components/TopArrow";
//import {Contacts} from "./components/Contacts";
import {Menu} from "./components/Menu";
import {LeftMenu} from "./components/LeftMenu";
import {Role} from "@/generated/prisma/client";
//import UpWhiteArrowOcreCircle from "@/app/assets/images/UpWhiteArrowOcreCircle.png";
import {AuthProvider, useAuth} from '@/app/components/AuthContext';









/*
 * In order to use the the custom hooks, ustates and and variables that we defined within out React.useContext, we need to extract them.
 * We must also wrap our components within the <ContextProviderNameHere>[...]</ContextProviderNameHere> in order to use the context.
 * Any component not within the parent (grand-parent, great-grandparent, etc) <ContextProviderNameHere>[...]</ContextProviderNameHere>
 * CANNOT access  ¤any¤ of the values and setters pased down by our React.useContext
 * And only the following can use the context, just like any React Hook:
 * React components
 * Client Components (if using Next.js App Router) declared with "use client"
 * 
 * IN ADDITION, the follwing, required to use "React.useContext", MUST be declared with a child component
 * const { user, setUser, theme, setTheme } = useAuth();
*/
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {



	/*
	 * This allows us to do a check whenever there is a scroll event in the window
	 * which we want to do in order to make the navigation arrow that scrolls back to the top of the page.
	 */
	React.useEffect(() => {
		window.addEventListener('scroll', showTopArrow);

		// Cleanup function to remove the event listener
		return () => {
			window.removeEventListener('scroll', showTopArrow);
		};
	}, []);		// Empty dependency array ensures it runs once on mount

	//const arrowRef = React.useRef(null);
	return (
		<AuthProvider>
			<html lang="en">
				<body>
					<div id="Home"></div>
					<Menu>
						<LeftMenu></LeftMenu>
					</Menu>

					<div>
						<main>
							{children}
						</main>
					</div>
					<TopArrow />
					{/*
				Pour plus tard, lorsque notre architecture est en place.
				<Contacts />
				*/}
				</body>
			</html>
		</AuthProvider>
	);
}
