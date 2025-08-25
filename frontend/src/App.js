import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(res => setMessage(res.data.message))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <Navbar />
      <main className="text-center p-8">
        <h1 className="text-3xl font-bold">D2D — On-Demand Healthcare</h1>
        <p className="mt-4">{message}</p>
      </main>
      <Footer />
    </div>
  );
}

export default App;
