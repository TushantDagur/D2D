import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(res => setMessage(res.data.message))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <h1>D2D — On-Demand Healthcare</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}

export default App;
