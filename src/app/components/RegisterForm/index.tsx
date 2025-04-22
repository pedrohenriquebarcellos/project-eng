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

const registerFormSchema = zod.object({
    cnpj: zod.string().min(18, { message: 'CNPJ inválido' }),
    companyName: zod.string().min(1, { message: 'Informe o nome da empresa' }),
    companyAddressStreet: zod.string().min(1, { message: 'Informe o endereço da empresa' }),
    companyAddressDistrict: zod.string().min(1, { message: 'Informe o número do endereço da empresa' }),
    companyLegalName: zod.string().min(1, { message: 'Informe o nome fantasia da empresa' }),

    companyType: zod.string().min(1, { message: 'Informe o tipo da empresa' }),
    companyCEP: zod.string().min(9, { message: 'Informe o CEP da empresa' }),
    companyState: zod.string().min(1, { message: 'Informe o estado da empresa' }),
    companyCityCode: zod.string().min(1, { message: 'Informe o código da cidade da empresa' }),
    companyCity: zod.string().min(1, { message: 'Informe a cidade da empresa' }),
    companyRegion: zod.string().min(0),
    companyCountry: zod.string().min(1, { message: 'Informe o país da empresa' }),
    companyPhoneCode: zod.string().min(1, { message: 'Informe o código do telefone da empresa' }),
    companyPhone: zod.string().min(1, { message: 'Informe o telefone da empresa' }),
    companyBirthDate: zod.string().min(1, { message: 'Informe a data de nascimento da empresa' }),
    companyHomePage: zod.string().min(0),
})

interface NewRegisterFormInputs {
    cnpj: string;
    companyName: string;
    companyAddressStreet: string;
    companyAddressDistrict: string;
    companyLegalName: string;
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

type RegisterFormInputs = zod.infer<typeof registerFormSchema>;

export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);

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
        setValue('companyName', data?.razao_social ?? '');
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
        setValue('companyLegalName', data?.estabelecimento?.nome_fantasia ?? '');
        setValue('companyType', data?.estabelecimento?.tipo?.toLowerCase() ?? '');
        setValue('companyCEP', String(data?.estabelecimento?.cep ?? ''));
        setValue('companyState', data?.estabelecimento?.estado?.nome ?? '');
        setValue('companyCityCode', String(data?.estabelecimento?.cidade?.ibge_id ?? ''));
        setValue('companyCity', data?.estabelecimento?.cidade?.nome ?? '');
        setValue('companyCountry', data?.estabelecimento?.pais?.nome ?? '');
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

    async function handleCreateNewRegister(data: NewRegisterFormInputs) {
        setIsLoading(true);

        const cleanedCNPJ = data.cnpj.replace(/\D/g, '');
        const newId = await generateSequentialId();

        const response = await api.post('/companies', {
            id: newId,
            cnpj: cleanedCNPJ,
            companyAddressStreet: data.companyAddressStreet,
            companyAddressDistrict: data.companyAddressDistrict,
            companyLegalName: data.companyLegalName,
            companyType: data.companyType,
            companyCEP: data.companyCEP,
            companyState: data.companyState,
            companyCityCode: data.companyCityCode,
            companyCity: data.companyCity,
            companyRegion: data.companyRegion,
            companyCountry: data.companyCountry,
            companyPhoneCode: data.companyPhoneCode,
            companyPhone: data.companyPhone,
            companyBirthDate: data.companyBirthDate,
            companyHomePage: data.companyHomePage,
        })

        reset();
        setIsLoading(false);
    };

    return (
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
    )
}