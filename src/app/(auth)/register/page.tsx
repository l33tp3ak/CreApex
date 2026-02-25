

/*
register page for Stack Auth.
Redirect non-functional, shelved. 

import {StackProvider, StackTheme} from "@stackframe/stack";
import {stackClientApp} from "@/stack/client";
import {SignUp} from "@stackframe/stack";
import '@/app/assets/CSS/style.css';


export default function RegisterPage() {
	return (

		<div className="center">
			<h1>Register</h1>
			<div>
				<StackProvider app={stackClientApp}>
					<StackTheme>
						<div className="center">
							<SignUp />
						</div>
					</StackTheme>
				</StackProvider>
			</div>
		</div>
	);
}

*/








import {stackServerApp} from "@/lib/stack";
import {redirect} from "next/navigation";
import {User} from "@/generated/prisma/client";
import {language as primaryLanguage} from "@/lib/language";
import SecondRegistrationForm from "@/app/components/auth/SecondRegistrationForm";
import {StackProvider, useUser} from "@stackframe/stack";
import {stackClientApp} from "@/stack/client";



export default async function secondRegistrationForm() {

	return (
		
			<SecondRegistrationForm />
	);
}

