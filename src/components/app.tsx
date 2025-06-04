// pages/_app.tsx or _app.js
import Head from 'next/head';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script src="https://www.payhere.lk/lib/payhere.js" defer></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
