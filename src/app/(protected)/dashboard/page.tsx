
'use client';

// src/app/dashboard/page.tsx
import {stackServerApp} from "@/lib/stack";
import {redirect} from "next/navigation";


export default function DashboardPage() {

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
	
	return (
		<>
			<h1 className="center">Welcome to your Dashboard</h1>

		</>
	);
}