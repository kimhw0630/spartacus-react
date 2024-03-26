"use client";

import { CmsLinkComponent } from 'hackathon-2023-storefront-sdk';
import React from 'react'
import CxGenericLink from '../cx-generic-link/cx-generic-link';

const CxLink = (props: CmsLinkComponent) => {
	const target = props.target === 'true' || props.target === true ? '_blank' : null;
	// TODO we need to convert props.styleAttributes to valid react style object(React.CSSProperties).
	return (
		// added cx-link in case we need to grab this component node
		<div className={"cx-link " + (props.styleClasses && props.styleClasses)}>
			<CxGenericLink url={props.url} target={target}>
				{props.linkName}
			</CxGenericLink>
		</div>
	)
}

export default CxLink
