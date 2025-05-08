'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/axios';
import CompanyForm from '@/app/components/CompanyForm';
import { Company } from '@/app/components/GetCompanies';

export default function CompanyDetailsPage() {
    const params = useParams();
    const id = params.id as string;

    const [company, setCompany] = useState<Company | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchCompany() {
            try {
                const response = await api.get(`/companies/${id}`);
                setCompany(response.data);
            } catch (e) {
                console.error('Erro ao buscar empresa:', e);
                setError(true);
            }
        }

        fetchCompany();
    }, [id]);

    if (error) return <div>Empresa não encontrada</div>;
    if (!company) return <div></div>;

    return (
        <div>
            <h1>Detalhes da Empresa</h1>
            <p>ID: {company.id}</p>
            <p>CNPJ: {company.cnpj}</p>
            <p>Nome Fantasia: {company.companyFantasyName}</p>
            <p>Razão Social: {company.companyLegalName}</p>
            <p>Endereço: {company.companyAddressStreet}</p>
            <p>Bairro: {company.companyAddressDistrict}</p>
            <p>Número da Loja: {company.companyStoreIdNumber}</p>
            <p>Tipo: {company.companyType}</p>
            <p>CEP: {company.companyCEP}</p>
            <p>Estado: {company.companyState}</p>
            <p>Cidade: {company.companyCity}</p>
            <p>Região: {company.companyRegion || 'Não informado'}</p>
            <p>País: {company.companyCountryDescription}</p>
            <p>Código do País: {company.companyCountryId}</p>
            <p>Telefone: ({company.companyPhoneCode}) {company.companyPhone}</p>
            <p>Data de Abertura: {company.companyBirthDate || 'Não informado'}</p>
            <p>Site: {company.companyHomePage || 'Não informado'}</p>
        </div>
    )

    return <CompanyForm company={company} />;
}
