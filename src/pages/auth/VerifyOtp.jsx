import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { authAPI } from "../../services/api";
import { Button, Input } from "../../components/UI";
import { clsx } from "clsx";
import { useBackgroundSlideshow } from "../../hooks/useBackgroundSlideshow";

export default function VerifyOtp() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const [form, setForm] = useState({ email, otp: '' });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resending, setResending] = useState(false);
  const { backgroundStyle, imageLoaded } = useBackgroundSlideshow();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await authAPI.verifyOtp(form);
      console.log("OTP verification success:", res.data);
      setSuccess(true);
      setError("");
    } catch (err) {
      console.error("OTP verification error:", err);
      let errorMsg = "OTP verification failed";
      
      if (!err.response) {
        errorMsg = "Cannot connect to server. Please ensure the backend is running on port 8085.";
      } else if (err.response.status === 400) {
        errorMsg = err.response.data?.message || "Invalid OTP. Please try again.";
      } else if (err.response.status === 404) {
        errorMsg = "User not found. Please check your email address.";
      } else {
        errorMsg = err.response.data?.message || err.message || "OTP verification failed";
      }
      
      setError(typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setResending(true);
    try {
      const res = await authAPI.sendOtp({ email: form.email });
      console.log("OTP resend success:", res.data);
      setError("");
    } catch (err) {
      console.error("OTP resend error:", err);
      let errorMsg = "Failed to resend OTP";
      
      if (!err.response) {
        errorMsg = "Cannot connect to server. Please ensure the backend is running on port 8085.";
      } else if (err.response.status === 404) {
        errorMsg = "User not found. Please check your email address.";
      } else {
        errorMsg = err.response.data?.message || err.message || "Failed to resend OTP";
      }
      
      setError(typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg));
    } finally {
      setResending(false);
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
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🔐</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Verify Email</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Enter the OTP sent to your email</p>
        </div>

        {success ? (
          <div className="text-center">
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-6">
              <p className="font-semibold mb-2">Email Verified Successfully!</p>
              <p className="text-sm">Your email has been verified. You can now log in to your account.</p>
            </div>
            <Link to="/login">
              <Button className="w-full" size="lg">Go to Login</Button>
            </Link>
          </div>
        ) : (
          <>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 mb-4 flex items-start gap-2">
                <span className="mt-0.5">⚠️</span>
                <div className="flex-1">
                  <p className="font-medium">{error}</p>
                  <button 
                    onClick={() => setError("")} 
                    className="text-xs text-red-600 hover:text-red-800 underline mt-1"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input 
                label="Email Address" 
                type="email" 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
                required 
                disabled={!!email}
              />
              
              <Input 
                label="OTP Code" 
                type="text" 
                name="otp" 
                value={form.otp} 
                onChange={handleChange} 
                required 
                placeholder="Enter 6-digit code"
                maxLength={6}
              />

              <Button type="submit" className="w-full" size="lg" loading={loading}>
                Verify Email
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resending ? "Resending..." : "Didn't receive OTP? Resend"}
              </button>
            </div>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
              <Link to="/login" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
                Back to Login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
