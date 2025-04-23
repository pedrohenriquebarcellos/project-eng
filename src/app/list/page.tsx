"use client";

import { useEffect, useState } from "react";
import getCompanies, { Company } from "@/app/components/GetCompanies";
import styles from './listCompanies.module.css';
import { Spinner } from "phosphor-react";
import CompanyModal from "../components/ModalCompany";

export default function ListPage() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const [isLoading, isSetLoading] = useState(true);

    useEffect(() => {
        const fetchCompanies = async () => {
            const data = await getCompanies();
            setCompanies(data);
        };
        fetchCompanies();
    }, []);

    return (
        <section className={styles.wrapper}>
            {companies.length > 0 ? (
                <>
                    <ul className={styles.rowHeader}>
                        <li>ID</li>
                        <li>CNPJ</li>
                        <li>Nome</li>
                        <li>Cidade</li>
                    </ul>

                    {companies.map((company) => (
                        <ul
                            key={company.id}
                            className={styles.row}
                            onClick={() => setSelectedCompany(company)}
                            style={{ cursor: 'pointer' }}
                        >
                            <li className={styles.cell} data-label="ID">{company.id}</li>
                            <li className={styles.cell} data-label="CNPJ">{company.cnpj}</li>
                            <li className={styles.cell} data-label="Nome">{company.companyLegalName}</li>
                            <li className={styles.cell} data-label="Cidade">{company.companyCity}</li>
                        </ul>
                    ))}

                    {selectedCompany && (
                        <CompanyModal company={selectedCompany} onClose={() => setSelectedCompany(null)} />
                    )}
                </>
            ) : (
                <>
                    {isLoading ? (
                        <div className={styles.overlay}>
                            <Spinner size={48} className={styles.spinner} />
                        </div>
                    ) : (
                        <p>Nenhuma empresa encontrada.</p>
                    )}
                </>
            )}
        </section>
    );
}

