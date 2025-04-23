"use client";

import { useRouter } from "next/router";
import { useState } from "react";
import { ArrowFatLeft, Spinner } from "phosphor-react";
import styles from "./btnBack.module.css";

export default function BtnBack({ href }: { href: string }) {
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);

    const handleRedirect = async () => {
        setIsRedirecting(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await router.push(href);
    }

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