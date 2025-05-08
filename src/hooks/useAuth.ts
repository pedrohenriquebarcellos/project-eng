'use cliente'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify";

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            toast.error("Você precisa estar logado para acessar essa página.");
            router.push("/")
        } else {
            setIsAuthenticated(true);
        }
    }, [router])

    return isAuthenticated
}