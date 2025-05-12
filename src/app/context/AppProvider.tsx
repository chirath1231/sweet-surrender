
'use client';
import { createContext, useContext, useState } from 'react'

import { useRouter } from 'next/navigation';
import App from 'next/app';
import Loader from '@/components/Loader';
import { toast } from 'react-hot-toast';
import axios from 'axios';

interface AppProviderType {
    IsLoading: Boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string, password_confirmation: string) => Promise<void>;
}
const AppContext = createContext<AppProviderType | undefined>(undefined);

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const AppProvider = ({
    children
  


}: { children: React.ReactNode; }) => {

const[IsLoading, setIsLoading] = useState<Boolean>(false);

    const login = async (email: string, password: string) => {
       setIsLoading(true);
        try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password
        });
        console.log(response);
        
    }catch (error) {}
        finally {
            setIsLoading(false);
        }
    }


    const register = async (name: string, email: string, password: string, password_confirmation: string) => {  }




    return(
        <AppContext.Provider value={{ login, register,IsLoading}}>
            {IsLoading ? <Loader/> : children}
            
        </AppContext.Provider>
    )
}


export const myAppHook = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('Context will be wrapped in AppProvider')
    }
    return context;
}