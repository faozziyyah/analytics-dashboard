import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ErrorBoundary } from 'react-error-boundary';
import Layout from '../components/layout/Layout';

function ErrorFallback({ error }: { error: Error }) {
    return (
        <div role="alert" className="p-4 m-4 bg-red-100 text-red-900 rounded">
            <p>Something went wrong:</p>
            <pre className="text-xs">{error.message}</pre>
        </div>
    );
}

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ErrorBoundary>
    );
}