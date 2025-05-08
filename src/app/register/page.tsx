"use client"

import RegisterForm from '../components/RegisterForm'
import styles from './register.module.css'

import { useAuth } from "@/hooks/useAuth";

export default function Register() {
    const isAuthenticated = useAuth();

    return (
        isAuthenticated && (
            <section className={styles.container}>
                <RegisterForm />
            </section>
        )
    )
}