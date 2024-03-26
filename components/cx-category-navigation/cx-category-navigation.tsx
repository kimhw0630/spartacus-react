import { CmsNavigationNode, Component, fetchComponents } from "hackathon-2023-storefront-sdk";
import { useEffect, useState } from "react";
import styles from './cx-category-navigation.module.scss';
import { getComponentIds, getTitle } from "../cx-navigation.utils";

export default function CxCategoryNavigation(props: { navigationNode?: CmsNavigationNode }) {
    const [shownMenu, setShownMenu] = useState<string | undefined>(undefined);

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

    const tabs = props.navigationNode?.children?.map(node => {
        let menu: JSX.Element | undefined;
        let caretDown: JSX.Element | undefined;

        if (node?.children?.length) {
            const list: Array<Array<JSX.Element>> = [];

            node.children.forEach((childNode, i) => {
                const sublist: Array<JSX.Element> = [];

                const style = {
                    gridColumn: i + 1,
                };

                const childClassName = childNode.children?.length ? styles["cx-category-navigation-menu-header"] : styles["cx-category-navigation-menu-item"];

                sublist.push(
                    <span key={childNode.uid} className={childClassName} style={style}>{getTitle(childNode, components)}</span>
                );

                childNode.children?.forEach(grandchildNode => {
                    sublist.push(
                        <span key={grandchildNode.uid} className={styles["cx-category-navigation-menu-item"]} style={style}>{getTitle(grandchildNode, components)}</span>
                    );
                });

                list.push(sublist);
            });

            const inlineStyles: { [property: string]: string } = {};
            shownMenu !== node.uid && (inlineStyles['display'] = 'none');

            menu = (
                <div className={styles["cx-category-navigation-menu"]} style={inlineStyles}>
                    {
                        list
                    }
                </div>
            );

            const onMouseEnter = () => {
                setShownMenu(node.uid);
            };
            const onMouseLeave = () => {
                setShownMenu(undefined);
            };

            caretDown = (
                <span
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    style={{ padding: '8px' }}
                >
                    &#9660;
                    {menu}
                </span>
            );
        }

        return (
            <div className={styles["cx-category-navigation-tab-container"]} key={node.uid}>
                <a className={styles["cx-category-navigation-tab"]}>{node.title} {caretDown}</a>
            </div>
        );
    });

    return (
        <div className={styles["cx-category-navigation"]}>
            {tabs}
        </div>
    );
}