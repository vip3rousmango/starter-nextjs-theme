import { useLiveReload } from 'next-contentlayer/hooks';
import '../css/main.css';

export default function App({ Component, pageProps }: any) {
    if (process.env.NODE_ENV === 'development') {
        useLiveReload();
    }

    return <Component {...pageProps} />;
}
