import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI, institutionAPI } from "../../services/api";
import { Button, Input, Select } from "../../components/UI";
import { Eye, EyeOff } from "lucide-react";
import { clsx } from "clsx";

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
    firstName: "", lastName: "", program: "",
    institutionId: "", newInstitutionName: "", registrationNumber: "", phone: ""
  });
  const [institutions, setInstitutions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  React.useEffect(() => {
    institutionAPI.getAll()
      .then(res => {
        console.log("Fetched institutions:", res.data);
        setInstitutions(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => {
        console.error("Failed to load institutions", err);
        setError("Could not load institutions. Please check if the backend is running.");
      });
  }, []);

  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Build payload: if user typed a new institution, send name not id
      const payload = { ...form };
      if (form.institutionId === "NEW") {
        payload.institutionId = null;
      } else {
        payload.newInstitutionName = "";
      }
      console.log("Submitting registration:", payload);
      await authAPI.register(payload);
      setSuccess(true);
    } catch (err) {
      console.error("Registration error:", err);
      if (!err.response) {
        setError("Server is offline. Please start the Backend in IntelliJ.");
      } else {
        const errorMsg = err.response.data?.message || 
                        err.response.data || 
                        err.message || 
                        "Registration failed";
        setError(typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 flex items-center justify-center p-4 transition-colors duration-500">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg p-8 transition-all duration-300">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🎓</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Registration</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Create your account to access the NDIMS portal</p>
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
            
            <div className="flex gap-4 mb-6">
              <button type="button" onClick={() => setForm({...form, roleName: 'STUDENT'})} className={clsx("flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors", form.roleName === 'STUDENT' ? "bg-primary-600 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300")}>Student</button>
              <button type="button" onClick={() => setForm({...form, roleName: 'INSTITUTION'})} className={clsx("flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors", form.roleName === 'INSTITUTION' ? "bg-primary-600 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300")}>Institution Staff</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Email" type="email" name="email" value={form.email} onChange={set} required />
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={set}
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" name="firstName" value={form.firstName} onChange={set} required />
                <Input label="Last Name" name="lastName" value={form.lastName} onChange={set} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Select label="Institution" name="institutionId" value={form.institutionId} onChange={set} required>
                    <option value="">Select institution...</option>
                    {institutions.map(inst => (
                      <option key={inst.institutionId} value={inst.institutionId}>{inst.name}</option>
                    ))}
                    <option value="NEW">➕ Add New Institution...</option>
                  </Select>
                  {form.institutionId === "NEW" && (
                    <Input
                      label="New Institution Name"
                      name="newInstitutionName"
                      value={form.newInstitutionName}
                      onChange={set}
                      required
                      placeholder="e.g. University of Rwanda"
                      className="mt-2"
                    />
                  )}
                </div>
                {form.roleName === 'STUDENT' && (
                  <Select label="Program / Field" name="program" value={form.program} onChange={set} required>
                    <option value="">Select program...</option>
                    {PROGRAMS.map(p => <option key={p} value={p}>{p}</option>)}
                  </Select>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {form.roleName === 'STUDENT' && (
                  <Input label="Registration Number" name="registrationNumber" value={form.registrationNumber} onChange={set} required placeholder="e.g. 222001234" />
                )}
                <Input label="Phone Number" name="phone" value={form.phone} onChange={set} required placeholder="e.g. 078XXXXXXX" className={form.roleName === 'INSTITUTION' ? 'col-span-2' : ''} />
              </div>

              <Button type="submit" className="w-full" size="lg" loading={loading}>
                Create Account
              </Button>
            </form>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">Sign in</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
