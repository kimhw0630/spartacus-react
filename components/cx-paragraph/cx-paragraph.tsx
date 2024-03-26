"use client";

import { CmsComponent } from 'hackathon-2023-storefront-sdk';
import React from 'react'

interface Props extends CmsComponent {
	content?: string;
}

function CxParagraph(props: Props) {
	return (
		<div className="cx-paragraph" dangerouslySetInnerHTML={{ __html: props.content || '' }} />
	)
}

export default CxParagraph
