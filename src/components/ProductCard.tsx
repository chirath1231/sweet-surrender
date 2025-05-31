'use client';

import React from 'react';
import { myAppHook } from '@/app/context/AppProvider';

type ProductCardProps = {
    id: number;
    image: string;
    name: string;
    price: string;
    category: string;
    stock: number;
};

const ProductCard = ({ id, image, name, price, category, stock }: ProductCardProps) => {
    const { addToCart, authToken } = myAppHook();
    const [selectedQuantity, setSelectedQuantity] = React.useState(1);

    const handleQuantityChange = (change: number) => {
        const newQuantity = selectedQuantity + change;
        if (newQuantity >= 1 && newQuantity <= stock) {
            setSelectedQuantity(newQuantity);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value >= 1 && value <= stock) {
            setSelectedQuantity(value);
        } else if (event.target.value === "") {
            setSelectedQuantity(1);
        }
    };

    const handleAddToCart = async () => {
        const productToAdd = { id, name, price, image, stock, category };
        await fetch('http://localhost:8000/api/cart/add', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ product_id: id, quantity: stock }),
        });
        addToCart(productToAdd, selectedQuantity);
    };

    return (
        <div className="product-card">
            <img src={image} alt={name} />
            <div className="product-card-content">
                <h3>{name}</h3>
                <p style={{ fontSize: '0.9em', color: '#777' }}>Category: {category}</p>
                <p className="price">{price}</p>
                <p className="stock-status" style={{ color: stock > 0 ? 'green' : 'red' }}>
                    {stock > 0 ? `${stock} available` : 'Out of stock'}
                </p>

                {stock > 0 && (
                    <div className="quantity-selector">
                        <button onClick={() => handleQuantityChange(-1)} disabled={selectedQuantity <= 1}>-</button>
                        <input
                            type="number"
                            value={selectedQuantity}
                            onChange={handleInputChange}
                            min="1"
                            max={stock}
                        />
                        <button onClick={() => handleQuantityChange(1)} disabled={selectedQuantity >= stock}>+</button>
                    </div>
                )}

                <button 
                    className="button" 
                    disabled={stock === 0}
                    onClick={handleAddToCart}
                >
                    {stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
