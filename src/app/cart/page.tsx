'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { myAppHook } from '@/app/context/AppProvider';

declare global {
  interface Window {
    payhere: any;
  }
}

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

export default function CartPage() {
  const { authToken } = myAppHook();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/cart', {
      headers: { Authorization: `Bearer ${authToken}` },
    })
      .then(res => res.json())
      .then(data => setCart(data.cart))
      .catch(err => console.error('Error loading cart:', err));
  }, [authToken]);

  const handleQuantityChange = (id: number, change: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(
                item.product.stock,
                Math.max(1, item.quantity + change)
              ),
            }
          : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );
  const shipping = cart.length > 0 ? 5.0 : 0;
  const total = subtotal + shipping;

  const proceedToCheckout = async () => {
    const orderId = `ORDER_${Date.now()}`;
    const amount = total.toFixed(2);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/generate-hash', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ order_id: orderId, amount, currency: 'LKR' }),
      });

      const { hash } = await res.json();

      const payment = {
        sandbox: true,
        merchant_id: '1230639', // 🔁 Replace with real ID
        return_url: 'http://localhost:3000/payment-success',
        cancel_url: 'http://localhost:3000/payment-cancel',
        notify_url: 'http://127.0.0.1:8000/api/payhere-notify',
        order_id: orderId,
        items: 'Bakery Cart Order',
        amount: amount,
        currency: 'LKR',
        hash: hash,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone: '0771234567',
        address: 'No.1, Galle Road',
        city: 'Colombo',
        country: 'Sri Lanka',
      };

      window.payhere.onCompleted = (orderId: string) => {
        console.log('✅ Payment completed:', orderId);
      };
      window.payhere.onDismissed = () => {
        console.log('❌ Payment dismissed');
      };
      window.payhere.onError = (err: any) => {
        console.error('❗ Payment error:', err);
      };

      window.payhere.startPayment(payment);
    } catch (err) {
      console.error('❌ Checkout failed:', err);
    }
  };

  return (
    <>
      <Header />
      <main style={{ padding: '30px' }}>
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
            }}
          >
            {cart.map(item => (
              <div
                key={item.id}
                style={{
                  border: '1px solid #ddd',
                  padding: '20px',
                  borderRadius: '10px',
                  backgroundColor: '#fff',
                }}
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                  }}
                />
                <h3>{item.product.name}</h3>
                <p>{item.product.description}</p>
                <p><strong>Price:</strong> ${item.product.price}</p>
                <p><strong>Category:</strong> {item.product.category}</p>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                  <input
                    value={item.quantity}
                    readOnly
                    style={{ width: '50px', textAlign: 'center', margin: '0 10px' }}
                  />
                  <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                </div>

                <p><strong>Total:</strong> ${(item.quantity * item.product.price).toFixed(2)}</p>

                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    backgroundColor: '#f44336',
                    color: '#fff',
                    padding: '8px 12px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '10px',
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div style={{ marginTop: '40px', maxWidth: '400px', marginLeft: 'auto' }}>
            <h3>Order Summary</h3>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Shipping: ${shipping.toFixed(2)}</p>
            <hr />
            <p><strong>Total:</strong> ${total.toFixed(2)}</p>
            <button
              onClick={proceedToCheckout}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#4CAF50',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                marginTop: '20px',
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
