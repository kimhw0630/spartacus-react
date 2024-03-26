import { Component } from "hackathon-2023-storefront-sdk"

export interface StaticLayoutConfig {
    [position: string]: Array<Component>;
}

export const staticConfig: StaticLayoutConfig = {
    'SiteLogin': [
        {
            uid: 'LoginComponent',
            typeCode: 'LoginComponent',
        },
    ],
};
