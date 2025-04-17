'use client'

import * as zod from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchFormContainer, ErrorMessage } from "./styles"
import { api } from '@/lib/axios';
import { useRouter } from 'next/navigation'
import { useState } from 'react';

interface User {
    id: number,
    userName: string,
    password: string,
}

const loginFormSchema = zod.object({
    userName: zod.string().min(1, {message: 'Informe o usuário'}),
    password: zod.string().min(5, { message: 'Quantidade de caracteres mínima: 5'})
})

type LoginFormInputs = zod.infer<typeof loginFormSchema>;

export default function LoginForm() {
    const router = useRouter()
    const [loginError, setLoginError] = useState('')
    const { 
        register, 
        handleSubmit, 
        watch,
        reset,
        formState: { errors } 
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginFormSchema),
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: {
            userName: '',
            password: '',
        }
    })

    const taskUsername = watch('userName')
    const taskPassword = watch('password')

    const isSubmitDisabled = !taskUsername && !taskPassword

    async function handleLogin(data: LoginFormInputs) {
        try {
            setLoginError('')

            const response = await api.get<User[]>('/users', {
                params: {
                    userName: data.userName,
                }
            })

            const user = response.data.find(
                (user) => user.userName === data.userName && user.password === data.password
            )

            if (user) {
                router.push('/dashboard')
            } else {
                setLoginError('Usuário ou senha inválidos')
                reset()
            }

        } catch (error: any) {
            console.error('Erro no login: ', error)
            reset()
        }
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleLogin)}>
            <legend>Login</legend>
            <input 
                type="text"
                placeholder='Insira seu usuário'
                {...register('userName')}
            />
            
            <ErrorMessage>{
                errors.userName?.message && (
                    errors.userName.message
                )}
            </ErrorMessage>            

            <input 
                type="password"
                placeholder='Senha'
                {...register('password')}
            />

            <ErrorMessage>{
                errors.password?.message && (
                    errors.password.message
                )}
            </ErrorMessage>   

            {loginError && 
                <ErrorMessage style={{color: 'red'}}>
                    {loginError}
                </ErrorMessage>
            }

            <button type='submit' disabled={isSubmitDisabled}>
                Login
            </button>
        </SearchFormContainer>
    )
}