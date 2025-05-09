import './globals.css';

export const metadata = {
    title: 'Sweet Surrender Bakery',
    description: 'Handcrafted baked goods, made with love.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
