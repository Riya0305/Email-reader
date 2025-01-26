import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:5001/api/login", {
        email,
        password,
      });
      setSuccess(response.data.message);
      localStorage.setItem("token", response.data.token);
      navigate("/success", { state: { user: response.data.user } });
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const response = await axios.post("http://localhost:5001/api/google-login", {
        token: credentialResponse.credential,
      });

      setSuccess(response.data.message);
      localStorage.setItem("token", response.data.token);

      // Redirect to SuccessPage with user data
      navigate("/success", { state: { user: response.data.user } });
    } catch (err) {
      setError("Google sign-in failed.");
    }
  };

  return (
    <GoogleOAuthProvider clientId="807669090767-llgvrlojm7amhibj90u0baqit39f4rh0.apps.googleusercontent.com">
      <div className="h-screen bg-gray-100">
        {/* Go Back Section */}
        <div className="flex items-center p-4">
          <button
            className="flex items-center text-purple hover:text-blue-700"
            onClick={() => navigate(-1)}
          >
            <span className="mr-2">←</span> Go Back
          </button>
        </div>

        {/* Login Form Section */}
        <div className="flex items-center justify-center h-full">
          <form
            onSubmit={handleLogin}
            className="bg-white p-8 rounded-lg shadow-md w-96"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {success && <p className="text-green-500 text-center mb-4">{success}</p>}

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple text-white p-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
            <div className="mt-4 text-center">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => setError("Google Sign-In failed.")}
              />
            </div>
          </form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
