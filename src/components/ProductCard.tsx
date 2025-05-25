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
    const { addToCart } = myAppHook();
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

    const handleAddToCart = () => {
        const productToAdd = { id, name, price, image, stock };
        addToCart(productToAdd, selectedQuantity);
    };

    return (
        <div className="product-card">
            <img src={`/images/${image}`} alt={name} />
            <h3>{name}</h3>
            <p style={{ fontSize: '0.9em', color: '#777' }}>Category: {category}</p>
            <p>{price}</p>
            <p style={{ fontSize: '0.9em', color: stock > 0 ? 'green' : 'red' }}>
                Stock: {stock > 0 ? `${stock} available` : 'Out of stock'}
            </p>

            {stock > 0 && (
                <div className="quantity-selector" style={{ margin: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <button onClick={() => handleQuantityChange(-1)} disabled={selectedQuantity <= 1} style={{ padding: '5px 10px' }}>-</button>
                    <input
                        type="number"
                        value={selectedQuantity}
                        onChange={handleInputChange}
                        min="1"
                        max={stock}
                        style={{ width: '50px', textAlign: 'center', margin: '0 5px', padding: '5px' }}
                    />
                    <button onClick={() => handleQuantityChange(1)} disabled={selectedQuantity >= stock} style={{ padding: '5px 10px' }}>+</button>
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
    );
};

export default ProductCard;
