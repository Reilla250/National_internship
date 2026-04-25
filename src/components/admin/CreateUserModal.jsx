import React, { useState } from "react";
import { adminAPI, institutionAPI } from "../../services/api";
import { Button, Input, Select, Modal } from "../../components/UI";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const ROLES = ["STUDENT", "COMPANY", "SUPERVISOR", "INSTITUTION", "GOVERNMENT", "ADMIN"];

export default function CreateUserModal({ isOpen, onClose, onUserCreated }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    roleName: "COMPANY",
    firstName: "",
    lastName: "",
    companyName: "",
    program: "",
    registrationNumber: "",
    phone: "",
    institutionId: null,
    companyId: null
  });
  const [companies, setCompanies] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      fetchCompanies();
      fetchInstitutions();
    }
  }, [isOpen]);

  const fetchInstitutions = async () => {
    try {
      const { data } = await institutionAPI.getAll();
      setInstitutions(data);
    } catch (err) {
      console.error("Failed to fetch institutions", err);
    }
  };

  const fetchCompanies = async () => {
    try {
      const { data } = await adminAPI.getCompanies();
      setCompanies(data);
    } catch (err) {
      console.error("Failed to fetch companies", err);
    }
  };

  const set = (e) => {
    const value = e.target.type === "number" ? (e.target.value ? parseInt(e.target.value) : null) : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      await adminAPI.createUser(form);
      toast.success("User created successfully");
      onUserCreated();
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setForm({
      email: "",
      password: "",
      roleName: "COMPANY",
      firstName: "",
      lastName: "",
      companyName: "",
      registrationNumber: "",
      phone: "",
      institutionId: null,
      companyId: null
    });
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal open={isOpen} onClose={handleClose} title="Create New User">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Select label="Role" name="roleName" value={form.roleName} onChange={set}>
          {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
        </Select>

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

        {(form.roleName === "STUDENT" || form.roleName === "SUPERVISOR" || form.roleName === "INSTITUTION") && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="First Name" name="firstName" value={form.firstName} onChange={set} required />
            <Input label="Last Name" name="lastName" value={form.lastName} onChange={set} required />
          </div>
        )}

        {form.roleName === "STUDENT" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select label="Institution" name="institutionId" value={form.institutionId || ""} onChange={set} required>
                <option value="">Select Institution...</option>
                {institutions.map(inst => (
                  <option key={inst.institutionId} value={inst.institutionId}>{inst.name}</option>
                ))}
              </Select>
              <Input label="Program / Field of Study" name="program" value={form.program} onChange={set} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Registration Number" name="registrationNumber" value={form.registrationNumber} onChange={set} required />
              <Input label="Phone Number" name="phone" value={form.phone} onChange={set} required />
            </div>
          </>
        )}

        {form.roleName === "SUPERVISOR" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select label="Assigned Company" name="companyId" value={form.companyId || ""} onChange={set}>
              <option value="">Select Company...</option>
              {companies.map(c => <option key={c.companyId} value={c.companyId}>{c.companyName}</option>)}
            </Select>
            <Select label="Institution" name="institutionId" value={form.institutionId || ""} onChange={set} required>
              <option value="">Select Institution...</option>
              {institutions.map(inst => (
                <option key={inst.institutionId} value={inst.institutionId}>{inst.name}</option>
              ))}
            </Select>
            <Input label="Phone Number" name="phone" value={form.phone || ""} onChange={set} />
          </div>
        )}

        {form.roleName === "INSTITUTION" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select label="Institution" name="institutionId" value={form.institutionId || ""} onChange={set} required>
              <option value="">Select Institution...</option>
              {institutions.map(inst => (
                <option key={inst.institutionId} value={inst.institutionId}>{inst.name}</option>
              ))}
            </Select>
            <Input label="Phone Number" name="phone" value={form.phone || ""} onChange={set} />
          </div>
        )}

        {form.roleName === "COMPANY" && (
          <Input label="Company Name" name="companyName" value={form.companyName} onChange={set} required />
        )}

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={handleClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" className="flex-1" loading={loading}>
            Create User
          </Button>
        </div>
      </form>
    </Modal>
  );
}
