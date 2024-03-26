import { useRef } from 'react';
import styles from './cx-carousel.module.scss';

interface CxCarouselProps {
    title?: string;
    slideSize?: number;
    children?: Array<JSX.Element>;
}

export default function CxCarousel({ title, children }: CxCarouselProps) {
    const itemsRef = useRef<HTMLDivElement>(null);

    return (
        <div className={styles["cx-carousel"]}>
            <h2 className={styles["cx-carousel-header"]}>{title}</h2>
            <div className={styles["cx-carousel-items"]} ref={itemsRef}>
                {children}
            </div>
            <button
                className={`${styles["cx-carousel-arrow"]} ${styles["cx-carousel-arrow-prev"]}`}
                onClick={
                    () => itemsRef.current?.scrollBy({ left: -itemsRef.current.clientWidth, behavior: 'smooth' }) // setCurrentSlide(currentSlide - 1
                }
            >{"<"}</button>
            <button
                className={`${styles["cx-carousel-arrow"]} ${styles["cx-carousel-arrow-next"]}`}
                onClick={
                    () => itemsRef.current?.scrollBy({ left: itemsRef.current.clientWidth, behavior: 'smooth' }) // setCurrentSlide(currentSlide - 1
                }
            >{">"}</button>
        </div>
    );
}
