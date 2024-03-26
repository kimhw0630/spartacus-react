import { ConsentTemplate, fetchConsentTemplates } from 'hackathon-2023-storefront-sdk';
import { useEffect, useState } from 'react';
import styles from './cx-anonymous-consent-open-dialog.module.scss';

export default function CxAnonymousConsentOpenDialog() {
    const [showDialog, setShowDialog] = useState(false);

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [consentTemplates, setConsentTemplates] = useState<Array<ConsentTemplate>>([]);

    useEffect(() => {
        fetchConsentTemplates({ userId: 'anonymous', lang: 'en', curr: 'USD' })
            .then(
                (result) => {
                    setIsLoaded(true);
                    setConsentTemplates(result);
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

    let dialog: JSX.Element;

    if (showDialog) {
        const consents = consentTemplates.map(consentTemplate => {
            return (
                <div key={consentTemplate.id} className={styles["cx-consent-item"]}>
                    <input type="checkbox" className={styles["cx-consent-item-checkbox"]} />
                    <div className={styles["cx-consent-item-content"]}>
                        <span className={styles["cx-consent-item-header"]}>{consentTemplate.name}</span>
                        <p className={styles["cx-consent-item-description"]}>{consentTemplate.description}</p>
                    </div>
                </div>
            );
        });

        dialog = (
            <dialog className={styles["cx-anonymous-consent-open-dialog-modal-backdrop"]}>
                <div className={styles["cx-anonymous-consent-open-dialog-modal"]}>
                    <div className={styles["cx-anonymous-consent-open-dialog-modal-header"]}>
                        <h3>Consent Management</h3>
                        <button
                            className={styles["cx-anonymous-consent-open-dialog-modal-header-close"]}
                            onClick={() => setShowDialog(false)}
                        >X</button>
                    </div>
                    <div className={styles["cx-anonymous-consent-open-dialog-modal-content"]}>
                        <p className={styles["cx-anonymous-consent-open-dialog-modal-content-description"]}>
                            We use cookies/browser{"'"}s storage to personalize the content and improve user experience. We also might share the data about your site usage with our social media. For more, please review our privacy policy.
                        </p>
                        {consents}
                    </div>
                </div>
            </dialog>
        );

        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'inherit';
    }

    const launchDialog = () => {
        setShowDialog(true);
    };

    return (
        <div className={styles["cx-anonymous-consent-open-dialog"]}>
            <button
                className={styles["cx-anonymous-consent-open-dialog-launcher"]}
                onClick={launchDialog}
            >Consent Preferences</button>
            {dialog}
        </div>
    );
}
