
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license  * Click nbfs://nbhost/SystemFileSystem/Templates/Other/TypeScriptDataObjectTemplate.ts to edit this template  
*/





export function showTopArrow() {
	let topArrow = document.getElementById("topArrow");
	let arrowArea = document.getElementById("arrowArea");
	if (!topArrow) {
		return (console.log('Error: Element with ID "topArrow" does not exist!'));
	}
	if (!arrowArea) {
		return (console.log('Error: Element with ID "arrowArea" does not exist!'));
	}


	let cssStyle = window.getComputedStyle(topArrow);
	let opacity = cssStyle.getPropertyValue("opacity");
	topArrow.style.height = "50px";
	topArrow.style.opacity = opacity;
	let screenSize = window.screen.width;
	let currentOpacity;


	if ((document.body.scrollTop > 50 && screenSize <= 990) || (document.documentElement.scrollTop > 50 && screenSize <= 990)) {
		//Make the navigation arrow appear, progressively, using an increase in the CSS opacity property
		let showElement = window.setInterval(() => {
			if (Number(opacity) < 1) {
				//	The "Number()" method converts the value of the variable into a number, which we can then use to do math.
				currentOpacity = Number(opacity) + 0.05;
				topArrow.style.opacity = currentOpacity.toString();
				cssStyle = window.getComputedStyle(topArrow);
				opacity = cssStyle.getPropertyValue("opacity");
			} else {
				clearInterval(showElement);
			}
		}, 5);
		//Make the link, here the <area></area>, clickable and visually interactable
		arrowArea.style.cursor = "pointer";
		arrowArea.style.pointerEvents = "default";
		arrowArea.title = "Go to the top";
		
	} else if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
		//Make the navigation arrow appear, progressively, using an increase in the CSS opacity property
		let showElement = window.setInterval(() => {
			if (Number(opacity) < 1) {
				//	The "Number()" method converts the value of the variable into a number, which we can then use to do math.
				currentOpacity = Number(opacity) + 0.05;
				topArrow.style.opacity = currentOpacity.toString();
				cssStyle = window.getComputedStyle(topArrow);
				opacity = cssStyle.getPropertyValue("opacity");
			} else {
				clearInterval(showElement);
			}
		}, 5);
		//Make the link, here the <area></area>, clickable and visually interactable
		arrowArea.style.cursor = "pointer";
		arrowArea.style.pointerEvents = "default";
		arrowArea.title = "Go to the top";
		
	} else {
		//Make the navigation arrow disappear, progressively, using a decrease in the CSS opacity property
		let showElement = window.setInterval(() => {
			if (Number(opacity) > 0) {
				currentOpacity = Number(opacity) - 0.05;
				topArrow.style.opacity = currentOpacity.toString();
				cssStyle = window.getComputedStyle(topArrow);
				opacity = cssStyle.getPropertyValue("opacity");
			} else {
				clearInterval(showElement);
			}
		}, 5);
		//Make the link, here the <area></area>, NOT clickable and visually uninteractable
		arrowArea.style.cursor = "default";
		arrowArea.style.pointerEvents = "none";
		arrowArea.title = "";
	}
	return;
}


