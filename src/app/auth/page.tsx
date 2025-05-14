'use client';
import React, { FormEvent, use, useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { myAppHook } from '../context/AppProvider';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';




interface formData {
    name: string;
    email: string;
    password: string;
    password_confirmation?: string;
}

const Auth: React.FC = () => {

    const searchParams = useSearchParams();
    const mode = searchParams.get("mode");
    const islogin = mode !== "register"; // true = login, false = register


    const [formData, setFormData] = useState<formData>({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });
    const router = useRouter();

    const { login, register, authToken, IsLoading } = myAppHook()
    useEffect(() => {
        if (authToken) {
            router.push("/")
        }
    }
        , [authToken, IsLoading]);

    const hanndleOnchangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    // Removed duplicate handleFormSubmit function
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (islogin) {

            try {
                await login(formData.email, formData.password);
            }
            catch (error) {
                console.log("Authentication failed ${error}");

            }

        } else {
            try {
                await register(formData.name, formData.email, formData.password, formData.password_confirmation!);
            }
            catch (error) {
                console.log("Registration failed ${error}");

            }

            // Handle registration logic here           
        }
        // Here you can add your logic to handle the form submission
        // For example, you can send the form data to your backend API
    };

    return (

        <>
            <Header />
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card p-4" style={{ width: '400px' }}>

                    <h3 className="text-center"> {islogin ? "Login" : "Register"}</h3>
                    <form onSubmit={handleFormSubmit}>
                        {
                            !islogin && <input className="form-control mb-2" name="name" type="text" value={formData.name} onChange={hanndleOnchangeInput} placeholder="Name" required />
                        }

                        <input className="form-control mb-2" name="email" type="email" value={formData.email} onChange={hanndleOnchangeInput} placeholder="Email" required />
                        <input className="form-control mb-2" name="password" type="password" value={formData.password} onChange={hanndleOnchangeInput} placeholder="Password" required />
                        {
                            !islogin && <input className="form-control mb-2" name="password_confirmation" type="password" value={formData.password_confirmation} onChange={hanndleOnchangeInput} placeholder="Confirm Password" required />
                        }

                        <button
                            className="btn w-100 fw-bold"
                            type="submit"
                            style={{
                                backgroundColor: islogin ? "#d47a4c" : "#d47a4c",
                                color: "white",
                                border: "none",
                            }}
                        >
                            {islogin ? "Login" : "Register"}
                        </button>
                    </form>

                    <p className="mt-3 text-center " style={{ color: islogin ? "#d47a4c" : "#d47a4c" }}>{!islogin ? "Already have an account?" : "Don't have an account?"}
                        <span onClick={() => router.push(`/auth?mode=${islogin ? "register" : "login"}`)} style={{ cursor: "pointer" }}>

                            {islogin ? "Register" : "Login"}

                        </span>
                    </p>


                </div>
            </div>
            <Footer />
        </>
    );
}

export default Auth;