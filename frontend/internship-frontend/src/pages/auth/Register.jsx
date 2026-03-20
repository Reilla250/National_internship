import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../../services/api";
import { Button, Input, Select } from "../../components/UI";

const PROGRAMS = [
  "Computer Science",
  "Software Engineering",
  "Information Technology",
  "Business Administration",
  "Accounting",
  "Marketing",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Medicine",
  "Nursing",
  "Law",
  "Education",
  "Psychology",
  "Economics",
  "Finance",
  "Human Resources",
  "Other"
];

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "", password: "", roleName: "STUDENT",
    firstName: "", lastName: "", program: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      console.log("Submitting registration:", form);
      await authAPI.register(form);
      setSuccess(true);
    } catch (err) {
      console.error("Registration error:", err);
      const errorMsg = err.response?.data?.message || 
                      err.response?.data || 
                      err.message || 
                      "Registration failed";
      setError(typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 to-primary-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🎓</div>
          <h1 className="text-2xl font-bold text-gray-900">Student Registration</h1>
          <p className="text-sm text-gray-500 mt-1">Create your student account to start applying for internships</p>
        </div>

        {success ? (
          <div className="text-center">
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-6">
              <p className="font-semibold mb-2">Registration Successful!</p>
              <p className="text-sm">Your student account has been created successfully.</p>
            </div>
            <Link to="/login">
              <Button className="w-full" size="lg">Go to Login</Button>
            </Link>
          </div>
        ) : (
          <>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 mb-4">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Email" type="email" name="email" value={form.email} onChange={set} required />
                <Input label="Password" type="password" name="password" value={form.password} onChange={set} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" name="firstName" value={form.firstName} onChange={set} required />
                <Input label="Last Name" name="lastName" value={form.lastName} onChange={set} required />
              </div>

              <Select label="Program / Field of Study" name="program" value={form.program} onChange={set} required>
                <option value="">Select a program...</option>
                {PROGRAMS.map(p => <option key={p} value={p}>{p}</option>)}
              </Select>

              <Button type="submit" className="w-full" size="lg" loading={loading}>
                Create Account
              </Button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-primary-600 font-medium hover:underline">Sign in</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
