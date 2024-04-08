import { ReactElement } from 'react';

import DrawingCanvas from '@/components/DrawingCanvas';
import { ProtectedLayout } from '@/components/layouts';

import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <DrawingCanvas width={window.innerWidth} height={window.innerHeight} />
    </>
  );
};

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return <ProtectedLayout>{page}</ProtectedLayout>;
};
