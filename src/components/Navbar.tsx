import Link from 'next/link';

const Navbar = () => (
    <nav>
        <div className="logo">Sweet Surrender</div>
        <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/cart">Cart</Link></li>
            <li><Link href="/auth">Auth</Link></li>
        </ul>
    </nav>
);

export default Navbar;
