import { cnpjApi } from "@/lib/axios";

export async function getCNPJData(cnpj: string) {
    const fetchData = async () => {
        try {
            const response = await cnpjApi.get(`/cnpj/${cnpj}`);
            const data = response.data;
            console.log(data)
            return data;

        } catch (error) {

            console.error('Error fetching CNPJ data:', error);
            return null;
        }
    }

    return fetchData();
}
