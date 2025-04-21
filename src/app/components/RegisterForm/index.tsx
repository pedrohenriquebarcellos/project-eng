"use client"

import styles from './registerForm.module.css';
import * as zod from 'zod';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IMaskInput } from 'react-imask';
import { getCNPJData } from '../GetCNPJData';

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
    companyRegion: zod.string().min(1, { message: 'Informe a região da empresa' }),
    companyCountry: zod.string().min(1, { message: 'Informe o país da empresa' }),
    companyPhoneCode: zod.string().min(1, { message: 'Informe o código do telefone da empresa' }),
    companyPhone: zod.string().min(1, { message: 'Informe o telefone da empresa' }),
    companyBirthDate: zod.string().min(1, { message: 'Informe a data de nascimento da empresa' }),
    companyHomePage: zod.string().min(1, { message: 'Informe o site da empresa' }),
})

type RegisterFormInputs = zod.infer<typeof registerFormSchema>;

export default function RegisterForm() {
    const { 
        register,
        reset, 
        handleSubmit,
        control,
        formState: { errors } 
    } = useForm<RegisterFormInputs>({
        resolver: zodResolver(registerFormSchema)
    });

    const handleCNPJChange = async (cnpj: string) => {
        const cleanedCNPJ = cnpj.replace(/\D/g, '');
        console.log('cleanedCNPJ -> ', cleanedCNPJ)
        const data = await getCNPJData(cleanedCNPJ);
        console.log('data from cnpj -> ', data)
    }

    return (
        <form autoComplete="off" className={styles.registerFormContainer} onSubmit={handleSubmit((data) => {
            console.log(data);
            reset();
        })}>             
            <fieldset>    
                <legend>Informações da Empresa</legend>            
                <div className={styles.groupFields}>
                    <label htmlFor="cnpj" className={styles.required}>CNPJ</label>
                    <Controller
                        name="cnpj"
                        control={control}
                        render={({ field }) => (
                            <IMaskInput
                                {...field}
                                mask="00.000.000/0000-00"
                                placeholder="CNPJ"
                                onAccept={(value) => field.onChange(value)}
                                onBlur={() => handleCNPJChange(field.value)}
                            />
                        )}
                    />
                   <span className={styles.errorMessage}>
                    {errors.cnpj?.message && (
                        errors.cnpj.message
                    )}
                    </span>
                </div>
                <div className={styles.groupFields}>
                    <label htmlFor="companyName" className={styles.required}>Nome da Empresa</label>
                    <input 
                        type="text" 
                        placeholder="Nome da Empresa" 
                        {...register('companyName')}
                    />
                    <span className={styles.errorMessage}>
                        {errors.companyName?.message && (
                            errors.companyName.message
                        )}
                    </span>
                </div>
                <div className={styles.groupFields}>
                    <div className={styles.fieldsWrapper}>
                        <label htmlFor="companyAddressStreet" className={styles.required}>Endereço da Empresa</label>
                        <input 
                            type="text" 
                            placeholder="Endereço" 
                            {...register('companyAddressStreet')}
                        />
                        <span className={styles.errorMessage}>
                            {errors.companyAddressStreet?.message && (
                                errors.companyAddressStreet.message
                            )}
                        </span>                        
                    </div>
                    <div className={styles.fieldsWrapper2}>
                        <label htmlFor="companyAddressDistrict" className={styles.required}>Número do Endereço</label>
                        <input 
                            type="text" 
                            placeholder="Número do Endereço" 
                            {...register('companyAddressDistrict')}
                        />
                        <span className={styles.errorMessage}>
                            {errors.companyAddressDistrict?.message && (
                                errors.companyAddressDistrict.message
                            )}
                        </span>
                    </div>                    
                </div>                    
                <div className={styles.groupFields}>
                    <div className={styles.fieldsWrapper2}>
                        <label htmlFor="companyLegalName" className={styles.required}>Nome Fantasia da Empresa</label>
                        <input 
                            type="text" 
                            placeholder="Nome Fantasia" 
                            {...register('companyLegalName')}
                        />
                        <span className={styles.errorMessage}>
                            {errors.companyLegalName?.message && (
                                errors.companyLegalName.message
                            )}
                        </span>                        
                    </div>                        
                    <div className={styles.fieldsWrapper}>
                        <label htmlFor="companyType" className={styles.required}>Tipo da Empresa</label>
                        <select {...register('companyType')}>
                            <option value="matriz">Matriz</option>
                            <option value="filial">Filial</option>
                        </select>
                        <span className={styles.errorMessage}>
                            {errors.companyType?.message && (
                                errors.companyType.message
                            )}
                        </span>
                    </div>
                </div>
            </fieldset>

            <fieldset>
                <legend>Endereço da Empresa</legend>
                <div className={styles.groupFields}>
                    <div className={styles.fieldsWrapper2}>
                        <label htmlFor="companyCEP" className={styles.required}>CEP da Empresa</label>
                        <Controller 
                            name="companyCEP"
                            control={control}
                            render={({ field }) => (
                                <IMaskInput
                                    {...field}
                                    mask="00000-000"
                                    placeholder="CEP"
                                    onAccept={(value) => field.onChange(value)}
                                />
                            )}
                        />
                        <span className={styles.errorMessage}>
                            {errors.companyCEP?.message && (
                                errors.companyCEP.message
                            )}
                        </span>
                    </div>
                    <div className={styles.fieldsWrapper}>
                        <label htmlFor="companyState" className={styles.required}>Estado da Empresa</label>
                        <input
                            type="text"
                            placeholder="Estado"
                            {...register('companyState')}
                        />
                        <span className={styles.errorMessage}>
                            {errors.companyState?.message && (
                                errors.companyState.message
                            )}
                        </span>
                    </div>
                    <div className={styles.fieldsWrapper2}>
                        <label htmlFor="companyCityCode" className={styles.required}>Código da Cidade</label>
                        <input 
                            type="text" 
                            placeholder="Código da Cidade" 
                            {...register('companyCityCode')}
                        />
                        <span className={styles.errorMessage}>
                            {errors.companyCityCode?.message && (
                                errors.companyCityCode.message
                            )}
                        </span>
                    </div>
                </div>
                <div className={styles.groupFields}>
                    <div className={styles.fieldsWrapper2}>
                        <label htmlFor="companyCity" className={styles.required}>Cidade da Empresa</label>
                        <input 
                            type="text" 
                            placeholder="Cidade" 
                            {...register('companyCity')}
                        />
                        <span className={styles.errorMessage}>
                            {errors.companyCity?.message && (
                                errors.companyCity.message
                            )}
                        </span>
                    </div>
                    <div className={styles.fieldsWrapper}>
                        <label htmlFor="companyRegion">Região da Empresa</label>
                        <input
                            type="text"
                            placeholder="Região"
                            {...register('companyRegion')}
                        />
                    </div>
                    <div className={styles.fieldsWrapper}>
                        <label htmlFor="companyCountry">País da Empresa</label>
                        <input
                            type="text"
                            placeholder="País"      
                            {...register('companyCountry')}
                        />
                    </div>
                </div>
                <div className={styles.groupFields}>
                    <div className={styles.fieldsWrapper}>
                        <label htmlFor="companyPhoneCode" className={styles.required}>Código do Telefone da Empresa</label>
                        <input                        
                            type="text"
                            placeholder="Código do Telefone"
                            {...register('companyPhoneCode')}
                        />
                        <span className={styles.errorMessage}>
                            {errors.companyPhoneCode?.message && (
                                errors.companyPhoneCode.message
                            )}
                        </span>
                    </div>
                    <div className={styles.fieldsWrapper2}>
                        <label htmlFor="companyPhone" className={styles.required}>Telefone da Empresa</label>
                        <Controller 
                            name="companyPhone"
                            control={control}
                            render={({ field }) => (
                                <IMaskInput
                                    {...field}
                                    mask="00000-0000"
                                    placeholder="Telefone"
                                    onAccept={(value) => field.onChange(value)}
                                />
                            )}
                        />
                        <span className={styles.errorMessage}>
                            {errors.companyPhone?.message && (
                                errors.companyPhone.message
                            )}
                        </span>
                    </div>
                </div>
                <div className={styles.groupFields}>
                    <label htmlFor="companyBirthDate">Data de Nascimento da Empresa</label>
                    <input 
                        type="text" 
                        placeholder="Data de Nascimento" 
                        {...register('companyBirthDate')}
                    />
                </div>
                <div className={styles.groupFields}>
                    <label htmlFor="companyHomePage">Site da Empresa</label>
                    <input
                        type="text"
                        placeholder="Site"
                        {...register('companyHomePage')}
                    />
                </div>
            </fieldset>
            <div className={styles.actionsContainer}>
                <button type="submit">Cadastrar</button>
                <button type="reset" onClick={() => reset()}>Limpar</button>
            </div>
        </form>
    )
}