
'use client';
import Image from "next/image";
import {Menu} from "./components/Menu";

export default function Home() {
	return (
		<>
			
			{/*
				
				
				*/}
			<div>
				<main>
					<div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
						<h1 className="center">CreApex</h1>
						<h2 className="center verticalAlignTop" style={{"lineHeight": "1px"}}>Making imagination manifest</h2>
						<p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
							Looking for a starting point or more instructions? Head over to{" "}
							<a
								href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
								className="font-medium text-zinc-950 dark:text-zinc-50"
							>
								Templates
							</a>{" "}
							or the{" "}
							<a
								href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
								className="font-medium text-zinc-950 dark:text-zinc-50"
							>
								Learning
							</a>{" "}
							center.
						</p>
					</div>
					<div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
						<a
							className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
							href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Image
								className="dark:invert"
								src="/vercel.svg"
								alt="Vercel logomark"
								width={16}
								height={16}
							/>
							Deploy Now
						</a>
						<a
							className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
							href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
							target="_blank"
							rel="noopener noreferrer"
						>
							Documentation
						</a>
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<section id="appDevelopment" className="pageSection">
							<h3>App Development</h3>
							<img className="alignment" src="../images/Generic4.jpg" title="Generic" alt="Generic" />
							<p>Here is where I can put in content about the Level 3 and Application Development.</p>
						</section>
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<section id="pythonProgramming" className="pageSection">
							<h3>Python Programming</h3>
							<img className="alignment" src="../images/Generic7.jpg" title="Generic" alt="Generic" />
							<p>Here is where I can put in content about the Level 4 and Python Programming.</p>
						</section>
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<section id="machineLearning" className="pageSection">
							<h3>Machine Learning</h3>
							<img className="alignment" src="../images/Generic10.jpg" title="Generic" alt="Generic" />
							<p>Here is where I can put in content about the Level 5 and Machine Learning, the dangerous adaptative AIs.</p>
						</section>
					</div>
				</main>
			</div>
		</>
	);
}
