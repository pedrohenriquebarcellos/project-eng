'use client'

import styles from "./editCompany.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/axios";
import { Company } from "@/app/components/GetCompanies";
import CompanyForm from "@/app/components/CompanyForm";
import { notFound } from "next/navigation";
import { Spinner } from "phosphor-react";
import { useAuth } from "@/hooks/useAuth";

export default function CompanyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const [company, setCompany] = useState<Company | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [id, setId] = useState<string | null>(null);    

    const isAuthenticated = useAuth();

    useEffect(() => {
        params.then(({ id }) => setId(id));

        if (id && isAuthenticated) {
            const fetchCompany = async () => {
                try {
                    const response = await api.get(`/companies/${id}`);
                    setCompany(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error("Erro ao buscar empresa:", error);
                    setError("Erro ao buscar empresa.");
                    setLoading(false);
                }
            };
            fetchCompany();
        }
    }, [id, params, isAuthenticated]);

    if (loading) {
        return (
            <div className={styles.overlay}>
                <Spinner size={48} className={styles.spinner} />
            </div>
        )
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (company) {
        return <CompanyForm company={company} />;
    }

    return notFound();
}
