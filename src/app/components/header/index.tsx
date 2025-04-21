"use client";

import { Gauge } from 'phosphor-react';
import { HeaderContainer } from "./style";
import Link from 'next/link';
import { useContext } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/contexts/LoginContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Spinner } from 'phosphor-react';


export default function Header() {
    const router = useRouter()
    const { userName, setUserName, isUserLoading } = useContext(UserContext);

    const handleLogout = () => {
        localStorage.removeItem('userName');
        setUserName(null);
        router.push('/');
    }

    return (
        <HeaderContainer>
            <Link href="/dashboard">
                <Gauge size={32} />
            </Link>
            <h1 className='text-3xl font-bold'>MaicoSoft <small className='text-sm'>Dashboard</small></h1>
            <h2 className='w-[50px] shrink-0'>
                <AnimatePresence mode="wait">
                    {isUserLoading && (
                        <motion.span 
                            key="loading"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className='animate-pulse text-gray-400'
                        >
                            <Spinner 
                                size={24} 
                                className="
                                    animate-spin text-gray-400
                                " 
                            />
                        </motion.span>
                    )}
                    {(userName && !isUserLoading) && (
                        <motion.div
                            key="userName"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className='flex items-center justify-center gap-2'
                        >
                            <Popover>
                                <PopoverTrigger asChild>
                                <span className="
                                    relative inline-flex items-center gap-1 text-3xl font-bold cursor-pointer
                                    after:content-['▼'] after:text-base after:inline-block after:ml-1
                                ">
                                    {userName}
                                </span>
                                </PopoverTrigger>
                                <PopoverContent
                                    align="center"
                                    sideOffset={8}
                                    className="w-32 text-center border-t border-zinc-300 bg-white h-[40px] flex items-center justify-center rounded-b-md transition-colors hover:bg-green-100"
                                >
                                    <button
                                    onClick={handleLogout}
                                    className="text-sm text-zinc-700 hover:underline transition cursor-pointer"
                                    >
                                    Logout
                                    </button>
                                </PopoverContent>
                            </Popover>
                        </motion.div>
                    )}
                </AnimatePresence>
            </h2>
        </HeaderContainer>
    )
}