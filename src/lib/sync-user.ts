
import prisma from "./prisma";

import {stackServerApp} from "./stack";

// upsert de prisma ca nous permet de faire update Sinon (insert create)

export async function syncUserWithDatabase() {
	const user = await stackServerApp.getUser(); // useUser : C'est un hook pour React (client side)

	if (!user) {
		return null;
	}
	
	const stackAuthId = user.id;
	const email = user.primaryEmail;
	const name = user.displayName;
	const avatar = user.profileImageUrl;
	
	

	const notreUser = await prisma.user.upsert({
		where: {stackAuthId: user.id},
		update: {
			email: user.primaryEmail || "",
			name: user.displayName || "",
			avatar: user.profileImageUrl || "",
		},
		create: {
			stackAuthId: stackAuthId,
			email: email || "",
			name: user.displayName || "",
			avatar: user.profileImageUrl || "",
		}
	})

	return notreUser;
}