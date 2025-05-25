'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { myAppHook, CartItem } from '@/app/context/AppProvider'; // Import CartItem type
import Link from 'next/link';

const CartPage = () => {
    const { cart, removeFromCart, updateCartQuantity } = myAppHook();

    const handleQuantityChange = (productId: number, currentStock: number, change: number) => {
        const currentItem = cart.find(item => item.id === productId);
        if (currentItem) {
            const newQuantity = currentItem.quantity + change;
            if (newQuantity > 0 && newQuantity <= currentStock) {
                updateCartQuantity(productId, newQuantity);
            } else if (newQuantity <= 0) {
                updateCartQuantity(productId, 0); // Let updateCartQuantity handle removal or set to 1
            }
            // Stock limit is handled within updateCartQuantity
        }
    };

    const handleInputChange = (productId: number, currentStock: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(event.target.value, 10);
        if (!isNaN(newQuantity)) {
             if (newQuantity > 0 && newQuantity <= currentStock) {
                updateCartQuantity(productId, newQuantity);
            } else if (newQuantity <= 0) {
                 updateCartQuantity(productId, 0); // Let updateCartQuantity handle removal
            } else if (newQuantity > currentStock) {
                updateCartQuantity(productId, currentStock); // Set to max stock if input exceeds
            }
        } else if (event.target.value === "") {
            // Potentially set to 1 or let user clear it then click update - for now, let updateCartQuantity handle it if it becomes 0
            const currentItem = cart.find(item => item.id === productId);
            if(currentItem) updateCartQuantity(productId, 1); // Default to 1 if input is cleared
        }
    };

    const calculateSubtotal = () => {
        return cart.reduce((total, item) => {
            // Assuming price is like '$XX.XX', remove $ and convert to number
            const price = parseFloat(item.price.replace('$', ''));
            return total + (price * item.quantity);
        }, 0);
    };

    const subtotal = calculateSubtotal();
    // Shipping could be a fixed value or calculated based on other factors
    const shipping = cart.length > 0 ? 5.00 : 0; // Example: $5 shipping if cart not empty
    const total = subtotal + shipping;

    if (cart.length === 0) {
        return (
            <>
                <Header />
                <main>
                    <section className="cart" style={{ textAlign: 'center', padding: '50px' }}>
                        <h2>Your Shopping Cart is Empty</h2>
                        <p style={{ margin: '20px 0' }}>Looks like you haven't added anything to your cart yet.</p>
                        <Link href="/products" className="button">
                            Continue Shopping
                        </Link>
                    </section>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main>
                <section className="cart">
                    <h2>Shopping Cart</h2>
                    <div className="cart-items-header" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr auto', gap: '10px', padding: '10px', borderBottom: '1px solid #eee', fontWeight: 'bold' }}>
                        <span>Image</span>
                        <span>Product</span>
                        <span>Price</span>
                        <span>Quantity</span>
                        <span>Total</span>
                        <span>Remove</span>
                    </div>
                    <div className="cart-items">
                        {cart.map((item: CartItem) => (
                            <div className="cart-item" key={item.id} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr auto', gap: '10px', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee' }}>
                                <img src={`/images/${item.image}`} alt={item.name} style={{ width: '80px', height: 'auto', borderRadius: '4px' }} />
                                <div className="item-details-main">
                                    <h3>{item.name}</h3>
                                    {/* Optional: <p style={{fontSize: '0.8em', color: '#777'}}>ID: {item.id}</p> */}
                                </div>
                                <p>{item.price}</p>
                                <div className="item-quantity-controls" style={{ display: 'flex', alignItems: 'center' }}>
                                    <button onClick={() => handleQuantityChange(item.id, item.stock, -1)} disabled={item.quantity <= 1} style={{ padding: '3px 8px' }}>-</button>
                                    <input 
                                        type="number" 
                                        value={item.quantity} 
                                        onChange={(e) => handleInputChange(item.id, item.stock, e)}
                                        min="1"
                                        max={item.stock} 
                                        style={{ width: '40px', textAlign: 'center', margin: '0 5px', padding: '3px' }}
                                    />
                                    <button onClick={() => handleQuantityChange(item.id, item.stock, 1)} disabled={item.quantity >= item.stock} style={{ padding: '3px 8px' }}>+</button>
                                </div>
                                <p>${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</p>
                                <button onClick={() => removeFromCart(item.id)} className="remove-button" style={{ padding: '5px 10px'}}>X</button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary" style={{ marginTop: '30px', padding: '20px', border: '1px solid #eee', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                        <h3>Cart Summary</h3>
                        <p style={{ display: 'flex', justifyContent: 'space-between' }}><span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span></p>
                        <p style={{ display: 'flex', justifyContent: 'space-between' }}><span>Shipping:</span> <span>${shipping.toFixed(2)}</span></p>
                        <hr />
                        <p className="total" style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2em' }}>
                            <span>Total:</span> 
                            <span>${total.toFixed(2)}</span>
                        </p>
                        <button className="checkout-button" style={{ width: '100%', marginTop: '20px', padding: '12px'}}>Proceed to Checkout</button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default CartPage;
