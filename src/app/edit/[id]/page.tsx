export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { api } from "@/lib/axios";
import { Company } from "@/app/components/GetCompanies";
import CompanyForm from "@/app/components/CompanyForm";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        const response = await api.get(`/companies/${id}`);
        const company: Company = response.data;

        return <CompanyForm company={company} />;
    } catch (error: any) {
        console.error("Erro ao buscar empresa:", {
            message: error.message,
            code: error.code,
            status: error.response?.status,
            data: error.response?.data,
            headers: error.response?.headers,
        });
    }
}
