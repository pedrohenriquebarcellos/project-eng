import { api } from "@/lib/axios";

type CompanyType = "f" | "l" | "r" | "s" | "x";

export type Company = {
    id: number;
    cnpj: string;
    companyFantasyName: string;
    companyAddressStreet: string;
    companyAddressDistrict: string;
    companyLegalName: string;
    companyStoreIdNumber: number;
    companyType: CompanyType;
    companyCep: string;
    companyState: string;
    companyCityCode: string;
    companyCity: string;
    companyRegion: string;
    companyCountryDescription: string;
    companyCountryId: string;
    companyPhoneCode: string;
    companyPhone: string;
    companyBirthDate: string;
    companyHomePage: string;
    isActive: boolean;
}

export default async function getCompanies() {
    const response = await api.get<Company[]>('/companies');
    return response.data;
}