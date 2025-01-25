import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-purple text-cream">
        <div className="text-xl font-bold">EmailReader</div>
        <div className="space-x-4">
          <ScrollLink
            to="home"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:underline"
          >
            Home
          </ScrollLink>
          <ScrollLink
            to="features"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:underline"
          >
            Features
          </ScrollLink>
          <RouterLink to="/login" className="hover:underline">
            Login
          </RouterLink>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        id="home"
        className="relative flex flex-col items-center justify-center h-screen bg-cover bg-center text-center text-cream"
        style={{
          backgroundImage: "url(/src/assets/read.gif)",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4">Simplify Your Inbox</h1>
          <p className="text-lg mb-6">
            Automate email sorting, batch unsubscribe, and focus on what matters.
          </p>
          <div className="space-x-4">
            {/* Get Started Button: Navigates to Login */}
            <RouterLink
              to="/login"
              className="bg-purple text-cream px-6 py-2 rounded hover:bg-blue-600"
            >
              Get Started
            </RouterLink>
            {/* Learn More Button: External Link */}
            <a
              href="https://example.com/learn-more"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
            >
              Learn More
            </a>
          </div>
        </div>
      </header>

      {/* How-to-Use Section */}
      <section id="features" className="py-16 bg-white text-center">
        <h2 className="text-purple text-3xl font-bold mb-8">How to Use</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-purple text-4xl mb-4">🔗</div>
            <h3 className="text-purple text-xl font-semibold mb-2">Connect Your Inbox</h3>
            <p className="text-black">
              Connect Gmail, Outlook, or any email service.
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-purple text-4xl mb-4">⚙️</div>
            <h3 className="text-purple text-xl font-semibold mb-2">Apply Filters</h3>
            <p className="text-black">
              Automatically sort emails by category.
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-purple text-4xl mb-4">📂</div>
            <h3 className="text-purple text-xl font-semibold mb-2">Stay Organized</h3>
            <p className="text-black">
              Focus on important emails while we manage the rest.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
