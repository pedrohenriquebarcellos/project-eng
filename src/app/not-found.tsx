'use client'

import styles from "./notFound.module.css"
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
    const router = useRouter();

    const handleGoHome = () => {
        router.push('/');
    };

    return (
        <div className={styles.container}>
            <div className={styles.errorContainer}>
                <div className={styles.errorNumber}>404</div>
                <div className={styles.errorMessage}>
                    <h2>Página não encontrada</h2>
                    <p>Desculpe, não conseguimos encontrar a página que você está procurando.</p>
                </div>
                <button className={styles.goHomeButton} onClick={handleGoHome}>
                    Voltar para a Página Inicial
                </button>
            </div>
        </div>
    );
}
