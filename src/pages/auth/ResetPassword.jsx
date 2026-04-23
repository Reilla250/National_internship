import React, { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { authAPI } from "../../services/api";
import { Button, Input, Card } from "../../components/UI";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useBackgroundSlideshow } from "../../hooks/useBackgroundSlideshow";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { backgroundStyle, imageLoaded } = useBackgroundSlideshow();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return toast.error("Passwords do not match");
    if (!token) return toast.error("Invalid or missing reset token");

    setLoading(true);
    try {
      await authAPI.resetPassword({ token, password });
      toast.success("Password reset successfully! Please login.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
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
      
      <div className="relative z-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-md w-full p-8 transition-all duration-300">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">🛡️</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reset Password</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            Please choose a strong new password to secure your account.
          </p>
        </div>

        {!token ? (
          <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-center">
            <p className="text-red-800 text-sm font-medium">Invalid Link</p>
            <p className="text-red-600 text-xs mt-1">The reset link is missing or invalid.</p>
            <Link to="/forgot-password">
              <Button className="mt-4 w-full" variant="secondary">Request New Link</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="New Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <Input
              label="Confirm New Password"
              type={showPassword ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
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
            <Button type="submit" className="w-full" loading={loading}>
              Reset Password
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
