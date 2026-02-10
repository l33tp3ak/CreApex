
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/TypeScriptDataObjectTemplate.ts to edit this template
 */


import {
	ITILTicketStatus,
	ITILTicketType,
	Role,
	Weight,
} from "../generated/prisma/client";
/*

	Address,
	AddressBook,
	Colour, Country,
	Currency,
	Invoice,
	Language,
	Material,
	MaterialColour,
	Modele3D,
	ProvinceState,
	Request,
	Task,
	User,
	WorkOrder
 */


/*
----------------------------------------------------------------------------------------------------------------
----------------------------------------------------ENUM-----------------------------------------------------
----------------------------------------------------------------------------------------------------------------
 */
export const ITILTICKETSTATUS_MAP: Record<ITILTicketStatus, string> = {
	ASSIGNED: 'Assigned',
	CANCELLED: "Cancelled",
	CLOSED: "Closed",
	IN_PROGRESS: "In Progress",
	APPROVED: "Approved",
	IN_REVIEW: "In Review",
	REJECTED: "Rejected",
	NEW: "New",
	PENDING: "Pending",
	RESOLVED: "Resolved"
}

export const ITILTICKETTYPE_MAP: Record<ITILTicketType, string> = {
	CHA: "CHA",
	INC: "INC",
	INV: "INV",
	REQ: "REQ",
	TAS: "TAS",
	WO: "WO",
}

export const ROLE_MAP: Record<Role, string> = {
	ADMIN: "Admin",
	USER: "User",
}

export const WEIGHT_MAP: Record<Weight, string> = {
	GRAM: "Gram",
	KG: "Kg",
}




/*
----------------------------------------------------------------------------------------------------------------
-------------------------------------------------MODELS-----------------------------------------------------
----------------------------------------------------------------------------------------------------------------
*/
/*
 * Pour pouvoir faire nos table dans notre fichier types.ts, il faut que nous définitions chaque table individuellement.
 * Cela nous permet de créer nos tables sans avoir une recursions infinie vers chaque table.
 * Pour ce faire, à chaque fois qu'une table a une Foreign Key, il faut définir la Foreign Key ET le champ représentant notre relation.
 * Celui-ci sera défini avec le type représentant notre table externe.
 */
export type User = {
	user_ID: string;
	username: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
	role: Role;
	
	displayLanguage: Language;
	languageID: bigint;
	
	addressBook: AddressBook;
	
	defaultAddress: Address | null;
	defaultAddressID: bigint | null;
	
	purchases: Request[];
	modele3DUploaded: Modele3D[];
};


export type Address = {
	address_ID: string;
	streetNumber: bigint;
	streetName: string;
	postalCode: string;
	
//Relations
//1:n
//Country of the address
	addressCountry: Country;
	countryID: bigint;

//1:n
//Province / State / Region of the address
	region: ProvinceState;
	regionID: bigint;

	defaultAddresses: User[];

//m:n
//Address book containing which user has which addresses
	addressBook: AddressBook[];
	
	shippingAddress: Invoice[];
	billingAddress: Invoice[];
	
};


export type AddressBook = {
	addresses: Address	;
	addressesID: string;					//relation scalar field (used in the "@relation" attribute above)
	users: User;
	usersID: string;
	
};


export type Country = {
	country_ID: bigint;
	name: string;

//Relations
//1:n
//Currency of the country
	currency: Currency;
	currencyID: bigint;

//n:1
	regions: ProvinceState[];

//n:1
	AD: Address[];
	
};


export type ProvinceState = {
	region_ID: bigint;
	name: string	;

//Relations
//1:n
	country: Country;
	countryID: bigint;

//n:1
	AD: Address[];
};


export type Language = {
	language_ID: string;
	name: string;
	
//Relations
//As this is a 1:N relationship, this side of the relation uses a list which CAN be empty, as a language can have 0 users
//Here, we have a named relation, "UserDisplayLanguage", for example purposes
	usersOfLanguage: User[];
};


export type Currency = {
	currency_ID: bigint;
	name:string;

//Relations
//n:1
	countries: Country[];
	
};


export type Modele3D = {
	modele_3d_ID:string;
	name: string;
	path: string;
	netVolume: number;

//Relations
//1:n
//User who uploaded the model
	uploader: User | null;
	uploaderID:string | null;

//Relations
	WOs: WorkOrder[];
};


export type Material = {
	material_ID: bigint;
	name:string;
	
	createdAt:Date;
	updatedAt:Date;
// Unit of weight used for this material
	weightUnit: Weight;
	
// Relations
// M:n
// Colours available for this material
	colour:MaterialColour[];
	
};


export type Colour = {
	colour_ID:bigint;
	name:string;
// M:n
// Materials this colour is available for
	material:MaterialColour[];
	
};


export type MaterialColour = {
	material:Material;
	materialID:bigint;
	colour:Colour;
	colourID:bigint;

	quantityAvailable:number;					//Each colour of each material has it's own quantity available, which represents in the inventory the amount available in the defined weightUnit
	priceByWeight:number;
	
	creationTasks:Task[];
};


export type Invoice = {
	invoice_ID_string:				ITILTicketType;
	invoice_ID_number:			bigint;

	
//Relations
//1:1
/*
Although this is a 1:1 relationship, it is a FULL junction, I think
Through it, we get the User who made the commission, if any
Through the user we can get their address, through the address, the country
*/
	purchase:							Request;
	purchaseRqStringID:			ITILTicketType;
	purchaseRqNumberID:		bigint;


//1:n
//Address for billing
//Through the Address we get the Country, through the country, the Currency
	billingAddress:					Address;
	billingAddressID:				string;

//1:n
//Address for SHIPPING
//Through the Address we get the Country, through the country, the Currency
//Optional, as the default is the same as the billing address
	shippingAddress:				Address | null;
	shippingAddressID:			string | null;
	

	totalBeforeTaxes:				number;
	taxes:								number;
	totalAfterTaxes:				number;
	reservationFee:					number;
	totalAfterFee:					number;
	
};


export type Request = {
	request_ID_string:				ITILTicketType;
	request_ID_number:				bigint;
//Defines the ID to be multiple fields, making it possible to have an autoincrement with a specific string
	userMessage:						string;
	

//Relations
//n:1
	wosBeingFulfilled:					WorkOrder[];

//Optional 1:n
//This is optional as it is possible a buyer may not have an account when they are commissioning an item
//Additionally, a user may not have an address set up or does not wish to have an address setup
	requestor:							User | null;
	requestorID:						string | null;

//1:1
//In a one-to-one relation, the side of the relation without a foreign key MUST be optional
	bill:								Invoice | null;
	
};


export type WorkOrder = {
	work_order_ID_string:		ITILTicketType;
	work_order_ID_number:		bigint;
//Defines the ID to be multiple fields, making it possible to have an autoincrement with a specific string

	
	quantity:							bigint;
	
//Relations
//1:n
	orderedModel:					Modele3D;
	modelID:							string;

//1:n
//Multi-Field Foreign Key to the parent Request
	parentRequest:					Request;
	rqStringID:						ITILTicketType;
	rqNumberID:					bigint;

//n:1
	tasksBeingFulfilled:			Task[];
	
};


export type Task = {
	task_ID_string:				ITILTicketType;
	task_ID_number:				bigint;

	
//Relations
	selectedMaterialColor:		MaterialColour;
	selectedMaterial:				bigint;
	selectedColour:					bigint;

	parentWorkOrder:				WorkOrder;
	woStringID:						ITILTicketType;
	woNumberID:					bigint;
	
};