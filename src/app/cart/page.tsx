import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CartPage = () => (
    <>
        <Header />
        <main>
            <section className="cart">
                <h2>Shopping Cart</h2>
                <div className="cart-items">
                    <div className="cart-item">
                        <img src="/images/placeholder-cake.svg" alt="Chocolate Fudge Cake" />
                        <div className="item-details">
                            <h3>Chocolate Fudge Cake</h3>
                            <p>Price: $35.00</p>
                            <label htmlFor="quantity-cake">Quantity:</label>
                            <input type="number" id="quantity-cake" name="quantity-cake" value="1" min="1" />
                            <button className="remove-button">Remove</button>
                        </div>
                    </div>
                </div>
                <div className="cart-item">
                    <img src="/images/placeholder-cupcake.svg" alt="Vanilla Cupcake" />
                    <div className="item-details">
                        <h3>Vanilla Cupcake</h3>
                        <p>Price: $3.50</p>
                        <label htmlFor="quantity-cupcake">Quantity:</label>
                        <input type="number" id="quantity-cupcake" name="quantity-cupcake" value="2" min="1" />
                        <button className="remove-button">Remove</button>
                    </div>
                    </div>
                <div className="cart-summary">
                    <h3>Cart Summary</h3>
                    <p>Subtotal: $35.00</p>
                    <p>Shipping: Calculated at checkout</p>
                    <p className="total">Total: $35.00</p>
                    <button className="checkout-button">Proceed to Checkout</button>
                </div>
            </section>
        </main>
        <Footer />
    </>
);

export default CartPage;
