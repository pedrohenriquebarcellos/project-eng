import styles from './registerForm.module.css';
import * as zod from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCNPJData } from '../GetCNPJData';
import CNPJInput from './Fields/CNPJ';
import AddressInfo from './Fields/AddressFields';
import CompanyInfo from './Fields/CompanyFields';
import { api } from '@/lib/axios';
import { useEffect, useState } from 'react';
import { Spinner } from 'phosphor-react';
import BtnBack from '../BtnBack';

const registerFormSchema = zod.object({
    cnpj: zod.string().min(18, { message: 'CNPJ inválido' }),
    companyFantasyName: zod.string().min(1, { message: 'Informe o nome' }),
    companyAddressStreet: zod.string().min(1, { message: 'Informe o endereço' }),
    companyAddressDistrict: zod.string().min(1, { message: 'Informe o número do endereço' }),
    companyLegalName: zod.string().min(1, { message: 'Informe o nome fantasia' }),

    companyType: zod.string().max(1, { message: 'Informe o tipo' }),
    companyCep: zod.string().min(8, { message: 'Informe o CEP' }),
    companyState: zod.string().min(1, { message: 'Informe o estado' }),
    companyCityCode: zod.string().min(1, { message: 'Informe o código da cidade' }),
    companyCity: zod.string().min(1, { message: 'Informe a cidade' }),
    companyRegion: zod.string().min(0),
    companyCountryDescription: zod.string().min(0, { message: 'Informe o país' }),
    companyCountryId: zod.string().min(0, { message: 'Informe o código do país' }),
    companyPhoneCode: zod.string().min(1, { message: 'Informe o código do telefone' }),
    companyPhone: zod.string().min(1, { message: 'Informe o telefone' }),
    companyBirthDate: zod.string().min(1, { message: 'Informe a data de abertura' }),
    companyHomePage: zod.string().min(0),
})

interface NewRegisterFormInputs {
    cnpj: string;
    companyFantasyName: string;
    companyAddressStreet: string;
    companyAddressDistrict: string;
    companyLegalName: string;
    companyType: string;
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
}

type RegisterFormInputs = zod.infer<typeof registerFormSchema>;

export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [savedData, setSavedData] = useState<NewRegisterFormInputs | null>(null);

    useEffect(() => {

    }, []);

    const {
        setError,
        clearErrors,
        setValue,
        register,
        reset,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<RegisterFormInputs>({
        shouldFocusError: false,
        resolver: zodResolver(registerFormSchema)
    });

    function mapCNPJDataToForm(data: any, setValue: any) {
        console.log('CNPJ data:', data);
        setValue('companyLegalName', data?.razao_social ?? '');
        setValue('companyAddressStreet',
            [
                data?.estabelecimento?.tipo_logradouro,
                data?.estabelecimento?.logradouro,
                data?.estabelecimento?.numero
            ]
                .filter(Boolean)
                .join(' ')
                .trim()
        )
        setValue('companyAddressDistrict', data?.estabelecimento?.bairro ?? '');
        setValue('companyFantasyName', data?.estabelecimento?.nome_fantasia ?? '');
        setValue('companyType', data?.estabelecimento?.tipo?.toLowerCase() ?? '');
        setValue('companyCep', String(data?.estabelecimento?.cep ?? ''));
        setValue('companyState', data?.estabelecimento?.estado?.nome ?? '');
        setValue('companyCityCode', String(data?.estabelecimento?.cidade?.ibge_id ?? ''));
        setValue('companyCity', data?.estabelecimento?.cidade?.nome ?? '');
        setValue('companyCountryDescription', data?.estabelecimento?.pais?.nome ?? '');
        setValue('companyCountryId', data?.estabelecimento?.pais?.id ?? '');
        setValue('companyPhoneCode', data?.estabelecimento?.ddd1 ?? '');
        setValue('companyPhone', data?.estabelecimento?.telefone1 ?? '');
        setValue('companyBirthDate', data?.estabelecimento?.data_inicio_atividade ?? '');
    }

    const handleCNPJChange = async (cnpj: string) => {
        if (!cnpj) return;

        setIsLoading(true);

        const cleanedCNPJ = cnpj.replace(/\D/g, '');
        const data = await getCNPJData(cleanedCNPJ);

        try {
            if (data?.error) {
                setError('cnpj', {
                    type: 'manual',
                    message: data.error
                })

                setIsLoading(false);
                return;
            }

            clearErrors('cnpj');
            mapCNPJDataToForm(data, setValue);

            setIsLoading(false);
        } catch (error) {
            console.error('Error setting CNPJ data:', error);

            setError('cnpj', {
                type: 'manual',
                message: 'Erro ao buscar dados do CNPJ'
            })
            reset();
        }

        setIsLoading(false);
    }

    async function generateSequentialId() {
        const response = await api.get('/companies');
        const companies = response.data;

        const ids = companies.map((c: any) => c.id);
        const maxId = ids.length > 0 ? Math.max(...ids) : 0;

        return maxId + 1;
    }

    async function checkStoreId(cnpj: string) {
        const response = await api.get('/companies');
        const companies = response.data;

        const firstEightNumbersOfCnpj = cnpj.substring(0,8);
        console.log(firstEightNumbersOfCnpj)
        const existingCompanies = companies.filter((company: any) =>
            company.cnpj.substring(0, 8) === firstEightNumbersOfCnpj
        );

        return existingCompanies.length === 0 ? 1 : existingCompanies.length + 1;
    }

    async function handleCreateNewRegister(data: NewRegisterFormInputs) {
        setIsLoading(true);

        const cleanedCNPJ = data.cnpj.replace(/\D/g, '');
        const newId = await generateSequentialId();

        const companies = await api.get(`/companies`);
        const existingCompany = companies.data.find((company: any) => company.cnpj === cleanedCNPJ);

        if (existingCompany) {
            setError('cnpj', {
                type: 'manual',
                message: 'CNPJ já cadastrado'
            })
            setIsLoading(false);
            return;
        }

        const idStore = await checkStoreId(cleanedCNPJ)

        const response = await api.post('/companies', {
            id: newId,
            cnpj: cleanedCNPJ,
            companyStoreIdNumber: idStore,
            companyAddressStreet: data.companyAddressStreet,
            companyAddressDistrict: data.companyAddressDistrict,
            companyFantasyName: data.companyFantasyName,
            companyLegalName: data.companyLegalName,
            companyType: data.companyType,
            companyCep: data.companyCep,
            companyState: data.companyState,
            companyCityCode: data.companyCityCode,
            companyCity: data.companyCity,
            companyRegion: data.companyRegion,
            companyCountryDescription: data.companyCountryDescription,
            companyCountryId: data.companyCountryId,
            companyPhoneCode: data.companyPhoneCode,
            companyPhone: data.companyPhone,
            companyBirthDate: data.companyBirthDate,
            companyHomePage: data.companyHomePage,
            isActive: true
        })

        await new Promise((resolve) => setTimeout(resolve, 3000))

        setSavedData(data);
        reset();
        setIsLoading(false);
        setIsSuccess(true);
    };

    return (
        <>
            {!isSuccess && (
                <form autoComplete="off" className={styles.registerFormContainer} onSubmit={handleSubmit(handleCreateNewRegister)}>
                    {isLoading && (
                        <div className={styles.overlay}>
                            <Spinner size={48} className={styles.spinner} />
                        </div>
                    )}
                    <fieldset>
                        <legend>Informações da Empresa</legend>
                        <CNPJInput
                            control={control}
                            setError={setError}
                            clearErrors={clearErrors}
                            handleCNPJChange={handleCNPJChange}
                            errors={errors}
                        />
                        <AddressInfo register={register} errors={errors} />
                    </fieldset>

                    <fieldset>
                        <legend>Endereço da Empresa</legend>
                        <CompanyInfo
                            register={register}
                            control={control}
                            errors={errors}
                        />
                    </fieldset>
                    <div className={styles.actionsContainer}>
                        <button type="submit">Cadastrar</button>
                        <button type="reset" onClick={() => reset()}>Limpar</button>
                    </div>
                </form>
            )}
            {isSuccess && savedData && (
                <>
                    <div>
                        <div className={styles.successMessage}>
                            <h2>Cadastro realizado com sucesso!</h2>
                            <p>Os dados da empresa foram registrados com sucesso.</p>
                        </div>
                        
                        <div className={styles.successDataContainer}>
                            <div className={styles.dataItem}>
                                <span>Nome da Empresa:</span>
                                <span>{savedData.companyLegalName}</span>
                            </div>
                            <div className={styles.dataItem}>
                                <span>CNPJ:</span>
                                <span>{savedData.cnpj}</span>
                            </div>
                            <div className={styles.dataItem}>
                                <span>Endereço:</span>
                                <span>{savedData.companyAddressStreet}, {savedData.companyAddressDistrict}</span>
                            </div>
                            <div className={styles.dataItem}>
                                <span>Telefone:</span>
                                <span>{savedData.companyPhone}</span>
                            </div>
                            <div className={styles.dataItem}>
                                <span>Cidade:</span>
                                <span>{savedData.companyCity}</span>
                            </div>
                            <div className={styles.dataItem}>
                                <span>Estado:</span>
                                <span>{savedData.companyState}</span>
                            </div>
                        </div>
                    </div>
                    <BtnBack href="/dashboard" />
                </>
            )}
        </>
    )
}