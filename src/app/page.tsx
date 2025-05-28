import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

const featuredProducts = [
    { id: 1, image: 'https://placehold.co/600x400/d47a4c/white?text=Chocolate+Cake', name: 'Chocolate Fudge Cake', price: '$35.00', category: 'Cakes', stock: 10 },
    { id: 2, image: 'https://placehold.co/600x400/d47a4c/white?text=Oatmeal+Cookies', name: 'Oatmeal Raisin Cookies', price: '$15.00/dozen', category: 'Cookies', stock: 25 },
    { id: 3, image: 'https://placehold.co/600x400/d47a4c/white?text=Sourdough+Bread', name: 'Sourdough Bread', price: '$8.00', category: 'Breads', stock: 15 }
];

const HomePage = () => (
    <>
        <Header />
        <main>
            {/* Hero Section - styling will be in globals.css or a dedicated module */}
            <section className="hero" style={{ 
                // Placeholder for background image, will be refined
                // backgroundImage: `url('https://placehold.co/1920x600/333/ccc?text=Bakery+Hero+Image')`,
                // backgroundSize: 'cover',
                // backgroundPosition: 'center',
                // padding: '60px 20px', // Increased padding
                // color: '#fff', // Assuming text will be light on dark/image background
                // textAlign: 'center'
            }}>
                <h1>Welcome to Sweet Surrender Bakery</h1>
                <p style={{ fontSize: '1.2em', marginBottom: '30px' }}>Indulge in our freshly baked delights.</p>
                <a href="/products" className="cta-button">Explore Our Treats</a>
            </section>

            <section className="featured-products" style={{ padding: '40px 20px', textAlign: 'center'}}>
                <h2>Featured Products</h2>
                <div className="products-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', // Responsive grid
                    gap: '30px',
                    marginTop: '30px'
                }}>
                    {featuredProducts.map((product) => (
                        <ProductCard 
                            key={product.id}
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
        </main>
        <Footer />
    </>
);

export default HomePage;
