// Redesigned Header.jsx using Tailwind CSS

import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
          DE Project
        </h1>
        <nav className="space-x-6 text-sm font-medium text-gray-600">
          <a href="/" className="hover:text-black transition-colors">Home</a>
          <a href="/about" className="hover:text-black transition-colors">About</a>
          <a href="/sell" className="hover:text-black transition-colors">Sell</a>
          <a href="/admin" className="hover:text-black transition-colors">Admin</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

