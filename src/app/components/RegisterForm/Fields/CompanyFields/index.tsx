import styles from "./companyForm.module.css";
import { Controller, FieldErrors } from "react-hook-form";
import { IMaskInput } from "react-imask";

interface FormValues {
    companyCep?: string;
    companyState?: string;
    companyCityCode?: string;
    companyCity?: string;
    companyRegion?: string;
    companyCountryDescription?: string;
    companyCountryId?: string;
    companyPhoneCode?: string;
    companyPhone?: string;
    companyBirthDate?: string;
    companyHomePage?: string;
}

interface CompanyInfoProps {
    control: any;
    register: any;
    errors: FieldErrors<FormValues>;
}

export default function CompanyInfo({ register, control, errors }: CompanyInfoProps) {
    return (
        <>
            <div className={styles.groupFields}>
                <div className={styles.fieldsWrapper2}>
                    <label htmlFor="companyCep" className={styles.required}>CEP da Empresa</label>
                    <Controller 
                        name="companyCep"
                        control={control}
                        render={({ field }) => (
                            <IMaskInput
                                {...field}
                                mask="00000-000"
                                placeholder="CEP"
                                inputRef={field.ref}
                                onAccept={(value) => field.onChange(value)}
                            />
                        )}
                    />
                    <span className={styles.errorMessage}>
                        {errors.companyCep?.message && (
                            errors.companyCep.message
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
                    <label htmlFor="companyCountryDescription">País</label>
                    <input
                        type="text"
                        placeholder="País"      
                        {...register('companyCountryDescription')}
                    />
                </div>
                <div className={styles.fieldsWrapper}>
                    <label htmlFor="companyCountryId">Código do País</label>
                    <input
                        type="text"
                        placeholder="Código do País"      
                        {...register('companyCountryId')}
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
                                inputRef={field.ref}
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
        </>
    )
}