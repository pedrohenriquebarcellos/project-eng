import RegisterForm from '../components/RegisterForm'
import styles from './register.module.css'

export default function Register() {
    return (
        <section className={styles.container}>
            <RegisterForm />
        </section>
    )
}