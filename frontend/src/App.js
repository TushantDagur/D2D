import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(res => setMessage(res.data.message))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <section className="py-12 container mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-800">Our Services</h2>
          <p className="mt-2 text-gray-600">Quick, reliable, and verified medical services at your doorstep.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
