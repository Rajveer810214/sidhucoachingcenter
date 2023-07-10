import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/page.module.css';

function Home() {
  const [askquery, setAskQuery] = useState('');
  const handleAskQuery = (e) => {
    setAskQuery(e.target.value);
  };
  const [query, setQuery] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      setQuery(false);
    } else {
      setQuery(true);
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/addquery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('auth-token') },
      body: JSON.stringify({ askquery }),
    });
    await response.json();
    window.alert('Your query is send successfully');
    setAskQuery('');
  };
  return (
    <div className="container" style={{ marginTop: '16px' }}>
      <style jsx>
        {`
        .accordion-item {
          border:1px solid black
        }
        .accordion-button{
            font-size: 18px
        }
      `}

      </style>
      {!query
        ? (
          <div className="alert alert-danger" role="alert">
            Register your account For asking question
          </div>
        )
        : (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <span className="input-group-text">Ask your query</span>
              <textarea className="form-control" value={askquery} onChange={handleAskQuery} aria-label="With textarea" />
            </div>
            <button type="submit" className="btn btn-dark d-flex float-end my-2">Submit</button>
          </form>
        ) }

      <div className="accordion" id="accordionExample" style={{ marginTop: '82px' }}>
        <h1 className={styles.homeh1}>Choose your Standard</h1>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Class 10th
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              {' '}
              <Link href="./components/class10"> Go to Class 10th</Link>
              {' '}

            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Class +1
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              {' '}
              <Link href="./components/class11"> Go to Class +1</Link>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Class +2
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              {' '}
              <Link href="./components/class12">Go to Class +2</Link>

              {' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
