
// src/app/(auth)/login/page.tsx

import {StackProvider, StackTheme} from "@stackframe/stack";
import {stackClientApp} from "@/stack/client";
import {SignIn} from "@stackframe/stack";
import '@/app/assets/CSS/style.css';
import Login from "@/app/components/auth/Login";



export default function LoginPage() {
	return (
		<div className="center">
			<h1>Connexion</h1>
			<div>
				{/*
			 * <StackProvider app={stackClientApp}>
					<StackTheme>
						<div className="center">
							<SignIn />
						</div>
					</StackTheme>
				</StackProvider>
			 */}
			 <Login />
			</div>
		</div>
	);
}