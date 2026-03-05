

'use client';
import '@/app/assets/CSS/admin.css';


export default function ITILMainPage() {

	// Stack uses React Suspense, which will render this page while user data is being fetched.
	// See: https://nextjs.org/docs/app/api-reference/file-conventions/loading
	return (
		<>
			<h1 className="center">ITSM</h1>
			<div className="ITSM-Main">
				<div className="ITSM-Main-Content">
					<div className="ITSM-Labels center">Invoices</div>
				</div>
				
				<div className="ITSM-Main-Content">
					<div className="ITSM-Labels center">Requests</div>
				</div>

			</div>
		</>
	);
}
