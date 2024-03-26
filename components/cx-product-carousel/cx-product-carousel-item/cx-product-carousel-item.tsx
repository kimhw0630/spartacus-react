import { Product } from "hackathon-2023-storefront-sdk";
import CxMedia from "../../cx-media/cx-media";
import styles from './cx-product-carousel-item.module.scss';

export default function CxProductCarouselItem(product: Product) {
    return (
        <div key={product.code} className={styles["cx-carousel-product-item"]}>
            <CxMedia
                className={styles["cx-carousel-product-item-media"]}
                container={product.images}
            />
            <h3 className={styles["cx-carousel-product-item-title"]}>{product.name}</h3>
            <span>{product.price?.formattedValue}</span>
        </div>
    );
}