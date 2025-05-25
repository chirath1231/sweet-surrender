'use client'; // Added for client-side interactions (dropdown, scrolling)

import React, { useState } from 'react'; // Import useState
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

// Expanded and diversified product list
const allProducts = [
    // Cakes
    { id: 1, image: 'placeholder-cake-chocolate.svg', name: 'Decadent Chocolate Fudge Cake', price: '$35.00', category: 'Cakes', stock: 10 },
    { id: 2, image: 'placeholder-cake-strawberry.svg', name: 'Strawberry Shortcake Dream', price: '$40.00', category: 'Cakes', stock: 7 },
    { id: 3, image: 'placeholder-cake-vanilla.svg', name: 'Classic Vanilla Bean Cake', price: '$30.00', category: 'Cakes', stock: 12 },
    { id: 4, image: 'placeholder-cake-lemon.svg', name: 'Lemon Zest Pound Cake', price: '$28.00', category: 'Cakes', stock: 9 },
    { id: 5, image: 'placeholder-cake-carrot.svg', name: 'Carrot Cake with Cream Cheese Frosting', price: '$38.00', category: 'Cakes', stock: 6 },

    // Cupcakes
    { id: 6, image: 'placeholder-cupcake-vanilla.svg', name: 'Vanilla Cupcakes (6 pack)', price: '$20.00', category: 'Cupcakes', stock: 25 },
    { id: 7, image: 'placeholder-cupcake-redvelvet.svg', name: 'Red Velvet Cupcakes (6 pack)', price: '$22.00', category: 'Cupcakes', stock: 18 },
    { id: 8, image: 'placeholder-cupcake-chocolate.svg', name: 'Double Chocolate Cupcakes (6 pack)', price: '$22.00', category: 'Cupcakes', stock: 20 },

    // Cookies
    { id: 9, image: 'placeholder-cookie-chocolatechip.svg', name: 'Gourmet Chocolate Chip Cookies (dozen)', price: '$15.00', category: 'Cookies', stock: 30 },
    { id: 10, image: 'placeholder-cookie-oatmeal.svg', name: 'Oatmeal Raisin Spice Cookies (dozen)', price: '$14.00', category: 'Cookies', stock: 22 },
    { id: 11, image: 'placeholder-cookie-sugarcookies.svg', name: 'Decorated Sugar Cookies (dozen)', price: '$20.00', category: 'Cookies', stock: 15 },

    // Breads
    { id: 12, image: 'placeholder-bread-sourdough.svg', name: 'Artisan Sourdough Loaf', price: '$8.00', category: 'Breads', stock: 15 },
    { id: 13, image: 'placeholder-bread-baguette.svg', name: 'Classic French Baguette', price: '$6.00', category: 'Breads', stock: 20 },
    { id: 14, image: 'placeholder-bread-multigrain.svg', name: 'Multigrain Sandwich Bread', price: '$7.00', category: 'Breads', stock: 18 },

    // Muffins
    { id: 15, image: 'placeholder-muffin-blueberry.svg', name: 'Jumbo Blueberry Muffins (4 pack)', price: '$16.00', category: 'Muffins', stock: 10 },
    { id: 16, image: 'placeholder-muffin-chocchip.svg', name: 'Chocolate Chip Muffins (4 pack)', price: '$16.00', category: 'Muffins', stock: 12 },
    { id: 17, image: 'placeholder-muffin-banana.svg', name: 'Banana Nut Muffins (4 pack)', price: '$18.00', category: 'Muffins', stock: 0 }, // Out of stock

    // Pastries
    { id: 18, image: 'placeholder-pastry-croissant.svg', name: 'Flaky Butter Croissant', price: '$4.50', category: 'Pastries', stock: 35 },
    { id: 19, image: 'placeholder-pastry-danish.svg', name: 'Cream Cheese Danish', price: '$5.00', category: 'Pastries', stock: 28 },
    { id: 20, image: 'placeholder-pastry-eclair.svg', name: 'Chocolate Eclair', price: '$5.50', category: 'Pastries', stock: 20 },

    // Pies (New Category)
    { id: 21, image: 'placeholder-pie-apple.svg', name: 'Homestyle Apple Pie (9-inch)', price: '$25.00', category: 'Pies', stock: 8 },
    { id: 22, image: 'placeholder-pie-cherry.svg', name: 'Cherry Lattice Pie (9-inch)', price: '$27.00', category: 'Pies', stock: 6 },
];

// Helper function to group products by category
const groupProductsByCategory = (products: typeof allProducts) => {
    return products.reduce((acc, product) => {
        const category = product.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(product);
        return acc;
    }, {} as Record<string, typeof allProducts>);
};

const ProductsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // null means show all
    const categorizedProducts = groupProductsByCategory(allProducts);
    const uniqueCategories = Object.keys(categorizedProducts);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedCategory(value === "ALL" || value === "" ? null : value);
    };

    // Determine which products to display based on selectedCategory
    let productsToDisplay: Record<string, typeof allProducts> = {};
    if (selectedCategory && categorizedProducts[selectedCategory]) {
        productsToDisplay = {
            [selectedCategory]: categorizedProducts[selectedCategory]
        };
    } else {
        // If no category is selected (or selectedCategory is null), show all categorized products
        productsToDisplay = categorizedProducts;
    }

    return (
        <>
            <Header />
            <main>
                <section className="products-banner" style={{ marginBottom: '20px' }}>
                    <h2>Our Delicious Products</h2>
                    <div style={{ marginTop: '20px', marginBottom: '30px', textAlign: 'center' }}>
                        <label htmlFor="category-select" style={{ marginRight: '10px', fontWeight: 'bold' }}>Filter by Category:</label>
                        <select 
                            id="category-select" 
                            onChange={handleCategoryChange}
                            value={selectedCategory || "ALL"} // Control component value, default to ALL
                            style={{ padding: '8px 12px', borderRadius: '5px', border: '1px solid #ccc' }}
                        >
                            <option value="ALL">All Categories</option> 
                            {uniqueCategories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </section>

                {Object.entries(productsToDisplay).map(([category, productsInCategory]) => (
                    <section key={category} id={category} className="category-section all-products" style={{ marginBottom: '40px' }}> 
                        <h3 style={{ textAlign: 'center', color: '#d47a4c', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                            {category}
                        </h3>
                        <div className="products-grid">
                            {productsInCategory.map((product, index) => (
                                <ProductCard
                                    key={`${category}-${product.id}`}
                                    id={product.id}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    category={product.category}
                                    stock={product.stock}
                                />
                            ))}
                        </div>
                    </section>
                ))}
            </main>
            <Footer />
        </>
    );
};

export default ProductsPage;
