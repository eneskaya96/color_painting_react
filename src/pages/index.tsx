import { ReactElement, useEffect,useState } from 'react';

import DrawingCanvas from '@/components/DrawingCanvas';
import { ProtectedLayout } from '@/components/layouts';

import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <DrawingCanvas width={dimensions.width * 3 / 4 } height={dimensions.height * 3 /4} />
    </>
  );
};

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return <ProtectedLayout>{page}</ProtectedLayout>;
};
