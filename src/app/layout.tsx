import App from 'next/app';
import './globals.css';
import { AppProvider } from './context/AppProvider';

import { Toaster } from 'react-hot-toast';
import "bootstrap/dist/css/bootstrap.min.css";

/*export const metadata = {
    title: 'Sweet Surrender Bakery',
    description: 'Handcrafted baked goods, made with love.',
};*/

export default function RootLayout({
    children,

}: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <AppProvider>
                    <Toaster />
                    {children}
                </AppProvider>
            </body>
        </html>
    );
}
