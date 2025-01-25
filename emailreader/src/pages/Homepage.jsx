import React from 'react';

const Homepage = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-blue-500 text-white">
        <div className="text-xl font-bold">EmailReader</div>
        <div className="space-x-4">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#features" className="hover:underline">Features</a>
          <a href="#login" className="hover:underline">Login</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gray-100 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Simplify Your Inbox</h1>
        <p className="text-lg text-gray-700 mb-6">
          Automate email sorting, batch unsubscribe, and focus on what matters.
        </p>
        <div className="space-x-4">
          <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            Get Started
          </button>
          <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400">
            Learn More
          </button>
        </div>
      </header>

      {/* How-to-Use Section */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-2xl font-bold mb-8">How to Use</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div>
            <div className="text-blue-500 text-4xl mb-4">🔗</div>
            <h3 className="text-xl font-semibold mb-2">Connect Your Inbox</h3>
            <p className="text-gray-600">Connect Gmail, Outlook, or any email service.</p>
          </div>
          <div>
            <div className="text-blue-500 text-4xl mb-4">⚙️</div>
            <h3 className="text-xl font-semibold mb-2">Apply Filters</h3>
            <p className="text-gray-600">Automatically sort emails by category.</p>
          </div>
          <div>
            <div className="text-blue-500 text-4xl mb-4">📂</div>
            <h3 className="text-xl font-semibold mb-2">Stay Organized</h3>
            <p className="text-gray-600">Focus on important emails while we manage the rest.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
