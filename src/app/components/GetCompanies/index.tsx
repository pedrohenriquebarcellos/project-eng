import { api } from "@/lib/axios";

export type Company = {
    id: number;
    cnpj: string;
    companyFantasyName: string;
    companyAddressStreet: string;
    companyAddressDistrict: string;
    companyLegalName: string;
    companyStoreIdNumber: number;
    companyType: string;
    companyCEP: string;
    companyState: string;
    companyCityCode: string;
    companyCity: string;
    companyRegion: string;
    companyCountry: string;
    companyPhoneCode: string;
    companyPhone: string;
    companyBirthDate: string;
    companyHomePage: string;
}

export default async function getCompanies() {
    const response = await api.get<Company[]>('/companies');
    return response.data;
}