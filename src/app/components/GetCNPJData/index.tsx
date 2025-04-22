import { cnpjApi } from "@/lib/axios";

export async function getCNPJData(cnpj: string) {
    const fetchData = async () => {
        try {
            const response = await cnpjApi.get(`/cnpj/${cnpj}`);
            const data = response.data;
            return data;

        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                return { error: error.response.data.detalhes ?? 'CNPJ inválido'}
            }

            return { error: 'Erro ao buscar dados do CNPJ' };
        }
    }

    return fetchData();
}
