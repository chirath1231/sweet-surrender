import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

const products = [
    { image: 'placeholder-cake.svg', name: 'Chocolate Cake', price: '$35.00' },
    { image: 'placeholder-cupcake.svg', name: 'Vanilla Cupcakes', price: '$20.00/half dozen' },
    { image: 'placeholder-cookie.svg', name: 'Chocolate Chip Cookies', price: '$15.00/dozen' },
    { image: 'placeholder-bread.svg', name: 'Baguette', price: '$6.00' },
    { image: 'placeholder-muffin.svg', name: 'Blueberry Muffins', price: '$18.00/half dozen' },
    { image: 'placeholder-pastry.svg', name: 'Croissant', price: '$4.50' }
];

const ProductsPage = () => (
    <>
        <Header />
        <main>
            <section className="products-banner">
                <h2>Our Delicious Products</h2>
            </section>

            <section className="all-products">
                <div className="products-grid">
                    {products.map((product, index) => (
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

export default ProductsPage;
