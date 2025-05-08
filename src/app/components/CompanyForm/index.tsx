"use client";

import { useForm } from "react-hook-form";
import { api } from "@/lib/axios";
import { Company } from "@/app/components/GetCompanies";
import styles from "./editCompany.module.css";
import { Spinner } from "phosphor-react";
import { useState } from "react";
import BtnBack from "../BtnBack";

type Props = {
    company: Company;
};

type CompanyFormData = Omit<Company, "isActive"> & {
    isActive: string;
};

export default function CompanyForm({ company }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CompanyFormData>({
        defaultValues: {
            ...company,
            isActive: String(company.isActive),
        },
    });

    const onSubmit = async (data: CompanyFormData) => {
        setIsLoading(true);
        console.log("Dados do formulário:", data);

        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
            const payload = {
                ...data,
                isActive: data.isActive === "true",
            }

            const response = await api.put(`/companies/${company.id}`, payload);
            setSuccess(true);
        } catch (error) {
            console.error("Erro ao atualizar empresa:", error);
            setSuccess(false);
        } finally {
            setIsLoading(false);
        }        
    };

    return (
        <div className={styles.pageWrapper}> 
            <BtnBack href="/list" />
            <form onSubmit={handleSubmit(onSubmit)}>
                {success && (
                    <div className={styles.successMessage}>
                        Empresa atualizada com sucesso!
                    </div>
                )}
                {isLoading && (
                    <div className={styles.overlay}>
                        <Spinner size={48} className={styles.spinner} />
                    </div>
                )}
                <fieldset className={styles.registerFormContainer}>
                    <legend>Informações da Empresa</legend>

                    <div className={styles.groupFields}>
                        <div className={styles.fieldsWrapper}>
                            <label htmlFor="id">ID</label>
                            <input type="text" readOnly {...register('id')} />
                        </div>
                        <div className={styles.fieldsWrapper}>
                            <label htmlFor="companyStoreIdNumber">ID Loja</label>
                            <input type="text" readOnly {...register('companyStoreIdNumber')} />
                        </div>
                    </div>

                    <div className={styles.groupFields}>
                        <div className={styles.fieldsWrapper}>
                            <label htmlFor="cnpj">CNPJ</label>
                            <input type="text" readOnly {...register('cnpj')} />
                        </div>
                        <div className={styles.fieldsWrapper}>
                            <label htmlFor="companyLegalName">Razão Social</label>
                            <input type="text" readOnly {...register('companyLegalName')} />
                        </div>
                    </div>

                    <div className={styles.groupFields}>
                        <div className={styles.fieldsWrapperFlex2}>
                            <label htmlFor="companyFantasyName" className={styles.required}>Nome Fantasia</label>
                            <input
                                type="text"
                                placeholder="Nome Fantasia"
                                {...register('companyFantasyName')}
                            />
                            <span className={styles.errorMessage}>
                                {errors.companyFantasyName?.message}
                            </span>
                        </div>
                        <div className={styles.fieldsWrapper}>
                            <label htmlFor="companyType" className={styles.required}>Tipo da Empresa</label>
                            <select {...register('companyType')}>
                                <option value="">Selecione o tipo</option>
                                <option value="f">Cons. Final</option>
                                <option value="l">Produtor Rural</option>
                                <option value="r">Revendedor</option>
                                <option value="s">Solidário</option>
                                <option value="x">Exportação</option>
                            </select>
                            <span className={styles.errorMessage}>
                                {errors.companyType?.message}
                            </span>
                        </div>
                    </div>

                    <div className={styles.groupFields}>
                        <div className={styles.fieldsWrapperFlex3}>
                            <label htmlFor="companyAddressStreet" className={styles.required}>Endereço</label>
                            <input type="text" placeholder="Rua..." {...register('companyAddressStreet')} />
                            <span className={styles.errorMessage}>
                                {errors.companyAddressStreet?.message}
                            </span>
                        </div>
                        <div className={styles.fieldsWrapper}>
                            <label htmlFor="companyAddressDistrict" className={styles.required}>Bairro</label>
                            <input type="text" placeholder="Bairro..." {...register('companyAddressDistrict')} />
                            <span className={styles.errorMessage}>
                                {errors.companyAddressDistrict?.message}
                            </span>
                        </div>
                    </div>

                    <div className={styles.groupFields}>
                        <div className={styles.fieldsWrapper}>
                            <label htmlFor="companyCep">CEP</label>
                            <input type="text" {...register('companyCep')} />
                        </div>
                        <div className={styles.fieldsWrapper}>
                            <label htmlFor="companyState">Estado</label>
                            <input type="text" {...register('companyState')} />
                        </div>
                        <div className={styles.fieldsWrapper}>
                            <label htmlFor="companyCity">Cidade</label>
                            <input type="text" {...register('companyCity')} />
                        </div>
                    </div>

                    <div className={styles.groupFields}>
                        <div className={styles.fieldsWrapper}>
                            <label htmlFor="companyRegion">Região</label>
                            <input type="text" {...register('companyRegion')} />
                        </div>
                        <div className={styles.fieldsWrapper}>
                            <label htmlFor="companyCountryDescription">País</label>
                            <input type="text" {...register('companyCountryDescription')} />
                        </div>
                    </div>

                    <div className={styles.groupFields}>
                        <div className={styles.fieldsWrapper}>
                            <label htmlFor="companyPhoneCode">DDD</label>
                            <input type="text" {...register('companyPhoneCode')} />
                        </div>
                        <div className={styles.fieldsWrapperFlex2}>
                            <label htmlFor="companyPhone">Telefone</label>
                            <input type="text" {...register('companyPhone')} />
                        </div>
                    </div>

                    <div className={styles.groupFields}>
                        <div className={styles.fieldsWrapper}>
                            <label htmlFor="companyBirthDate">Data de Fundação</label>
                            <input type="date" {...register('companyBirthDate')} />
                        </div>
                        <div className={styles.fieldsWrapper}>
                            <label htmlFor="companyHomePage">Página da Empresa</label>
                            <input type="text" placeholder="https://" {...register('companyHomePage')} />
                        </div>
                        <div className={styles.fieldsWrapper}>
                            <label htmlFor="isActive" className={styles.required}>Status</label>
                            <select {...register('isActive')}>
                                <option value="true">Ativa</option>
                                <option value="false">Inativa</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.actionsContainer}>
                        <button type="submit">Atualizar</button>
                    </div>
                </fieldset>
            </form>
        </div>        
    );
}
