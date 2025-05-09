import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

const featuredProducts = [
    { image: 'placeholder-cake.svg', name: 'Chocolate Fudge Cake', price: '$35.00' },
    { image: 'placeholder-cookie.svg', name: 'Oatmeal Raisin Cookies', price: '$15.00/dozen' },
    { image: 'placeholder-bread.svg', name: 'Sourdough Bread', price: '$8.00' }
];

const HomePage = () => (
    <>
        <Header />
        <main>
            <section className="hero">
                <h1>Welcome to Sweet Surrender Bakery</h1>
                <p>Indulge in our freshly baked delights.</p>
                <a href="/products" className="cta-button">Explore Our Treats</a>
            </section>

            <section className="featured-products">
                <h2>Featured Products</h2>
                <div className="products-grid">
                    {featuredProducts.map((product, index) => (
                        <ProductCard 
                            key={index} 
                            image={product.image} 
                            name={product.name} 
                            price={product.price} 
                        />
                    ))}
                </div>
            </section>
        </main>
        <Footer />
    </>
);

export default HomePage;
