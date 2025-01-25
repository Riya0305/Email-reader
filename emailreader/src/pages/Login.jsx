import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      // Send Google credential to your backend
      const response = await axios.post("http://localhost:5001/api/google-login", {
        token: credentialResponse.credential,
      });

      // Handle successful login
      setSuccess(response.data.message);
      localStorage.setItem("token", response.data.token);
      console.log("Google login successful:", response.data);
    } catch (err) {
      setError("Google sign-in failed.");
    }
  };

  return (
    <GoogleOAuthProvider clientId="807669090767-llgvrlojm7amhibj90u0baqit39f4rh0.apps.googleusercontent.com">
      <div className="flex items-center justify-center h-screen bg-gray-100">
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
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
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
    </GoogleOAuthProvider>
  );
};

export default Login;
