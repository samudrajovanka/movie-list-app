import 'tailwindcss/tailwind.css';
import '@styles/global.scss';
import Loader from '@components/Loader';
import Router from 'next/router';
import Navbar from '@components/Navbar';
import NProgress from 'nprogress'
import { useState } from 'react';

NProgress.configure({ showSpinner: false });


function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  
  Router.events.on('routeChangeStart', () => {
    NProgress.start();
    setLoading(true);
  });
  
  Router.events.on('routeChangeComplete', () => {
    NProgress.done();
    setLoading(false);
  });
  
  Router.events.on('routeChangeError', () => {
    NProgress.done();
    setLoading(false);
  });

  let content;
  if (loading) {
    content = <Loader/>
  } else {
    content = <Component {...pageProps} />
  }

  return (
    <>
      <Navbar/>
      
      {content}
      
    </>
  )
}

export default MyApp
