
// src/app/handler/[...stack]/page.tsx
import { StackHandler } from "@stackframe/stack";
import { stackServerApp } from "@/lib/stack";

export default function Handler(props: any) {
  return <StackHandler newPage app={stackServerApp} {...props} />;
}