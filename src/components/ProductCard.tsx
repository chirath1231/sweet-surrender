type ProductCardProps = {
    image: string;
    name: string;
    price: string;
};

const ProductCard = ({ image, name, price }: ProductCardProps) => (
    <div className="product-card">
        <img src={`/images/${image}`} alt={name} />
        <h3>{name}</h3>
        <p>{price}</p>
        <button className="button">Add to Cart</button>
    </div>
);

export default ProductCard;
