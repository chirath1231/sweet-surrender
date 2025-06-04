'use client'; // Added for client-side interactions (dropdown, scrolling)
import Header from '@/components/Header';  
import Footer from '@/components/Footer';
import React, { useState } from 'react'; // Import useState
import ProductCard from '@/components/ProductCard';

// Expanded and diversified product list
const allProducts = [
    // Cakes
    { id: 1, image: 'placeholder-cake-chocolate.svg', name: 'Decadent Chocolate Fudge Cake', price: '$35.00', category: 'Cakes', stock: 10 },
    { id: 2, image: 'placeholder-cake-strawberry.svg', name: 'Strawberry Shortcake Dream', price: '$40.00', category: 'Cakes', stock: 7 },
    { id: 3, image: 'placeholder-cake-vanilla.svg', name: 'Classic Vanilla Bean Cake', price: '$30.00', category: 'Cakes', stock: 12 },

];


// Helper function to group products by category
const groupProductsByCategory = (products: typeof allProducts = []) => {
    if (!Array.isArray(products)) return {} as Record<string, typeof allProducts>;
    return products.reduce((acc, product) => {
        const category = product.category;
        console.log(`Grouping product: ${product.name} under category: ${category}`);
        
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(product);
        return acc;
    }, {} as Record<string, typeof allProducts>);
};

const ProductsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // null means show all
    const [products, setProducts] = useState<typeof allProducts>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch products when component mounts
    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/products');
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                // Convert data to array if it's an object
                const productsArray = Array.isArray(data.products) ? data.products : Object.values(data.products);
                setProducts(productsArray);
            } catch (error) {
                console.error('Error fetching products:', error);
                // Fallback to static products if API fails
                setProducts(allProducts);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const categorizedProducts = groupProductsByCategory(products);
    console.log('Categorized Products:', categorizedProducts);
    
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
        productsToDisplay = categorizedProducts;
    }

    if (isLoading) {
        return <div>Loading products...</div>;
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
