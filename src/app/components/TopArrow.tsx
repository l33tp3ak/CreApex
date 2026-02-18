

import '@/app/assets/CSS/style.css';
import {useLocation} from "react-router-dom";
import Link from "next/link";
import React from "react";
import Image from "next/image";




export function TopArrow() {
	const [arrow, setArrow] = React.useState(
		<Image
			id="topArrow"
			className="arrow"
			src="/images/UpWhiteArrowOcreCircle.png"
			useMap={"#imgmapTop"}
			width={50}
			height={50}
			alt="Up White Arrow Ocre Circle"
			title="Go to the top"
		/>);


	return (
		<>
			<div className={"verticalBottomRight"} id="topArrowParent">
				{/*
				
				*/}
				<Image
					id="topArrow"
					className="arrow"
					src="/images/UpWhiteArrowOcreCircle.png"
					useMap={"#imgmapTop"}
					width={50}
					height={50}
					alt="Up White Arrow Ocre Circle"
					title="Go to the top"
					draggable={false}
				/>
				{/*
					<img id="topArrow" className={"arrow"} src="/images/UpWhiteArrowOcreCircle.png" useMap={"#imgmapTop"} alt="Up White Arrow Ocre Circle" title="Go to the top" />
					*/}


				<map name="imgmapTop" draggable={false}>
					<area id="arrowArea" draggable={false} shape="circle" alt="Up White Arrow Ocre Circle: Go to the top" coords="25,25,25" href="#Home" />
				</map>
			</div>
		</>
	)
}

