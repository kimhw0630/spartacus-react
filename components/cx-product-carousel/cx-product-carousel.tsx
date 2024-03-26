import { CmsProductCarouselComponent, fetchProduct, Product } from "hackathon-2023-storefront-sdk";
import { useEffect, useState } from "react";

import CxCarousel from "../cx-carousel/cx-carousel";
import CxProductCarouselItem from "./cx-product-carousel-item/cx-product-carousel-item";

export default function CxProductCarousel(props: CmsProductCarouselComponent) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [products, setProducts] = useState<Array<Product>>([]);

    useEffect(() => {
        const productCodes = props.productCodes?.split(' ') ?? [];

        if (productCodes.length > 0) {
            const fields = [
                'code',
                'configurable',
                'configuratorType',
                'name',
                'summary',
                'price(formattedValue)',
                'images(DEFAULT,galleryIndex)',
                'baseProduct',
                'stock(DEFAULT)',
            ];

            Promise.all([
                ...productCodes.map(code => {
                    return fetchProduct({ code, fields, lang: 'en', curr: 'USD' })
                })
            ]).then(
                (result) => {
                    setIsLoaded(true);
                    setProducts(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
        }
    }, [props.productCodes]);

    if (error) {
        return <div>Error: {JSON.stringify(error)}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    }

    const carouselItems = products.map(product => {
        return <CxProductCarouselItem key={product.code} {...product} />
    });

    return (
        <CxCarousel
            title={props.title}
            slideSize={4}
        >{carouselItems}</CxCarousel>
    );
}