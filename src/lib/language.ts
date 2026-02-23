

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/TypeScriptDataObjectTemplate.ts to edit this template
 */


export function language() {
	let primaryLanguage = "en";

	if (typeof navigator !== 'undefined') {
		// Use navigator.languages for the full list, or navigator.language for the primary language
		//const browserLanguages = navigator.languages || [navigator.language];

		//We will only implement the primary language for now
		const browserLanguage = navigator.language;

		/*
		The most preferred language is the first one in the array returned by "navigator.languages"
		If we were using it, we would instead use the following:
		
		const primaryLanguage = browserLanguages[0] || 'en';
		*/
		primaryLanguage = browserLanguage || 'en';
	}

	return primaryLanguage;
};