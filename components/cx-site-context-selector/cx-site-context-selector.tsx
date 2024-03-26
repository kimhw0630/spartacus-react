"use client";

import { Currency, fetchCurrencies, fetchLanguages, Language, SiteContextType } from 'hackathon-2023-storefront-sdk';
import { useEffect, useState } from 'react';
import styles from './cx-site-context-selector.module.scss';

interface OptionItem {
    value?: string;
    label?: string;
}

export default function CxSiteContextSelector(props: { context: string | undefined }) {
    const [optionItems, setOptionItms] = useState<Array<OptionItem>>([]);
    const [selectedItem, setSelectedItem] = useState('');

    const isLanguage = props.context === SiteContextType.LANGUAGE;
    const fetchData = isLanguage ? fetchLanguages : fetchCurrencies;

    useEffect(() => {
        fetchData()
            .then(
                (result) => {
                    let items: Array<OptionItem>;
                    if (isLanguage) {
                        items = (result as Array<Language>).map(item => {
                            return {
                                value: item.isocode,
                                label: item.nativeName
                            }
                        });
                        setSelectedItem('en');
                    } else {
                        items = (result as Array<Currency>)?.map(item => {
                            return {
                                value: item.isocode,
                                label: item.symbol + ' ' + item.isocode
                            }
                        });
                        setSelectedItem('USD');
                    }
                    setOptionItms(items);
                }
            );

    }, [isLanguage]);
    return (
        <select
            className={styles["cx-site-context-selector"]}
            data-cy={`context-selector-${props.context}`}
            value={selectedItem}
            onChange={event => setSelectedItem(event.target.value)}
        >
            {
                optionItems.map(option => {
                    return <option data-cy={`option-${props.context}-${option.value}`} key={option.value} value={option.value}>{option.label}</option>;
                })
            }
        </select>
    );
}
