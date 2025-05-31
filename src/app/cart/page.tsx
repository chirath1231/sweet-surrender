'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { myAppHook } from '@/app/context/AppProvider';

type CartItem = {
    id: number;
    quantity: number;
    product: {
        id: number;
        name: string;
        image: string;
        price: number;
        stock: number;
        description: string;
        category: string;
    };
};

const CartPage = () => {
    const { authToken } = myAppHook();

    
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/cart', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => setCart(data.cart))
            .catch(error => {
                console.error('Error fetching cart:', error);
            });
    }, []);

    const handleQuantityChange = (id: number, change: number) => {
        setCart(prevCart =>
            prevCart.map(item => {
                if (item.id === id) {
                    const newQty = item.quantity + change;
                    if (newQty > 0 && newQty <= item.product.stock) {
                        return { ...item, quantity: newQty };
                    }
                }
                return item;
            })
        );
    };

    const removeFromCart = (id: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const subtotal = cart.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
    const shipping = cart.length > 0 ? 5.0 : 0;
    const total = subtotal + shipping;

    return (
        <>
            <Header />
            <main style={{ padding: '30px' }}>
                <h2 style={{ marginBottom: '20px' }}>Your Cart</h2>

                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                        {cart.map(item => (
                            <div key={item.id} style={{
                                border: '1px solid #ddd',
                                borderRadius: '10px',
                                padding: '20px',
                                backgroundColor: '#fff',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                            }}>
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '6px' }}
                                />
                                <h3 style={{ marginTop: '10px' }}>{item.product.name}</h3>
                                <p>{item.product.description}</p>
                                <p><strong>Price:</strong> ${item.product.price}</p>
                                <p><strong>Category:</strong> {item.product.category}</p>

                                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                    <button onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity <= 1}>-</button>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        min="1"
                                        max={item.product.stock}
                                        onChange={(e) => {
                                            const qty = parseInt(e.target.value);
                                            if (qty > 0 && qty <= item.product.stock) {
                                                setCart(prev => prev.map(c => c.id === item.id ? { ...c, quantity: qty } : c));
                                            }
                                        }}
                                        style={{ width: '50px', textAlign: 'center', margin: '0 10px' }}
                                    />
                                    <button onClick={() => handleQuantityChange(item.id, 1)} disabled={item.quantity >= item.product.stock}>+</button>
                                </div>

                                <p><strong>Total:</strong> ${(item.quantity * item.product.price).toFixed(2)}</p>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    style={{
                                        marginTop: '10px',
                                        background: '#f44336',
                                        color: 'white',
                                        border: 'none',
                                        padding: '8px 12px',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Summary */}
                {cart.length > 0 && (
                    <div style={{ marginTop: '40px', maxWidth: '400px', marginLeft: 'auto', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '10px' }}>
                        <h3>Order Summary</h3>
                        <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Subtotal:</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </p>
                        <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Shipping:</span>
                            <span>${shipping.toFixed(2)}</span>
                        </p>
                        <hr />
                        <p style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </p>
                        <button style={{ width: '100%', marginTop: '20px', padding: '12px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px' }}>
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
};

export default CartPage;
