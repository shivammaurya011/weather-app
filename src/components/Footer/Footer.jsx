import React from 'react';

function Footer() {
  return (
    <footer className="text-center p-4 mt-auto transition duration-500">
      <p className="dark:text-white">
        &copy; {new Date().getFullYear()} Weather App. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
