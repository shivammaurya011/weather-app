import React, { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';

function App() {
  const [location, setLocation] = useState(null);

  const handleLocationChange = (location) => {
    setLocation(location);
  };

  return (
    <div className="bg-gradient-to-r from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-800 min-h-screen transition duration-500">
      <Header onLocationChange={handleLocationChange} />
      <Home location={location} />
      <Footer />
    </div>
  );
}

export default App;
