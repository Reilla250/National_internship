import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authAPI } from "../../services/api";
import { Button, Input } from "../../components/UI";
import { Eye, EyeOff, Mail, Lock, User, Briefcase, GraduationCap, Building, Shield } from "lucide-react";
import heroBg from "../../assets/images/auth-bg.png";

export default function LoginModern() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

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
        setError("Unable to connect to server. Please check your connection.");
      } else {
        setError(err.response.data?.message || "Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  const roleIcons = {
    STUDENT: <GraduationCap className="w-5 h-5" />,
    COMPANY: <Briefcase className="w-5 h-5" />,
    SUPERVISOR: <User className="w-5 h-5" />,
    INSTITUTION: <Building className="w-5 h-5" />,
    GOVERNMENT: <Shield className="w-5 h-5" />,
    ADMIN: <Shield className="w-5 h-5" />
  };

  return (
    <div className="min-h-screen bg-pattern-animated flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Professional hero background */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={heroBg} 
          alt="Hero Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
      </div>

      {/* Main login card */}
      <div className={`relative z-10 w-full max-w-5xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        <div className="grid md:grid-cols-2 gap-0">
          
          {/* Left side - Branding */}
          <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-primary-600 to-primary-800 text-white p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">NDIMS</h1>
                  <p className="text-primary-100 text-sm">National Digital Internship Management System</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-3xl font-bold leading-tight">Welcome Back</h2>
                <p className="text-primary-100 leading-relaxed">
                  Sign in to access your internship dashboard, manage applications, 
                  track progress, and connect with opportunities.
                </p>
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(roleIcons).slice(0, 4).map(([role, icon]) => (
                  <div key={role} className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-lg p-3">
                    {icon}
                    <span className="text-sm capitalize">{role.toLowerCase()}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-white/5 rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/5 rounded-full"></div>
          </div>

          {/* Right side - Login form */}
          <div className="p-12">
            <div className="max-w-sm mx-auto">
              
              {/* Mobile logo */}
              <div className="md:hidden flex items-center justify-center gap-3 mb-8">
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">NDIMS</h1>
                  <p className="text-gray-500 text-sm">Internship Portal</p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sign In</h2>
                <p className="text-gray-600 dark:text-gray-400">Enter your credentials to access your account</p>
              </div>

              {/* Error message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-sm animate-fade-in">
                  <div className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">⚠️</span>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email field */}
                <div className={`transition-all duration-300 ${focusedField === 'email' ? 'transform scale-105' : ''}`}>
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    placeholder="Enter your email"
                    required
                    className="transition-all duration-300"
                    suffix={
                      <Mail className={`w-5 h-5 transition-colors ${focusedField === 'email' ? 'text-primary-600' : 'text-gray-400'}`} />
                    }
                  />
                </div>

                {/* Password field */}
                <div className={`transition-all duration-300 ${focusedField === 'password' ? 'transform scale-105' : ''}`}>
                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    placeholder="Enter your password"
                    required
                    className="transition-all duration-300"
                    suffix={
                      <div className="flex items-center gap-2">
                        <Lock className={`w-5 h-5 transition-colors ${focusedField === 'password' ? 'text-primary-600' : 'text-gray-400'}`} />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-400 hover:text-primary-600 focus:outline-none transition-colors"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    }
                  />
                </div>

                {/* Forgot password link */}
                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                    Remember me
                  </label>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 hover:underline font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit button */}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" 
                  size="lg" 
                  loading={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              {/* Demo accounts section hidden as requested */}
              {/* 
              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                <p className="text-sm text-blue-800 dark:text-blue-200 font-medium mb-2">Demo Accounts:</p>
                <div className="space-y-1 text-xs text-blue-700 dark:text-blue-300">
                  <div><strong>Admin:</strong> admin@internship.com / admin123</div>
                  <div><strong>Student:</strong> student@internship.com / student123</div>
                  <div><strong>Company:</strong> company@internship.com / company123</div>
                </div>
              </div>
              */}


              {/* Register link */}
              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                Don't have an account?{" "}
                <Link 
                  to="/register" 
                  className="text-primary-600 dark:text-primary-400 font-semibold hover:underline transition-colors"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
