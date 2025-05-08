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

    return <CompanyForm company={company} />;
}
