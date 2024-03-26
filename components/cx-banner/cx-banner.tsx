"use client";

import { CmsBannerComponent, Image, ImageGroup } from "hackathon-2023-storefront-sdk";
import React from "react";
import CxGenericLink from "../cx-generic-link/cx-generic-link";
import CxMedia from "../cx-media/cx-media";

const CxBanner = (props: CmsBannerComponent) => {
	const imageData = () => {
		if (props.media) {
			if ("url" in props.media) {
				return props.media as Image;
			} else {
				return props.media as ImageGroup;
			}
		}
	};
	return (
		<div className="cx-banner">
			<CxGenericLink url={props.urlLink}>
				{props.headline ? <p className="headline">{props.headline}</p> : null}
				<CxMedia container={imageData()}></CxMedia>
				{props.content ? <p className="content">{props.content}</p> : null}
			</CxGenericLink>
		</div>
	);
};

export default CxBanner;
