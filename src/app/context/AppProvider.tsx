'use client';
import { createContext, useContext, useEffect, useState } from 'react'

import { useRouter, usePathname } from 'next/navigation';
import App from 'next/app';
import Loader from '@/components/Loader';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import cookies from 'js-cookie';

// Define the structure of a cart item
export interface CartItem {
    id: number; // Assuming products will have a unique ID
    name: string;
    price: string; // Keep as string for now, parsing can be done when calculating total
    image: string;
    quantity: number;
    stock: number; // To ensure we don't add more than available
}

interface AppProviderType {
    IsLoading: Boolean;
    authToken: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string, password_confirmation: string) => Promise<void>;
    logout: () => void;
    cart: CartItem[]; // Add cart to the context type
    addToCart: (product: Omit<CartItem, 'quantity'>, quantity: number) => void; // Function to add items
    removeFromCart: (productId: number) => void; // Function to remove items
    updateCartQuantity: (productId: number, quantity: number) => void; // Function to update quantity
}

const AppContext = createContext<AppProviderType | undefined>(undefined);

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const AppProvider = ({
    children



}: { children: React.ReactNode; }) => {

    const [IsLoading, setIsLoading] = useState<Boolean>(false);
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]); // Initialize cart state
    const router = useRouter();
    const pathname = usePathname(); // Get current pathname

    useEffect(() => {
        const token = cookies.get("authToken");
        if (token) {
            setAuthToken(token);
        } else {
            // Only redirect to /auth if not already on an auth-related page or public page
            if (!pathname.includes('/auth')) { // Use pathname from usePathname()
                // router.push("/auth"); // Still commented out
            }
        }
        // Load cart from localStorage if available
        const storedCart = localStorage.getItem('shoppingCart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }

        setIsLoading(false);
    }, [router, pathname]); // Added pathname to dependency array

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }, [cart]);

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

    // Cart Functions
    const addToCart = (productToAdd: Omit<CartItem, 'quantity'>, quantity: number) => {
        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(item => item.id === productToAdd.id);
            let newCart = [...prevCart];

            if (quantity <= 0) {
                toast.error('Quantity must be greater than 0.');
                return prevCart; // No change if quantity is invalid
            }

            if (quantity > productToAdd.stock) {
                toast.error(`Only ${productToAdd.stock} in stock.`);
                return prevCart; // Don't add more than available stock
            }

            if (existingItemIndex !== -1) {
                // Item exists, update its quantity
                const updatedItem = {
                    ...newCart[existingItemIndex],
                    quantity: newCart[existingItemIndex].quantity + quantity,
                };
                if (updatedItem.quantity > productToAdd.stock) {
                    toast.error(`Cannot add more than ${productToAdd.stock} (total) in stock.`);
                    updatedItem.quantity = productToAdd.stock; // Cap at stock
                }
                 if (updatedItem.quantity <= 0) { // Should be caught by initial check, but as safeguard
                    newCart.splice(existingItemIndex, 1); // Remove if quantity becomes 0 or less
                    toast.success(`${productToAdd.name} removed from cart.`);
                } else {
                    newCart[existingItemIndex] = updatedItem;
                    toast.success(`${quantity} x ${productToAdd.name} added to cart.`);
                }
            } else {
                // Item doesn't exist, add as new
                newCart.push({ ...productToAdd, quantity });
                toast.success(`${quantity} x ${productToAdd.name} added to cart.`);
            }
            return newCart;
        });
    };

    const removeFromCart = (productId: number) => {
        setCart(prevCart => {
            const itemToRemove = prevCart.find(item => item.id === productId);
            if (itemToRemove) {
                toast.success(`${itemToRemove.name} removed from cart.`);
            }
            return prevCart.filter(item => item.id !== productId);
        });
    };

    const updateCartQuantity = (productId: number, newQuantity: number) => {
        setCart(prevCart => {
            const itemIndex = prevCart.findIndex(item => item.id === productId);
            if (itemIndex === -1) return prevCart; // Item not found

            const itemToUpdate = prevCart[itemIndex];

            if (newQuantity <= 0) {
                // If quantity is 0 or less, remove the item
                const updatedCart = prevCart.filter(item => item.id !== productId);
                toast.success(`${itemToUpdate.name} removed from cart.`);
                return updatedCart;
            } else if (newQuantity > itemToUpdate.stock) {
                toast.error(`Only ${itemToUpdate.stock} of ${itemToUpdate.name} in stock.`);
                // Optionally, set to max stock instead of erroring out further changes
                // itemToUpdate.quantity = itemToUpdate.stock;
                // return [...prevCart]; 
                return prevCart; // Or keep current cart state
            } else {
                // Update quantity
                const updatedCart = [...prevCart];
                updatedCart[itemIndex] = { ...itemToUpdate, quantity: newQuantity };
                toast.success(`Quantity for ${itemToUpdate.name} updated to ${newQuantity}.`);
                return updatedCart;
            }
        });
    };

    return (
        <AppContext.Provider value={{
            login,
            register,
            IsLoading,
            authToken,
            logout,
            cart, // expose cart state
            addToCart, // expose addToCart function
            removeFromCart,
            updateCartQuantity
        }}>
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