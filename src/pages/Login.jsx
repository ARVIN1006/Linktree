import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppHelper } from "../context/AppContext";
import Layout from "../components/Layout";
import * as LucideIcons from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useAppHelper();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login(username, password);

    if (result.success) {
      navigate("/admin");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      <div className="bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-sm border border-white/40">
        <div className="flex justify-center mb-6 text-primary">
          <LucideIcons.LockKeyhole size={48} />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 rounded-lg border border-white/50 bg-white/50 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all placeholder-gray-500 text-gray-800"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg border border-white/50 bg-white/50 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all placeholder-gray-500 text-gray-800"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-primary hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl flex justify-center items-center gap-2"
          >
            Masuk <LucideIcons.ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-6 flex justify-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors font-medium border-b border-transparent hover:border-primary pb-0.5"
          >
            <LucideIcons.ArrowLeft size={16} /> Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
