import React from 'react';
import PropTypes from 'prop-types';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import Script from 'next/script';
import Navbar from './Navbar';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossOrigin="anonymous" />
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js" integrity="sha384-fbbOQedDUMZZ5KreZpsbe1LCZPVmfTnH7ois6mU1QK+m14rQ1l2bGBq41eYeM/fS" crossOrigin="anonymous" />
      <Script src="https://kit.fontawesome.com/e82babc1cf.js" crossorigin="anonymous" />
      <Component {...pageProps} />
      <Navbar />
    </>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
