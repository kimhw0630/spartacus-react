"use client";

import React from "react";
import styles from "./cx-media.module.scss";
import {
	ImageGroup,
	MediaContainer,
	Image,
	ImageLoadingStrategy,
	MediaService,
} from "hackathon-2023-storefront-sdk";

import { mediaConfig } from "./cx-media.model";


interface Props {
	container: MediaContainer | Image | ImageGroup | ImageGroup[] | undefined;
	className?: string;
	format?: string;
	alt?: string;
	role?: string;
	loading?: ImageLoadingStrategy | null;
	loaded?: boolean;
}

const CxMedia = (props: Props) => {
	const mediaService = new MediaService({ mediaFormats: mediaConfig.mediaFormats });
	const media = mediaService.getMedia(
		props.container instanceof Array ? props.container[0] : props.container,
		props.format,
		props.alt,
		props.role
	);
	// const onLoad = () => {
	// 	console.log('loaded')
	// 	props['loaded'] = true;
	// }

	// const onError = () => {
	// 	props['loaded'] = false;
	// }
	return (
		<div className={`${styles["cx-media"]} ${props.className}`}>
			<img
				src={media?.src ?? ""}
				alt={media?.alt ?? ""}
				role={media?.role ?? ""}
				srcSet={media?.srcset ?? ""}
			/>
		</div>
	);
};

export default CxMedia;
