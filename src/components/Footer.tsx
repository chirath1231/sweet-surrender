import Link from 'next/link';

const Footer = () => {
    const footerStyle: React.CSSProperties = {
        backgroundColor: '#333',
        color: '#fff',
        padding: '40px 20px',
        borderTop: '1px solid #444',
    };

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        maxWidth: '1200px',
        margin: '0 auto',
        gap: '20px',
    };

    const columnStyle: React.CSSProperties = {
        flex: '1',
        minWidth: '200px',
        marginBottom: '20px',
    };

    const h3Style: React.CSSProperties = {
        fontSize: '1.2em',
        marginBottom: '15px',
        color: '#d47a4c', // Using the original accent color
    };

    const ulStyle: React.CSSProperties = {
        listStyle: 'none',
        padding: '0',
    };

    const liStyle: React.CSSProperties = {
        marginBottom: '8px',
    };

    const linkStyle: React.CSSProperties = {
        color: '#fff',
        textDecoration: 'none',
    };

    const bottomBarStyle: React.CSSProperties = {
        textAlign: 'center',
        paddingTop: '20px',
        marginTop: '20px',
        borderTop: '1px solid #555',
        fontSize: '0.9em',
    };

    return (
        <footer style={footerStyle}>
            <div style={containerStyle}>
                <div style={columnStyle}>
                    <h3 style={h3Style}>Quick Links</h3>
                    <ul style={ulStyle}>
                        <li style={liStyle}><Link href="/" style={linkStyle}>Home</Link></li>
                        <li style={liStyle}><Link href="/products" style={linkStyle}>Products</Link></li>
                        <li style={liStyle}><Link href="/about" style={linkStyle}>About Us</Link></li>
                        <li style={liStyle}><Link href="/contact" style={linkStyle}>Contact</Link></li>
                    </ul>
                </div>

                <div style={columnStyle}>
                    <h3 style={h3Style}>Contact Us</h3>
                    <p style={{ marginBottom: '8px' }}>Email: info@sweetsurrender.com</p>
                    <p>Phone: (123) 456-7890</p>
                </div>

                <div style={columnStyle}>
                    <h3 style={h3Style}>Follow Us</h3>
                    <p>Stay connected on social media!</p>
                    {/* Add social media icons/links here */}
                </div>
            </div>
            <div style={bottomBarStyle}>
                <p>&copy; {new Date().getFullYear()} Sweet Surrender Bakery. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
