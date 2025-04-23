"use client";

import { createContext, useEffect, useState } from "react";
import { ReactNode } from "react";

interface LoginContextType {
    userName: string | null;
    setUserName: (userName: string | null) => void;
    isUserLoading: boolean;
    handleGetInitialsFromName: (name: string | null) => void;
}

interface UserProviderProps {
    children: ReactNode;
}

export const UserContext = createContext({} as LoginContextType);

export function LoginProvider({ children }: UserProviderProps) {
    const [userName, setUserName] = useState<string | null>(null);
    const [isUserLoading, setIsUserLoading] = useState(true);

    const handleGetInitialsFromName = (name: string | null) => {
        if (!name) {
            setUserName(null);
            return;
        }

        try {
            const [first, second] = name.split('.')
            setUserName(`${first?.[0]?.toUpperCase()}.${second?.[0]?.toUpperCase()}`); 
        } catch (error: unknown) {
            console.error('Erro ao obter iniciais:', error);
            setUserName(null);
        }
    }

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');

        if (storedUserName) {
            const name = JSON.parse(storedUserName);
            handleGetInitialsFromName(name);
        }

        setIsUserLoading(false);
    }, [])

    return (
        <UserContext.Provider value={{ 
            userName, 
            setUserName,
            handleGetInitialsFromName,
            isUserLoading 
        }}>
            {children}
        </UserContext.Provider>
    );
}