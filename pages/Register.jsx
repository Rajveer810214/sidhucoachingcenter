import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from './Navbar';

function Register() {
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      if (json.success) {
        alert('Successfully SignUp in');
        router.push('/');
        localStorage.setItem('auth-token', json.authToken);
        setCredentials({
          name: '',
          email: '',
          password: '',
          Cpassword: '',
        });
      } else {
        alert('Signup failed');
      }
    } catch (error) {
      console.error(error);
      alert('Signup failed');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ marginTop: '63px' }}>
        <form onSubmit={handleSubmit}>
          <h1 className="text-center">Sign Up</h1>
          <div className="form-group my-2">
            <span>Name</span>
            <input type="text" className="form-control" value={credentials.name} name="name" id="name" placeholder="Enter your name" onChange={onChange} required minLength={5} />
          </div>
          <div className="form-group my-2">
            <span>Email address</span>
            <input type="email" className="form-control" value={credentials.email} name="email" id="email" aria-describedby="emailHelp" placeholder="Enter email" required onChange={onChange} />
          </div>
          <div className="form-group my-2">
            {/* <label htmlFor="password">Password</label> */}
            <input type="password" className="form-control" value={credentials.password} name="password" id="password" placeholder="Password" required minLength={5} onChange={onChange} />
          </div>
          <button type="submit" className="login my-3">Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default Register;
