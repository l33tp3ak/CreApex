
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/TypeScriptDataObjectTemplate.ts to edit this template
 */


export default function showTopArrow() {
	let topArrow = document.getElementById("topArrow");
	if (!topArrow) {
		return (console.log('Error: Element with ID "topArrow" does not exist!'));
	}
	let cssStyle = window.getComputedStyle(topArrow);
	let opacity = cssStyle.getPropertyValue("opacity");
	topArrow.style.height = "50px";
	topArrow.style.opacity = opacity;
	let screenSize = window.screen.width;
	let currentOpacity;
	if ((document.body.scrollTop > 50 && screenSize <= 990) || (document.documentElement.scrollTop > 50 && screenSize <= 990)) {
		let showElement = window.setInterval(function () {
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
	} else if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
		let showElement = window.setInterval(function () {
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
	} else {
		var showElement = window.setInterval(function () {
			if (Number(opacity) > 0) {
				currentOpacity = Number(opacity) - 0.05;
				topArrow.style.opacity = currentOpacity.toString();
				cssStyle = window.getComputedStyle(topArrow);
				opacity = cssStyle.getPropertyValue("opacity");
			} else {
				clearInterval(showElement);
			}
		}, 5);
	}
	
}