import styles from './cx-mini-cart.module.scss';

export default function CxMiniCart() {
    return (
        <a className={styles["cx-mini-cart"]}>
            <span className={styles["cx-mini-cart-count"]}>0</span>
        </a>
    );
}
