"use client"

import { ActionsContainer, ErrorMessage, FieldsWrapper, GroupFields, RegisterFormContainer } from "./styles";
import * as zod from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
        formState: { errors } 
    } = useForm<RegisterFormInputs>({
        resolver: zodResolver(registerFormSchema)
    });
    return (
        <RegisterFormContainer onSubmit={handleSubmit((data) => {
            console.log(data);
            reset();
        })}>            
            <fieldset>    
                <legend>Informações da Empresa</legend>            
                <GroupFields>
                    <label htmlFor="cnpj" className="required">CNPJ</label>
                    <input 
                        type="text" 
                        placeholder="CNPJ" 
                        {...register('cnpj')}
                        className={'required'}
                    />
                   <ErrorMessage>
                    {errors.cnpj?.message && (
                        errors.cnpj.message
                    )}
                    </ErrorMessage>
                </GroupFields>
                <GroupFields>
                    <label htmlFor="companyName" className="required">Nome da Empresa</label>
                    <input 
                        type="text" 
                        placeholder="Nome da Empresa" 
                        {...register('companyName')}
                        className={'required'}
                    />
                    <ErrorMessage>
                        {errors.companyName?.message && (
                            errors.companyName.message
                        )}
                    </ErrorMessage>
                </GroupFields>
                <GroupFields>
                    <FieldsWrapper flex="2">
                        <label htmlFor="companyAddressStreet" className="required">Endereço da Empresa</label>
                        <input 
                            type="text" 
                            placeholder="Endereço" 
                            {...register('companyAddressStreet')}
                            className={'required'}
                        />
                        <ErrorMessage>
                            {errors.companyAddressStreet?.message && (
                                errors.companyAddressStreet.message
                            )}
                        </ErrorMessage>                        
                    </FieldsWrapper>
                    <FieldsWrapper flex="1">
                        <label htmlFor="companyAddressDistrict" className="required">Número do Endereço</label>
                        <input 
                            type="text" 
                            placeholder="Número do Endereço" 
                            {...register('companyAddressDistrict')}
                            className={'required'}
                        />
                        <ErrorMessage>
                            {errors.companyAddressDistrict?.message && (
                                errors.companyAddressDistrict.message
                            )}
                        </ErrorMessage>
                    </FieldsWrapper>                    
                </GroupFields>
                <GroupFields>
                    <FieldsWrapper flex="2">
                        <label htmlFor="companyLegalName" className="required">Nome Fantasia da Empresa</label>
                        <input 
                            type="text" 
                            placeholder="Nome Fantasia" 
                            {...register('companyLegalName')}
                            className={'required'}
                        />
                        <ErrorMessage>
                            {errors.companyLegalName?.message && (
                                errors.companyLegalName.message
                            )}
                        </ErrorMessage>
                    </FieldsWrapper>                        
                    <FieldsWrapper flex="1">
                        <label htmlFor="companyType" className="required">Tipo da Empresa</label>
                        <select {...register('companyType')} className={'required'}>
                            <option value="matriz">Matriz</option>
                            <option value="filial">Filial</option>
                        </select>
                        <ErrorMessage>
                            {errors.companyType?.message && (
                                errors.companyType.message
                            )}
                        </ErrorMessage>
                    </FieldsWrapper>
                </GroupFields>
            </fieldset>

            <fieldset>
                <legend>Endereço da Empresa</legend>
                <GroupFields>
                    <FieldsWrapper flex="2">
                        <label htmlFor="companyCEP" className="required">CEP da Empresa</label>
                        <input 
                            type="text" 
                            placeholder="CEP" 
                            {...register('companyCEP')}
                            className={'required'}
                        />
                        <ErrorMessage>
                            {errors.companyCEP?.message && (
                                errors.companyCEP.message
                            )}
                        </ErrorMessage>
                    </FieldsWrapper>
                    <FieldsWrapper flex="1">
                        <label htmlFor="companyState" className="required">Estado da Empresa</label>
                        <input
                            type="text"
                            placeholder="Estado"
                            {...register('companyState')}
                            className={'required'}
                        />
                        <ErrorMessage>
                            {errors.companyState?.message && (
                                errors.companyState.message
                            )}
                        </ErrorMessage>
                    </FieldsWrapper>
                    <FieldsWrapper flex="1">
                        <label htmlFor="companyCityCode" className="required">Código da Cidade</label>
                        <input 
                            type="text" 
                            placeholder="Código da Cidade" 
                            {...register('companyCityCode')}
                            className={'required'}
                        />
                        <ErrorMessage>
                            {errors.companyCityCode?.message && (
                                errors.companyCityCode.message
                            )}
                        </ErrorMessage>
                    </FieldsWrapper>
                </GroupFields>
                <GroupFields>
                    <FieldsWrapper flex="2">
                        <label htmlFor="companyCity" className="required">Cidade da Empresa</label>
                        <input 
                            type="text" 
                            placeholder="Cidade" 
                            {...register('companyCity')}
                            className={'required'}
                        />
                        <ErrorMessage>
                            {errors.companyCity?.message && (
                                errors.companyCity.message
                            )}
                        </ErrorMessage>
                    </FieldsWrapper>
                    <FieldsWrapper flex="1">
                        <label htmlFor="companyRegion">Região da Empresa</label>
                        <input
                            type="text"
                            placeholder="Região"
                            {...register('companyRegion')}
                        />
                    </FieldsWrapper>
                    <FieldsWrapper flex="1">
                        <label htmlFor="companyCountry">País da Empresa</label>
                        <input
                            type="text"
                            placeholder="País"      
                            {...register('companyCountry')}
                        />
                    </FieldsWrapper>
                </GroupFields>
                <GroupFields>
                    <FieldsWrapper flex="1">
                        <label htmlFor="companyPhoneCode" className="required">Código do Telefone da Empresa</label>
                        <input                        
                            type="text"
                            placeholder="Código do Telefone"
                            {...register('companyPhoneCode')}
                            className={'required'}
                        />
                        {errors.companyPhoneCode && <ErrorMessage>{errors.companyPhoneCode.message}</ErrorMessage>}
                    </FieldsWrapper>
                    <FieldsWrapper flex="2">
                        <label htmlFor="companyPhone" className="required">Telefone da Empresa</label>
                        <input 
                            type="text" 
                            placeholder="Telefone" 
                            {...register('companyPhone')}
                            className={'required'}
                        />
                        {errors.companyPhone && <ErrorMessage>{errors.companyPhone.message}</ErrorMessage>}
                    </FieldsWrapper>
                </GroupFields>
                <GroupFields>
                    <label htmlFor="companyBirthDate">Data de Nascimento da Empresa</label>
                    <input 
                        type="text" 
                        placeholder="Data de Nascimento" 
                        {...register('companyBirthDate')}
                    />
                </GroupFields>
                <GroupFields>
                    <label htmlFor="companyHomePage">Site da Empresa</label>
                    <input
                        type="text"
                        placeholder="Site"
                        {...register('companyHomePage')}
                    />
                </GroupFields>
            </fieldset>
            <ActionsContainer>
                <button type="submit">Cadastrar</button>
                <button type="reset" onClick={() => reset()}>Limpar</button>
            </ActionsContainer>
        </RegisterFormContainer>
    )
}