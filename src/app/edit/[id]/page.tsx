export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { api } from "@/lib/axios";
import { Company } from "@/app/components/GetCompanies";
import CompanyForm from "@/app/components/CompanyForm";

export default async function CompanyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log("ID da empresa:", id);

    try {
        const response = await api.get(`/companies/${id}`);
        const company: Company = response.data;

        return <CompanyForm company={company} />;
    } catch (error) {
        console.error("Erro ao buscar empresa:", error);
        return notFound();
    }
}