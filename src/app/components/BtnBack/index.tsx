import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowFatLeft, Spinner } from "phosphor-react";
import styles from "./btnBack.module.css";

export default function BtnBack({ href }: { href: string }) {
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);

    const handleRedirect = () => {
        setIsRedirecting(true);
        setTimeout(() => {
            router.push(href);
        }, 1000);
    };

    return (
         <button onClick={handleRedirect} className={styles.btnBack}>
            {isRedirecting ? (
                <Spinner size={24} className={styles.spinner} />
            ) : (
                <ArrowFatLeft size={32} />
            )}
        </button>   
    )
}