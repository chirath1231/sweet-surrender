"use client"
import { myAppHook } from '@/app/context/AppProvider';
import Link from 'next/link';

const Navbar = () => {
    const { authToken, logout } = myAppHook();

    return (
        <nav>
            <div className="logo">Sweet Surrender</div>
            <ul>
                {authToken ? (
                    <>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/products">Products</Link></li>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                        <li><Link href="/cart">Cart</Link></li>
                        <li>
                            <button
                                onClick={logout}
                                style={{
                                    backgroundColor: 'red',
                                    color: 'black',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '4px 16px',
                                    borderRadius: '4px',
                                    fontWeight: 'bold'
                                }}
                            >
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className='log' style={{
                            backgroundColor: '#d47a4c',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px 16px',
                            borderRadius: '4px',
                            fontWeight: 'bold'
                        }}><Link href="/auth?mode=login">Login</Link></li>
                        <li
                            className='log' style={{
                                backgroundColor: '#d47a4c',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px 16px',
                                borderRadius: '4px',
                                fontWeight: 'bold'
                            }}><Link href="/auth?mode=register">Register</Link></li>

                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
