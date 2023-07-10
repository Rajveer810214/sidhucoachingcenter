import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function Addquery() {
  const router = useRouter();
  const [getquery, setgetquery] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('auth-token') === null) {
      router.push('/Register');
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getquery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('auth-token') },
        });
        const json = await response.json();
        setgetquery(json.success); // Set the entire received JSON array
      } catch (error) {
        console.error('Error fetching query:', error);
      }
    };

    fetchData();
  }, []);

  if (!Array.isArray(getquery) || getquery.length === 0) {
    return <div>No data available...</div>;
  }

  // Group the cards into rows with three cards per row
  const rows = [];
  for (let i = 0; i < getquery.length; i += 3) {
    const row = getquery.slice(i, i + 3);
    rows.push(row);
  }

  return (
    <div className="container" style={{ marginTop: '96px' }}>
      <h1 style={{ textAlign: 'center' }}>Your Queries</h1>
      {rows.map((row, index) => (
        <div className="row" key={index.id}>
          {row.map((query) => (
            <div className="col-sm-4 mb-3 mb-sm-0" key={query.id}>
              <div className="card">
                <div className="card-body">
                  <p className="card-title">
                    <strong>Question: </strong>
                    {' '}
                    {query.query}
                  </p>
                  <p className="btn btn-secondary my-3">Wait for the response</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Addquery;
