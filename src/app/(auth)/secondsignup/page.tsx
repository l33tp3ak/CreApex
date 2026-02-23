


import {stackServerApp} from "@/lib/stack";
import prisma from "@/lib/prisma";
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
