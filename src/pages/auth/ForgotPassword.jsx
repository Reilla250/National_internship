import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authAPI } from "../../services/api";
import { Button, Input, Card } from "../../components/UI";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAPI.forgotPassword({ email });
      setSent(true);
      toast.success("Reset link sent to your email");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">🔑</div>
          <h1 className="text-2xl font-bold text-gray-900">Forgot Password?</h1>
          <p className="text-gray-500 text-sm mt-2">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {sent ? (
          <div className="bg-green-50 border border-green-100 p-4 rounded-xl text-center">
            <p className="text-green-800 text-sm font-medium">Reset link sent!</p>
            <p className="text-green-600 text-xs mt-1">Please check your email inbox (and spam folder).</p>
            <Button className="mt-4 w-full" onClick={() => setSent(false)}>Resend Email</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
            <Button type="submit" className="w-full" loading={loading}>
              Send Reset Link
            </Button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-primary-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </Card>
    </div>
  );
}
