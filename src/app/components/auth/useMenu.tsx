
"use client";

import {useUser} from "@stackframe/stack";
import Link from "next/link";

export function UserMenu() {
	const user = useUser();

	if (!user) {
		return (
			<>
				<p>Veuillez vous connecter</p>
				<Link href="/handler/sign-in" className="px-4 py-2 bg-green-500 text-white rounded">
					Se connecter
				</Link>
				<Link href="/handler/sign-up" className="px-4 py-2 bg-blue-500 text-white rounded">
					S'inscrire
				</Link>
			</>
		)
	}

	return (
		<div>
			{user.profileImageUrl ? (
				<img src={user.profileImageUrl} alt="avatar" className="w-8 h-8 rounded-full" />
			) : (
				<div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
					{user.displayName?.[0] || user.primaryEmail?.[0] || "U"}
				</div>
			)
			}
		</div>
	)

}
