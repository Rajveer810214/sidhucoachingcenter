import React, { useState } from 'react';
import { useRouter } from 'next/router';

function Signin() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false); // Add loading state
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem('auth-token', json.authToken);
        setLoading(false); // Set loading to false
        router.push('/');
      } else {
        setLoading(false); // Set loading to false
        alert('Login failed');
      }
    } catch (error) {
      // console.error(error);
      setLoading(false); // Set loading to false
      alert('Login failed');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container" style={{ marginTop: '63px' }}>
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner" />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <h1 className="text-center">Login</h1>
        <div className="form-group my-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            name="email"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onChange}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            name="password"
            id="password"
            placeholder="Password"
            onChange={onChange}
          />
        </div>

        <button
          type="submit"
          className="login my-3 text-center"
          style={{ borderRadius: '6px' }}
          disabled={loading} // Disable the button when loading is true
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Signin;
