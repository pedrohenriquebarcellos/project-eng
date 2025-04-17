'use client'

import * as zod from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchFormContainer, ErrorMessage, Spinner } from "./styles"
import { api } from '@/lib/axios';
import { useRouter } from 'next/navigation'
import { useState } from 'react';

interface User {
    id: number,
    userName: string,
    password: string,
}

const loginFormSchema = zod.object({
    userName: zod.string().min(1, { message: 'Informe o usuário' }),
    password: zod.string().min(5, { message: 'Quantidade de caracteres mínima: 5' })
})

type LoginFormInputs = zod.infer<typeof loginFormSchema>;

export default function LoginForm() {
    const router = useRouter()
    const [loginError, setLoginError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

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

    const isSubmitDisabled = (!taskUsername && !taskPassword) || isLoading

    async function handleLogin(data: LoginFormInputs) {
        try {
            setLoginError('')
            setIsLoading(true)

            const response = await api.get<User[]>('/users', {
                params: {
                    userName: data.userName,
                }
            })

            await new Promise((resolve) => setTimeout(resolve, 2000))

            const user = response.data.find(
                (user) => user.userName === data.userName && user.password === data.password
            )

            if (user) {                
                router.push('/dashboard')
                return
            } else {
                setIsLoading(false)
                setLoginError('Usuário ou senha inválidos')
                reset()
            }

        } catch (error: any) {
            console.error('Erro no login: ', error)
            setIsLoading(false)
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
                <ErrorMessage style={{ color: 'red' }}>
                    {loginError}
                </ErrorMessage>
            }
            <Spinner style={{ display: 'none'}}/>

            <button type='submit' disabled={isSubmitDisabled}>
            {isLoading ? <Spinner /> : 'Login'}
            </button>
        </SearchFormContainer>
    )
}