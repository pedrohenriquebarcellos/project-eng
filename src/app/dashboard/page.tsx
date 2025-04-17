'use client';

import { Pen, UserCirclePlus, UsersThree } from 'phosphor-react'
import styles from './dashboard.module.css'
import Link from 'next/link';

export default function Dashboard() {
    return (
        <section className={styles.container}>
            <nav className={styles.navWrapper}>
                <ul>
                    <li>
                        <Link href="/cadastrar">
                            <UserCirclePlus size={48} />
                            <span>Cadastrar</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/editar">
                            <Pen size={48} />
                            <span>Editar Cadastro</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/listar">
                            <UsersThree size={48} />
                            <span>Listar</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </section>
    )
}