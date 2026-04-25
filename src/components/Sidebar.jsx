import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Menu, X } from "lucide-react";
import { clsx } from "clsx";
import NotificationBox from "./NotificationBox";

const NAV = {
  STUDENT: [
    { to: "/student/dashboard",    icon: "🏠", label: "Dashboard" },
    { to: "/student/internships",  icon: "🔍", label: "Browse Internships" },
    { to: "/student/applications", icon: "📋", label: "My Applications" },
    { to: "/student/reports",      icon: "📝", label: "Weekly Reports" },
    { to: "/student/evaluations",  icon: "⭐", label: "My Evaluations" },
    { to: "/student/certificates", icon: "🎓", label: "Certificates" },
  ],
  COMPANY: [
    { to: "/company/dashboard",     icon: "🏠", label: "Dashboard" },
    { to: "/company/internships",   icon: "💼", label: "My Internships" },
    { to: "/company/applications",  icon: "📋", label: "Applications" },
    { to: "/company/collaboration", icon: "🤝", label: "Collaborations" },
  ],
  SUPERVISOR: [
    { to: "/supervisor/dashboard",   icon: "🏠", label: "Dashboard" },
    { to: "/supervisor/students",    icon: "👥", label: "My Students" },
    { to: "/supervisor/reports",     icon: "📝", label: "Review Reports" },
    { to: "/supervisor/evaluations", icon: "⭐", label: "Evaluations" },
  ],
  INSTITUTION: [
    { to: "/institution/dashboard",    icon: "🏠", label: "Dashboard" },
    { to: "/institution/students",     icon: "👥", label: "Student Monitoring" },
    { to: "/institution/reports",      icon: "📊", label: "Reports" },
    { to: "/institution/certificates", icon: "🎓", label: "Certificates" },
  ],
  GOVERNMENT: [
    { to: "/government/dashboard", icon: "🏛️", label: "National Dashboard" },
    { to: "/government/stats",     icon: "📊", label: "Analytics" },
  ],
  ADMIN: [
    { to: "/admin/dashboard",          icon: "🏠",  label: "Dashboard" },
    { to: "/admin/users",              icon: "👥",  label: "User Management" },
    { to: "/admin/assign-supervisor",  icon: "👨‍🏫", label: "Assign Supervisors" },
    { to: "/admin/internships",        icon: "💼",  label: "Internships" },
    { to: "/admin/applications",       icon: "📋",  label: "Applications" },
    { to: "/admin/certificates",       icon: "🎓",  label: "Certificates" },
  ],
};

const ROLE_LABEL = {
  STUDENT:     "Student Portal",
  COMPANY:     "Company Portal",
  SUPERVISOR:  "Supervisor Portal",
  INSTITUTION: "Institution Portal",
  GOVERNMENT:  "Government Portal",
  ADMIN:       "Admin Panel",
};

const ROLE_COLOR = {
  STUDENT:     "from-blue-700 to-blue-900",
  COMPANY:     "from-emerald-700 to-emerald-900",
  SUPERVISOR:  "from-purple-700 to-purple-900",
  INSTITUTION: "from-orange-700 to-orange-900",
  GOVERNMENT:  "from-slate-700 to-slate-900",
  ADMIN:       "from-red-700 to-red-900",
};

// ── Mobile Top Bar ──────────────────────────────────────
export function MobileTopBar({ onOpen }) {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const bgGrad = ROLE_COLOR[user?.role] || "from-gray-700 to-gray-900";

  return (
    <div className={clsx(
      "lg:hidden flex items-center justify-between px-4 py-3 bg-gradient-to-r text-white sticky top-0 z-30 shadow-md",
      bgGrad
    )}>
      <div className="flex items-center gap-3">
        <button
          onClick={onOpen}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <div>
          <p className="font-bold text-sm leading-none">NDIMS</p>
          <p className="text-xs text-white/60">{ROLE_LABEL[user?.role]}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {user && <NotificationBox />}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </div>
  );
}

// ── Sidebar Content ─────────────────────────────────────
function SidebarContent({ collapsed, onClose }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const items = NAV[user?.role] || [];
  const bgGrad = ROLE_COLOR[user?.role] || "from-gray-700 to-gray-900";

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/login");
    }
  };

  return (
    <div className={clsx(
      `flex flex-col bg-gradient-to-b ${bgGrad} text-white h-full transition-all duration-300`,
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/10 flex-shrink-0">
        {!collapsed && (
          <div className="min-w-0">
            <p className="font-bold text-sm truncate">NDIMS</p>
            <p className="text-xs text-white/60 truncate">{ROLE_LABEL[user?.role]}</p>
          </div>
        )}
        <div className="flex items-center gap-1">
          {/* Show close button on mobile (when onClose is provided) */}
          {onClose ? (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors lg:hidden"
            >
              <X size={18} />
            </button>
          ) : null}
          {user && !onClose && <NotificationBox />}
          {!onClose && (
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              title={theme === "light" ? "Switch to Dark" : "Switch to Light"}
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          )}
          {/* Collapse toggle — desktop only */}
          {!onClose && (
            <button
              onClick={() => {}}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors flex-shrink-0 hidden lg:flex"
            >
              {collapsed ? "▶" : "◀"}
            </button>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            title={collapsed ? item.label : undefined}
            onClick={onClose}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 px-4 py-3 text-sm transition-colors mx-2 rounded-lg mb-0.5",
                isActive
                  ? "bg-white/20 text-white font-medium"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )
            }
          >
            <span className="text-base flex-shrink-0">{item.icon}</span>
            {!collapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User Footer */}
      <div className="border-t border-white/10 p-4 flex-shrink-0">
        {!collapsed && (
          <div className="mb-3">
            <p className="text-xs text-white/40 truncate">{user?.email}</p>
            <span className="inline-block mt-1 text-xs bg-white/10 text-white/70 px-2 py-0.5 rounded-full">
              {user?.role}
            </span>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-white/60 hover:text-red-300 transition-colors w-full"
          title="Logout"
        >
          <span className="text-base">🚪</span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}

// ── Main Sidebar Export ─────────────────────────────────
export default function Sidebar({ mobileOpen, onMobileClose }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    if (onMobileClose) onMobileClose();
  }, [location.pathname]);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={clsx(
          "hidden lg:flex flex-col min-h-screen flex-shrink-0 transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="relative h-full" onClick={(e) => {
          // Toggle collapse when clicking the collapse button area
          if (e.target.closest('.collapse-btn')) setCollapsed(c => !c);
        }}>
          <SidebarContent collapsed={collapsed} onClose={null} />
          {/* Collapse toggle overlay button */}
          <button
            className="collapse-btn absolute top-5 right-3 p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors z-10"
            onClick={() => setCollapsed(c => !c)}
          >
            {collapsed ? "▶" : "◀"}
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Mobile Drawer */}
      <div className={clsx(
        "fixed top-0 left-0 h-full z-50 lg:hidden transform transition-transform duration-300",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <SidebarContent collapsed={false} onClose={onMobileClose} />
      </div>
    </>
  );
}
