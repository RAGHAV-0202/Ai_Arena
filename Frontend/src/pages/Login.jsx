import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../baseUrl";
import Silk from "../UI/Components/Silk";
import Particles from "../UI/Components/Particles.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    login: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(baseUrl + "/auth/login", form, {
        withCredentials: true,
      });
      setMessage(res.data.message || "Login successful");
      navigate("/chat");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={300}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={2}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Left: Hero / Branding */}
      <div className="hidden md:flex w-[45%] h-[92vh] rounded-2xl overflow-hidden relative shadow-xl">
        <Silk speed={4} scale={1.1} color="#6b7280" noiseIntensity={1.5} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-10 left-10">
          <h1 className="text-4xl font-semibold text-white leading-tight">
            Welcome Back
          </h1>
          <p className="text-gray-300 mt-2">
            Sign in to continue your journey
          </p>
        </div>
      </div>

      {/* Right: Login Card */}
      <div className="w-full md:w-[40%] flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-md p-10">
          <h2 className="text-3xl font-semibold text-white text-center mb-1">
            Sign In
          </h2>
          <p className="text-gray-400 text-center mb-6 text-sm">
            Enter your details to access your account
          </p>

          {message && (
            <p className="mb-4 text-center text-red-400 text-sm">{message}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="login"
              name="login"
              placeholder="Email"
              value={form.login}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            <p>
              Don’t have an account?{" "}
              <a href="/register" className="text-indigo-400 hover:underline">
                Sign up
              </a>
            </p>
            <p className="mt-2">
              {/* <a
                href="/forgot-password"
                className="hover:underline text-gray-300"
              >
                Forgot password?
              </a> */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
