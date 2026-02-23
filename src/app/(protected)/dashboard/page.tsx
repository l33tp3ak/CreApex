
'use client';

// src/app/dashboard/page.tsx
import {stackServerApp} from "@/lib/stack";
import prisma from "@/lib/prisma";
import {redirect} from "next/navigation";

export default function DashboardPage() {
	let user;

	if (!user) {
		redirect("/");
		return null;
	}

	/*
	await prisma.user.upsert({
		where: {stackAuthId: user.id},
		update: {
			email: user.primaryEmail || "",
			name: user.displayName || "",
			avatar: user.profileImageUrl || "",
		},
		create: {
			stackAuthId: user.id,
			email: user.primaryEmail || "",
			name: user.displayName || "",
			avatar: user.profileImageUrl || "",
		}
	})
	
	*/
	if (!user) {
		return (
			<>
				
			</>
		);
	}
	return (
		<>
			<h1>Bienvenue sur le tableau de bord</h1>

		</>
	);
}