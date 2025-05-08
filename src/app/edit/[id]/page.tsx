'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';  // Use o useParams do Next.js
import { api } from '@/lib/axios';
import { Company } from '@/app/components/GetCompanies';

export default function CompanyDetailsPage() {
    const { id } = useParams();  // UseParams devolve um objeto com os parâmetros da URL
    const [company, setCompany] = useState<Company | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!id) {
            return;  // Caso o id não seja encontrado, não faz a requisição
        }

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
    if (!company) return <div>Carregando...</div>;  // Enquanto a empresa não é carregada

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
    );
}
