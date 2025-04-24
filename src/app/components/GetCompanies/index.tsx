import { api } from "@/lib/axios";

type CompanyType = "f" | "l" | "r" | "S" | "x";

export type Company = {
    id: number;
    cnpj: string;
    companyFantasyName: string;
    companyAddressStreet: string;
    companyAddressDistrict: string;
    companyLegalName: string;
    companyStoreIdNumber: number;
    companyType: CompanyType;
    companyCEP: string;
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
}

export default async function getCompanies() {
    const response = await api.get<Company[]>('/companies');
    return response.data;
}