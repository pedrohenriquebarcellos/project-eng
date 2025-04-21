'use client'

import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './LoginForm.module.css'
import { api } from '@/lib/axios'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { UserContext } from '@/contexts/LoginContext'

interface User {
  id: number
  userName: string
  password: string
}

type ErrorLoginFormMessage = {
  message: string
}

const loginFormSchema = zod.object({
  userName: zod.string().min(1, { message: 'Informe o usuário' }),
  password: zod.string().min(5, { message: 'Quantidade de caracteres mínima: 5' }),
})

type LoginFormInputs = zod.infer<typeof loginFormSchema>

export default function LoginForm() {
  const { handleGetInitialsFromName } = useContext(UserContext)
  const router = useRouter()
  const [loginError, setLoginError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      userName: '',
      password: '',
    },
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
        },
      })

      await new Promise((resolve) => setTimeout(resolve, 2000))

      const user = response.data.find(
        (user) => user.userName === data.userName && user.password === data.password
      )

      if (user) {
        localStorage.setItem('userName', JSON.stringify(user.userName))
        handleGetInitialsFromName(user.userName)

        router.push('/dashboard')
        return
      } else {
        setIsLoading(false)
        setLoginError('Usuário ou senha inválidos')
        reset()
      }
    } catch (error: unknown) {
      let errorMessage: ErrorLoginFormMessage = { message: 'Erro ao fazer login' }

      if (error instanceof Error) {
        errorMessage = { message: error.message }
      }

      setLoginError(errorMessage.message)
      setIsLoading(false)
      reset()
    }
  }

  return (
    <form className={styles.searchFormContainer} onSubmit={handleSubmit(handleLogin)} autoComplete="off">
      <legend>Login</legend>

      <input
        type="text"
        placeholder="Insira seu usuário"
        {...register('userName')}
      />
      {errors.userName?.message && (
        <span className={styles.errorMessage}>{errors.userName.message}</span>
      )}

      <input
        type="password"
        placeholder="Senha"
        {...register('password')}
      />
      {errors.password?.message && (
        <span className={styles.errorMessage}>{errors.password.message}</span>
      )}

      {loginError && (
        <span className={styles.errorMessage} style={{ color: 'red' }}>
          {loginError}
        </span>
      )}

      <div className={styles.spinner} style={{ display: 'none' }} />

      <button type="submit" disabled={isSubmitDisabled}>
        {isLoading ? <div className={styles.spinner} /> : 'Login'}
      </button>
    </form>
  )
}
