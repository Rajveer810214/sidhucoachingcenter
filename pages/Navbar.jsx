import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import sidhu from '../public/Sidhu_logo.png';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
    // Note: You don't need to check for token !== '' because an empty string evaluates to false
  });

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    setIsLoggedIn(false); // Update the login status
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Image src={sidhu} width={39} height={49} alt="" />
          <Link href="/" className="navbar-brand" style={{ fontFamily: 'monsteerat' }}>
            Sidhu Coaching Center
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                Sidhu Coaching Center
              </h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" />
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link href="/" className={`nav-link ${router.pathname === '/' ? 'active' : ''}`} aria-current="page">
                    <i className="fa-solid fa-house" />
                    {' '}
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/about" className={`nav-link ${router.pathname === '/about' ? 'active' : ''}`}>
                    <i className="fa-solid fa-address-card" />
                    {' '}
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/profile" className={`nav-link ${router.pathname === '/profile' ? 'active' : ''}`}>
                    <i className="fa-regular fa-user" />
                    {' '}
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/components/getquery" className={`nav-link ${router.pathname === '/components/getquery' ? 'active' : ''}`}>
                    <i className="fa-regular fa-user" />
                    {' '}
                    Your queries
                  </Link>
                </li>

                {isLoggedIn ? (
                  <li className="nav-item">
                    <Link href="/signin" className={`nav-link ${router.pathname === '/signin' ? 'active' : ''}`} onClick={handleLogout} style={{ textDecoration: 'none' }}>
                      <i className={`fa-solid fa-arrow-right-from-bracket nav-link ${router.pathname === '/signin' ? 'active' : ''}`} />
                      LogOut
                    </Link>
                  </li>
                ) : (
                  <span>
                    <li className="nav-item d-flex">
                      <i className={`fa-solid fa-right-to-bracket my-2 nav-link ${router.pathname === '/Register' ? 'active' : ''}`} />
                      <Link href="/Register" className={`my-1 nav-link mx-1 ${router.pathname === '/Register' ? 'active' : ''}`} style={{ textDecoration: 'none', width: '20px' }}>
                        SignUp
                      </Link>
                    </li>
                    <li className="nav-item d-flex">
                      <i className={`fa-solid fa-right-to-bracket my-2 nav-link ${router.pathname === '/signin' ? 'active' : ''}`} />
                      <Link href="/signin" className={`mx-1 my-1 nav-link ${router.pathname === '/signin' ? 'active' : ''}`} style={{ textDecoration: 'none', width: '20px' }}>
                        Login
                      </Link>
                    </li>
                  </span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
