
'use client';
import { createContext, useContext, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation';
import App from 'next/app';
import Loader from '@/components/Loader';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import cookies from 'js-cookie';


interface AppProviderType {
    IsLoading: Boolean;
    authToken: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string, password_confirmation: string) => Promise<void>;
    logout: () => void;
}
const AppContext = createContext<AppProviderType | undefined>(undefined);

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const AppProvider = ({
    children



}: { children: React.ReactNode; }) => {

    const [IsLoading, setIsLoading] = useState<Boolean>(false);
    const [authToken, setAuthToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = cookies.get("authToken");
        if (token) {
            setAuthToken(token);
        } else {
            router.push("/auth");
        }
        setIsLoading(false);
    }, [router]);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}/login`, {
                email,
                password
            });
            if (response.data.status) {
                cookies.set("authToken", response.data.token, { expires: 7 });
                toast.success("Login successful");
                setAuthToken(response.data.token);
                router.push("/");
            } else {
                toast.error("Login failed");
            }
            console.log(response);
        } catch (error) {
            // Optionally handle error
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (name: string, email: string, password: string, password_confirmation: string) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}/register`, {
                name,
                email,
                password,
                password_confirmation
            });

            if (response.data.status) {
                toast.success("Registration successful");
                router.push("/auth?mode=login"); // ✅ redirect to login
            } else {
                toast.error("Registration failed");
            }

        } catch (error) {
            toast.error("Registration failed");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };


    const logout = () => {
        setAuthToken(null);
        cookies.remove("authToken");
        setIsLoading(false);
        toast.success("Logout successful");
        router.push("/auth");
    }
    return (
        <AppContext.Provider value={{ login, register, IsLoading, authToken, logout }}>
            {IsLoading ? <Loader /> : children}
        </AppContext.Provider>
    );
}


export const myAppHook = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('Context will be wrapped in AppProvider')
    }
    return context;
}