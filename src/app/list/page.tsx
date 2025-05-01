"use client";

import { useEffect, useState } from "react";
import getCompanies, { Company } from "@/app/components/GetCompanies";
import styles from './listCompanies.module.css';
import { Spinner } from "phosphor-react";
import CompanyModal from "../components/ModalCompany";
import Paginator from "../components/Paginator";
import BtnBack from "../components/BtnBack";

export default function ListPage() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [inputPage, setInputPage] = useState<string>('...');
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const companiesPerPage = 10;

    useEffect(() => {
        const fetchCompanies = async () => {
            const data = await getCompanies();
            setCompanies(data);
            setFilteredCompanies(data);
            setIsLoading(false);
        };
        fetchCompanies();
    }, []);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
        if (query === '') {
            setFilteredCompanies(companies);
        } else {
            const lowerQuery = query.toLowerCase();
            const filtered = companies.filter((company) => 
                company.cnpj.toLowerCase().includes(lowerQuery) ||
                company.companyLegalName.toLowerCase().includes(lowerQuery) ||
                company.companyCity.toLowerCase().includes(lowerQuery)
            );
            setFilteredCompanies(filtered);
        }
    };

    const indexOfLastCompany = currentPage * companiesPerPage;
    const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
    const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);

    const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            setIsInputVisible(false);
            setInputPage(String(page));
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleDotsClick = () => {
        setIsInputVisible(true);
        setInputPage('');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || /^[0-9]*$/.test(value)) {
            setInputPage(value);
        }
    };

    const handleInputSubmit = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            const page = parseInt(inputPage, 10);
            goToPage(page);
        }
    };

    return (
        <section className={styles.wrapper}>
            <input
                type="text"
                placeholder="Pesquisar por CNPJ, Fantasia ou Cidade"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className={styles.searchInput}
            />
            
            {filteredCompanies.length > 0 ? (
                <>
                    <ul className={styles.rowHeader}>
                        <li>ID</li>
                        <li>Loja:</li>
                        <li>CNPJ</li>
                        <li>Nome</li>
                        <li>Cidade</li>
                        <li>Ativo</li>
                    </ul>

                    {currentCompanies.map((company) => (
                        <ul
                            key={company.id}
                            className={styles.row}
                            onClick={() => setSelectedCompany(company)}
                            style={{ cursor: 'pointer' }}
                        >
                            <li className={styles.cell} data-label="ID">{company.id}</li>
                            <li className={styles.cell} data-label="Nº Loja">{company.companyStoreIdNumber}</li>
                            <li className={styles.cell} data-label="CNPJ">{company.cnpj}</li>
                            <li className={styles.cell} data-label="Nome">{company.companyFantasyName}</li>
                            <li className={styles.cell} data-label="Cidade">{company.companyCity}</li>
                            <li className={styles.cell} data-label="Ativo">
                                {company.isActive ? 'Ativa' : 'Inativa'}
                            </li>
                        </ul>
                    ))}

                    {selectedCompany && (
                        <CompanyModal company={selectedCompany} onClose={() => setSelectedCompany(null)} />
                    )}

                    <Paginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        goToPage={goToPage}
                        goToNextPage={goToNextPage}
                        goToPreviousPage={goToPreviousPage}
                        isInputVisible={isInputVisible}
                        inputPage={inputPage}
                        setInputPage={setInputPage}
                        handleInputChange={handleInputChange}
                        handleInputSubmit={handleInputSubmit}
                        handleDotsClick={handleDotsClick}
                    />
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
            <BtnBack href="/dashboard" />
        </section>
    );
}
