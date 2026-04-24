import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

// Auth
import Login    from "./pages/auth/LoginModern";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Student
import StudentDashboard    from "./pages/student/Dashboard";
import BrowseInternships   from "./pages/student/BrowseInternships";
import StudentApplications from "./pages/student/Applications";
import StudentReports      from "./pages/student/Reports";
import StudentEvaluations  from "./pages/student/Evaluations";
import StudentCertificates from "./pages/student/Certificates";

// Company
import CompanyDashboard     from "./pages/company/Dashboard";
import CompanyInternships   from "./pages/company/Internships";
import CompanyApplications  from "./pages/company/Applications";
import CompanyCollaboration from "./pages/company/Collaboration";

// Supervisor
import SupervisorDashboard   from "./pages/supervisor/Dashboard";
import SupervisorStudents    from "./pages/supervisor/Students";
import SupervisorReports     from "./pages/supervisor/Reports";
import SupervisorEvaluations from "./pages/supervisor/Evaluations";

// Institution
import InstitutionDashboard from "./pages/institution/Dashboard";
import InstitutionStudents  from "./pages/institution/Students";

// Government
import GovernmentDashboard from "./pages/government/Dashboard";

// Admin
import AdminDashboard from "./pages/admin/Dashboard";

function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-50">
      <div className="text-6xl">🚫</div>
      <h1 className="text-2xl font-bold text-gray-800">Access Denied</h1>
      <p className="text-gray-500">You don't have permission to view this page.</p>
      <a href="/login" className="text-primary-600 hover:underline text-sm">← Back to Login</a>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
          <Routes>
            {/* Public */}
            <Route path="/"             element={<Navigate to="/login" replace />} />
            <Route path="/login"        element={<Login />} />
            <Route path="/register"     element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password"  element={<ResetPassword />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Student */}
            <Route element={<ProtectedRoute roles={["STUDENT"]} />}>
              <Route element={<Layout />}>
                <Route path="/student/dashboard"    element={<StudentDashboard />} />
                <Route path="/student/internships"  element={<BrowseInternships />} />
                <Route path="/student/applications" element={<StudentApplications />} />
                <Route path="/student/reports"      element={<StudentReports />} />
                <Route path="/student/evaluations"  element={<StudentEvaluations />} />
                <Route path="/student/certificates" element={<StudentCertificates />} />
              </Route>
            </Route>

            {/* Company */}
            <Route element={<ProtectedRoute roles={["COMPANY"]} />}>
              <Route element={<Layout />}>
                <Route path="/company/dashboard"     element={<CompanyDashboard />} />
                <Route path="/company/internships"   element={<CompanyInternships />} />
                <Route path="/company/applications"  element={<CompanyApplications />} />
                <Route path="/company/collaboration" element={<CompanyCollaboration />} />
              </Route>
            </Route>

            {/* Supervisor */}
            <Route element={<ProtectedRoute roles={["SUPERVISOR"]} />}>
              <Route element={<Layout />}>
                <Route path="/supervisor/dashboard"   element={<SupervisorDashboard />} />
                <Route path="/supervisor/students"    element={<SupervisorStudents />} />
                <Route path="/supervisor/reports"     element={<SupervisorReports />} />
                <Route path="/supervisor/evaluations" element={<SupervisorEvaluations />} />
              </Route>
            </Route>

            {/* Institution */}
            <Route element={<ProtectedRoute roles={["INSTITUTION"]} />}>
              <Route element={<Layout />}>
                <Route path="/institution/dashboard"    element={<InstitutionDashboard />} />
                <Route path="/institution/students"     element={<InstitutionStudents />} />
                <Route path="/institution/reports"      element={<InstitutionStudents />} />
                <Route path="/institution/certificates" element={<InstitutionDashboard />} />
              </Route>
            </Route>

            {/* Government */}
            <Route element={<ProtectedRoute roles={["GOVERNMENT"]} />}>
              <Route element={<Layout />}>
                <Route path="/government/dashboard" element={<GovernmentDashboard />} />
                <Route path="/government/stats"     element={<GovernmentDashboard />} />
              </Route>
            </Route>

            {/* Admin */}
            <Route element={<ProtectedRoute roles={["ADMIN"]} />}>
              <Route element={<Layout />}>
                <Route path="/admin/dashboard"    element={<AdminDashboard />} />
                <Route path="/admin/users"        element={<AdminDashboard />} />
                <Route path="/admin/internships"  element={<CompanyInternships />} />
                <Route path="/admin/applications" element={<CompanyApplications />} />
                <Route path="/admin/certificates" element={<InstitutionDashboard />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
