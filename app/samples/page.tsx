// Import your Client Component
import { CmsBannerComponent, CmsLinkComponent, SiteContextType } from 'hackathon-2023-storefront-sdk';
import React from 'react';
import CxBanner from '../../components/cx-banner/cx-banner';
import CxGenericLink from '../../components/cx-generic-link/cx-generic-link';
import CxLink from '../../components/cx-link/cx-link';
import CxMedia from '../../components/cx-media/cx-media';
import CxParagraph from '../../components/cx-paragraph/cx-paragraph';
import CxSiteContextSelector from '../../components/cx-site-context-selector/cx-site-context-selector';

export default async function Page() {

	// sample data for CxMedia
	const oImage = {
		altText: "SAP Commerce",
		code: "/images/theme/SAP_scrn_R.png",
		mime: "image/png",
		url: "/medias/SAP-scrn-R.png?context=bWFzdGVyfGltYWdlc3wxMDEyN3xpbWFnZS9wbmd8YVcxaFoyVnpMMmcxWVM5b05EZ3ZPRGM1TnpRNU5UQTJOalkxTkM1d2JtY3xkM2M3NGJlNmUyMWM2ZjU0OGYxOTBiY2Q3OWFjMDYyNGU3OTExNzE1N2JhMjUzMjk4YTY1ZTcwMTBkYjlmNWFm",
	};
	// sample data for CxBanner
	const media = {
		tablet: {
			code: "Elec_770x350_HomeSpeed_EN_01_770W.jpg",
			mime: "image/jpeg",
			altText: "Save Big On Select SLR & DSLR Cameras",
			url: "/medias/Elec-770x350-HomeSpeed-EN-01-770W.jpg?context=bWFzdGVyfGltYWdlc3w1MzAzOHxpbWFnZS9qcGVnfGFXMWhaMlZ6TDJnellTOW9NMll2T0RjNU56TTFORE01TXpZek1DNXFjR2N8YzA3NDUwMTA2ZGM4ZjBiOTQzNDQ5ZmQyMDdkNjYyOTNlMGUzMTEyMjE5ODYzMThlYzViNzA2ZWE1ZWU2YTJlOA",
		},
		desktop: {
			code: "Elec_960x330_HomeSpeed_EN_01_960W.jpg",
			mime: "image/jpeg",
			altText: "Save Big On Select SLR & DSLR Cameras",
			url: "/medias/Elec-960x330-HomeSpeed-EN-01-960W.jpg?context=bWFzdGVyfGltYWdlc3w1MzE2M3xpbWFnZS9qcGVnfGFXMWhaMlZ6TDJoaU55OW9ZVFV2T0RjNU56TTFORFV5TkRjd01pNXFjR2N8ZWE1MDM1MzNiYTM4YmMzNGUyODc1Mzc3Mzg4ZDNmNWQ1ZWM4YzY4YTIwMjk2ODE2MWE3OThkYjUxZDAzNTljYg",
		},
		mobile: {
			code: "Elec_480x320_HomeSpeed_EN_01_480W.jpg",
			mime: "image/jpeg",
			altText: "Save Big On Select SLR & DSLR Cameras",
			url: "/medias/Elec-480x320-HomeSpeed-EN-01-480W.jpg?context=bWFzdGVyfGltYWdlc3wzMzkzMnxpbWFnZS9qcGVnfGFXMWhaMlZ6TDJnd1l5OW9Zakl2T0RjNU56TTFORE15T0RBNU5DNXFjR2N8YmM1YTc2MDE1ZGM3MjllYmNjZDMzZTI5YjgzZmExZTAyMGUxZjU5Yjg1NWU2YTMyZmIwMTZjOTAxMTViNzdhOQ",
		},
		widescreen: {
			code: "Elec_1400x440_HomeSpeed_EN_01_1400W.jpg",
			mime: "image/jpeg",
			altText: "Save Big On Select SLR & DSLR Cameras",
			url: "/medias/Elec-1400x440-HomeSpeed-EN-01-1400W.jpg?context=bWFzdGVyfGltYWdlc3w4MTk4OHxpbWFnZS9qcGVnfGFXMWhaMlZ6TDJnd05pOW9PV0l2T0RjNU56TTFOREV6TVRRNE5pNXFjR2N8OTNlMWU3ODg2OWVmNDc2MGI1ODUzY2ZlNTE1ZjlhMGM5MGE5NjNjY2I5NTliOGJkZmZlODI4OTUxZGI5Y2QyNA",
		},
	};
	const oBanner: CmsBannerComponent = {
		headline: 'Test Header',
		content: 'Test content',
		media: media,
		urlLink: '/faq'
	}
	const oLinkData: CmsLinkComponent = {
		linkName: "Quick Order",
		target: "false",
		url: "/faq"
	}
	const paragraph = "<div class=\"cx-notice\">Copyright © 2020 SAP SE or an SAP affiliate company. All rights reserved.</div>"

	return (
		<div className="flex flex-col ">

			<div>
				<div>Sample CxParagraph Component</div>
				<CxParagraph content={paragraph}></CxParagraph>
			</div>
			<div>
				<div>Sample CxSiteContextSelector Component</div>
				<CxSiteContextSelector key="test" context={SiteContextType.CURRENCY}></CxSiteContextSelector>
			</div>
			<div>
				<div>Sample CxSiteContextSelector Component</div>
				<CxSiteContextSelector key="teste" context={SiteContextType.LANGUAGE}></CxSiteContextSelector>
			</div>

			<div>
				<div>Sample CxGenericLink Component</div>
				<CxGenericLink url="http://google.com" target="_blank" title="google" class="newclass">
					<div>google</div>
				</CxGenericLink>
				<CxGenericLink url="/faq?asm=true">
					<div>FAQ</div>
				</CxGenericLink>
				<CxGenericLink url="/">
					<CxMedia container={oImage} ></CxMedia>
				</CxGenericLink>
			</div>
			<div>
				<div>Sample CxMedia Component</div>
				<CxMedia container={oImage} ></CxMedia>
			</div>
			<div>
				<div>Sample CxBanner Component</div>
				<CxBanner media={oBanner.media} headline={oBanner.headline} content={oBanner.content} urlLink={oBanner.urlLink} ></CxBanner>
			</div>
			<div>
				<div>Sample CxLink Component</div>
				<CxLink url={oLinkData.url} target={oLinkData.target} linkName={oLinkData.linkName}></CxLink>
			</div>

		</div>

	);
}
