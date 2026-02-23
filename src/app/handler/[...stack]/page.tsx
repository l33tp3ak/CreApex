
// src/app/handler/[...stack]/page.tsx
import {StackProvider, StackHandler} from "@stackframe/stack";
import {stackServerApp} from "@/lib/stack";
import {stackClientApp} from "@/stack/client";

export default function Handler(props: any) {
	return (
		<StackProvider app={stackClientApp}>
			<StackHandler app={stackServerApp} {...props} />
		</StackProvider>
	);
}