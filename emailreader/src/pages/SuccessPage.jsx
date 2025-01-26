import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Access the user data passed via state
  const user = location.state?.user;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-purple text-center">
      <h1 className="text-4xl font-bold mb-4 text-cream">
        Welcome, {user?.name || "User"}!
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        You have successfully logged in through Google.
      </p>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Go to Homepage
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
