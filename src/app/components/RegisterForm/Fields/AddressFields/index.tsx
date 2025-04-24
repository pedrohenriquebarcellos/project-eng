import styles from "./addressForm.module.css";

interface AddressFieldsProps {
    register: any;
    errors: { 
        companyAddressStreet?: { message?: string }; 
        companyFantasyName?: { message?: string }; 
        companyLegalName?: { message?: string }; 
        companyType?: { message?: string }; 
        companyAddressDistrict?: { message?: string };
    };
}

export default function AddressInfo({ register, errors}: AddressFieldsProps) {
    return (
        <>
            <div className={styles.groupFields}>
                <label htmlFor="companyLegalName" className={styles.required}>Nome da Empresa</label>
                <input 
                    type="text" 
                    placeholder="Nome da Empresa" 
                    {...register('companyLegalName')}
                />
                <span className={styles.errorMessage}>
                    {errors.companyLegalName?.message && (
                        errors.companyLegalName.message
                    )}
                </span>
            </div>
            <div className={styles.groupFields}>
                <div className={styles.fieldsWrapper}>
                    <label htmlFor="companyAddressStreet" className={styles.required}>Endereço</label>
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
                    <label htmlFor="companyAddressDistrict" className={styles.required}>Bairro</label>
                    <input 
                        type="text" 
                        placeholder="Bairro" 
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
                    <label htmlFor="companyFantasyName" className={styles.required}>Nome Fantasia</label>
                    <input 
                        type="text" 
                        placeholder="Nome Fantasia" 
                        {...register('companyFantasyName')}
                    />
                    <span className={styles.errorMessage}>
                        {errors.companyFantasyName?.message && (
                            errors.companyFantasyName.message
                        )}
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
                        {errors.companyType?.message && (
                            errors.companyType.message
                        )}
                    </span>
                </div>
            </div>
        </>
    )
}