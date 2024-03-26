import { CmsNavigationComponent, Component, fetchComponents } from "hackathon-2023-storefront-sdk";
import { useEffect, useState } from "react";
import CxGenericLink from "../cx-generic-link/cx-generic-link";
import { getComponentIds, getTitle } from "../cx-navigation.utils";
import styles from './cx-footer-navigation.module.scss';

export default function CxFooterNavigation(props: CmsNavigationComponent) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [components, setComponents] = useState<Array<Component>>([]);

    useEffect(() => {
        const componentIds = props.navigationNode ? getComponentIds(props.navigationNode) : [];
        fetchComponents({ componentIds, pageSize: 30, lang: 'en', curr: 'USD' })
            .then(
                response => {
                    setIsLoaded(true);
                    if (response.component) {
                        setComponents(response.component);
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, [props.navigationNode]);

    if (error) {
        return <div>Error: {JSON.stringify(error)}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    }

    const columns = props.navigationNode?.children?.map(child => {
        const items = child.children?.map(grandchild => {
            return (
                <CxGenericLink key={grandchild.uid} class={styles["cx-footer-navigation-column-item"]}>{getTitle(grandchild, components)}</CxGenericLink>
            );
        });

        return (
            <div key={child.uid} className={styles["cx-footer-navigation-column"]}>
                <span className={styles["cx-footer-navigation-column-header"]}>{getTitle(child, components)}</span>
                {items}
            </div>
        );
    });

    return (
        <div className={styles["cx-footer-navigation"]}>
            {columns}
        </div>
    );
}