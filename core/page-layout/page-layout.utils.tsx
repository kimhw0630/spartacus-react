import {
    CmsBannerComponent,
    CmsLinkComponent,
    CmsNavigationComponent,
    CMSPage,
    CmsSiteContextSelectorComponent,
    Component,
    ContentSlot,
} from "hackathon-2023-storefront-sdk";
import CxAnonymousConsentOpenDialog from "../../components/cx-anonymous-consent-open-dialog/cx-anonymous-consent-open-dialog";

import CxBanner from "../../components/cx-banner/cx-banner";
import CxCategoryNavigation from "../../components/cx-category-navigation/cx-category-navigation";
import CxFooterNavigation from "../../components/cx-footer-navigation/cx-footer-navigation";
import CxGenericLink from "../../components/cx-generic-link/cx-generic-link";
import CxLogin from "../../components/cx-login/cx-login";
import CxMiniCart from "../../components/cx-mini-cart/cx-mini-cart";
import CxParagraph from "../../components/cx-paragraph/cx-paragraph";
import CxProductCarousel from "../../components/cx-product-carousel/cx-product-carousel";
import CxSiteContextSelector from "../../components/cx-site-context-selector/cx-site-context-selector";
import { staticConfig } from './static-page-layout.config';
import CxSearchBox from "../../components/cx-searchbox/cx-searchbox";

export interface ComponentMap {
    [position: string]: Array<JSX.Element>;
}

export function parseCMSPageData(page: CMSPage): ComponentMap {
    const componentMap: ComponentMap = {};

    const contentSlots: Array<ContentSlot> = [];
    contentSlots.push(
        ...(page.contentSlots?.contentSlot ?? [])
    );
    contentSlots.push(
        ...(
            Object.keys(staticConfig)
                .map(position => ({
                    position,
                    components: { component: [] },
                }))
        )
    );

    contentSlots.forEach(contentSlot => {
        if (contentSlot.position) {
            const components: Array<JSX.Element> = [];

            const cmsComponents: Array<Component> = [
                ...(contentSlot.components?.component ?? []),
                ...staticConfig[contentSlot.position] ?? [],
            ];

            cmsComponents.forEach((component: Component) => {
                switch (component.typeCode) {
                    case 'SimpleResponsiveBannerComponent':
                    case 'SimpleBannerComponent':
                        components.push((
                            <CxBanner
                                key={component.uid}
                                media={(component as CmsBannerComponent).media}
                                headline={(component as CmsBannerComponent).headline}
                                content={(component as CmsBannerComponent).content}
                            />
                        ))
                        break;
                    case 'CMSSiteContextComponent':
                        components.push((
                            <CxSiteContextSelector key={component.uid} context={(component as CmsSiteContextSelectorComponent).context} />
                        ));
                        break;
                    case 'LoginComponent':
                        components.push((
                            <CxLogin key={component.uid} />
                        ));
                        break;
                    case 'MiniCartComponent':
                        components.push((
                            <CxMiniCart key={component.uid} />
                        ));
                        break;
                    case 'CategoryNavigationComponent':
                        components.push((
                            <CxCategoryNavigation key={component.uid} navigationNode={(component as CmsNavigationComponent).navigationNode} />
                        ));
                        break;
                    case 'ProductCarouselComponent':
                        components.push((
                            <CxProductCarousel key={component.uid} {...component} />
                        ));
                        break;
					case 'SearchBoxComponent':
						components.push((
							<CxSearchBox key={component.uid} {...component} />
						));
						break;
					case 'CMSLinkComponent':

                        components.push((
                            <CxGenericLink
                                key={component.uid}
                                url={(component as CmsLinkComponent).url}
                                external={(component as CmsLinkComponent).external}
                                target={(component as CmsLinkComponent).target as any}
                                style={{
                                    fontSize: '12px',
                                    color: 'rgb(211, 214, 219)'
                                }}
                            >{(component as CmsLinkComponent).linkName}</CxGenericLink>
                        ));
                        break;
                    case 'FooterNavigationComponent':
                        components.push((
                            <CxFooterNavigation key={component.uid} {...component} />
                        ));
                        break;
                    case 'CMSParagraphComponent':
                        components.push((
                            <CxParagraph key={component.uid} {...component} />
                        ));
                        break;
                    case 'CMSFlexComponent':
                        switch ((component as any).flexType) {
                            case 'AnonymousConsentOpenDialogComponent':
                                components.push((
                                    <CxAnonymousConsentOpenDialog key={component.uid} />
                                ));
                                break;
                        }
                        break;
                }
            });

            componentMap[contentSlot.position] = components;
        }
    });

    return componentMap;
}
