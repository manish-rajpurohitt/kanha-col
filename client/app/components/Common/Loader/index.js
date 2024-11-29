// GlobalLoader.js
import React from 'react';
import './Loader.css'; // Style for loader

const Loader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loader-overlay">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
