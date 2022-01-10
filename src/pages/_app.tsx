import { useLiveReload } from 'next-contentlayer/hooks';
import '../css/main.css';

export default function App({ Component, pageProps }: any) {
  useLiveReload();

  return <Component {...pageProps} />;
}
