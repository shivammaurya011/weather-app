import React, { useState, useEffect } from 'react';
import { FaLocationArrow, FaSearch, FaSun, FaMoon } from "react-icons/fa";

function Header({ onLocationChange }) {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onLocationChange(searchQuery);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationChange({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location", error);
          alert("Error getting your location. Please try again.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <header className="flex justify-between items-center py-2 px-8">
      <button
        onClick={toggleDarkMode}
        className="focus:outline-none w-20 py-2 px-4 border-4 border-white rounded-full flex items-center space-x-2"
      >
        {darkMode ? (
          <span className='w-full flex justify-end items-center'>
            <FaSun className="text-yellow-400" />
          </span>
        ) : (
          <span className='w-full flex justify-start items-center'>
            <FaMoon className="text-gray-400" />
          </span>
        )}
      </button>
      <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md mx-4">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-200" />
        <input
          type="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 pl-10 border rounded-full focus:outline-none bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
        />
      </form>
      <button
        onClick={handleCurrentLocation}
        className="flex items-center space-x-2 px-4 py-2 shadow-slate-500 hover:bg-green-600 bg-green-500 rounded-full focus:outline-none"
      >
        <FaLocationArrow />
        <span className='text-white font-semibold'>Current Location</span>
      </button>
    </header>
  );
}

export default Header;
