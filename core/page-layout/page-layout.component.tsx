import { fetchPage } from 'hackathon-2023-storefront-sdk';
import { useEffect, useState } from 'react';

import styles from './page-layout.module.scss';
import { ComponentMap, parseCMSPageData } from './page-layout.utils';

export default function PageLayout() {
    // TODO Fill in values via route.
    // const pageType = 'CategoryPage';
    // const code = '578';
    const lang = 'en';
    const curr = 'USD';

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [componentMap, setComponentMap] = useState<ComponentMap>({});

    useEffect(() => {
        fetchPage({ lang, curr })
            .then(
                (result) => {
                    setIsLoaded(true);
                    setComponentMap(
                        parseCMSPageData(result)
                    );
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);

    if (error) {
        return <div>Error: {JSON.stringify(error)}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles["page-layout"]}>
            <div className={styles["page-layout-header"]}>
                <div>
                    <div className={styles["page-slot-PreHeader"]}>{componentMap['PreHeader']}</div>
                    <div data-cy="site-context" className={styles["page-slot-SiteContext"]}>{componentMap['SiteContext']} </div>
                    <div className={styles["page-slot-SiteLinks"]}>{componentMap['SiteLinks']}</div>
                    <div className={styles["page-slot-SiteLogo"]}>{componentMap['SiteLogo']}</div>
                    <div className={styles["page-slot-SearchBox"]}>{componentMap['SearchBox']}</div>
                    <div className={styles["page-slot-SiteLogin"]}>{componentMap['SiteLogin']}</div>
                    <div className={styles["page-slot-MiniCart"]}>{componentMap['MiniCart']}</div>
                    <div className={styles["page-slot-NavigationBar"]}>{componentMap['NavigationBar']}</div>
                </div>
            </div>
            <div className="page-layout-navigation"></div>
            <div className={styles["page-layout-CategoryPageName"]}>
                <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
                    <div className={styles["page-slot-Section1"]}>{componentMap['Section1']}</div>
                    <div className={styles["page-slot-Section2A"]}>
                        {componentMap['Section2A']}
                    </div>
                    <div className={styles["page-slot-Section2B"]}>
                        {componentMap['Section2B']}
                    </div>
                    <div className={styles["page-slot-Section2C"]}>
                        {componentMap['Section2C']}
                    </div>
                    <div className={styles["page-slot-Section3"]}>{componentMap['Section3']}</div>
                </div>
                <div className={styles["page-slot-Section4"]}>{componentMap['Section4']}</div>
                <div className={styles["page-slot-Section5"]}>{componentMap['Section5']}</div>
            </div>
            <div className="page-layout-footer">
                <div className={styles["page-slot-Footer"]}>{componentMap['Footer']}</div>
            </div>
        </div>
    );
}
