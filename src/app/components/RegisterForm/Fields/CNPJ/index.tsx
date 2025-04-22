import styles from "./cnpj.module.css";
import { Controller, FieldValues, UseFormSetError, UseFormClearErrors } from "react-hook-form";
import { IMaskInput } from "react-imask";

interface CNPJInputProps {
    control: any;
    setError: UseFormSetError<any>;
    clearErrors: UseFormClearErrors<any>;
    handleCNPJChange: (cnpj: string) => void;
    errors: { cnpj?: { message?: string } };
}

export default function CNPJInput({ control, setError, clearErrors, handleCNPJChange, errors }: CNPJInputProps) {
    return (
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
                    inputRef={field.ref}
                    onAccept={(value) => field.onChange(value)}
                    onBlur={() => handleCNPJChange(field.value)}
                />
            )}
        />
        <span className={styles.errorMessage}>
            {errors.cnpj?.message && errors.cnpj.message}
        </span>
    </div>
    );
}