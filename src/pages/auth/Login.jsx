import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authAPI } from "../../services/api";
import { Button, Input } from "../../components/UI";
import { Eye, EyeOff } from "lucide-react";
import { useBackgroundSlideshow } from "../../hooks/useBackgroundSlideshow";

export default function Login() {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const [form, setForm]     = useState({ email: "", password: "" });
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { backgroundStyle, imageLoaded } = useBackgroundSlideshow();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await authAPI.login(form);
      login(data);
      const routes = {
        STUDENT: "/student/dashboard",
        COMPANY: "/company/dashboard",
        SUPERVISOR: "/supervisor/dashboard",
        INSTITUTION: "/institution/dashboard",
        GOVERNMENT: "/government/dashboard",
        ADMIN: "/admin/dashboard",
      };
      navigate(routes[data.role] || "/");
    } catch (err) {
      if (!err.response) {
        setError("Server is offline. Please start the Backend in IntelliJ.");
      } else {
        setError(err.response.data?.message || "Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Auto-playing background slideshow */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-in-out"
        style={backgroundStyle}
      />
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="relative z-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-md p-8 transition-all duration-300">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
            🎓
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">NDIMS</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">National Digital Internship Management System</p>
          
          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 text-blue-700 text-xs rounded-lg p-3 mb-4">
            <p className="font-semibold text-center">🔒 PRODUCTION SYSTEM</p>
            <p className="text-center mt-1">All accounts must be created through registration. No demo accounts available.</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            suffix={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-primary-600 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />
          <div className="flex justify-end">
            <Link to="/forgot-password" size="sm" className="text-xs text-primary-600 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <Button type="submit" className="w-full" size="lg" loading={loading}>
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
