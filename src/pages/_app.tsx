import '@/styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';

import { DefaultErrorState } from '@/components/DefaultErrorState';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <Head>
        <title>Color Drawing React</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ErrorBoundary FallbackComponent={DefaultErrorState}>
          <ToastContainer />
          {getLayout(<Component {...pageProps} />)}
        </ErrorBoundary>
      </main>
    </>
  );
}
