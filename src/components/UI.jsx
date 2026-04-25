import React from "react";
import { clsx } from "clsx";

// ── Button ────────────────────────────────────────────
export function Button({ children, variant = "primary", size = "md", className, loading, ...props }) {
  const base = "inline-flex items-center justify-center font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary:   "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700",
    danger:    "bg-red-600 text-white hover:bg-red-700",
    ghost:     "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
    success:   "bg-emerald-600 text-white hover:bg-emerald-700",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-5 py-2.5 text-sm gap-2 sm:px-6 sm:py-3 sm:text-base",
  };

  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin flex-shrink-0" />
      )}
      {children}
    </button>
  );
}

// ── Input ─────────────────────────────────────────────
export function Input({ label, error, className, suffix, ...props }) {
  return (
    <div className="w-full">
      {label && <label className="label">{label}</label>}
      <div className="relative group">
        <input
          className={clsx(
            "input",
            suffix && "pr-10",
            error && "border-red-400 focus:ring-red-400",
            className
          )}
          {...props}
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {suffix}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

// ── Textarea ──────────────────────────────────────────
export function Textarea({ label, error, className, ...props }) {
  return (
    <div className="w-full">
      {label && <label className="label">{label}</label>}
      <textarea
        rows={4}
        className={clsx("input resize-none", error && "border-red-400", className)}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

// ── Select ────────────────────────────────────────────
export function Select({ label, error, children, className, ...props }) {
  return (
    <div className="w-full">
      {label && <label className="label">{label}</label>}
      <select
        className={clsx("input bg-white dark:bg-gray-800", error && "border-red-400", className)}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

// ── Card ──────────────────────────────────────────────
export function Card({ children, className, ...props }) {
  return (
    <div className={clsx("card", className)} {...props}>
      {children}
    </div>
  );
}

// ── Badge ─────────────────────────────────────────────
export function Badge({ children, status }) {
  const map = {
    PENDING:   "badge-warning",
    ACCEPTED:  "badge-success",
    REJECTED:  "badge-danger",
    APPROVED:  "badge-success",
    OPEN:      "badge-info",
    CLOSED:    "badge-gray",
    ACTIVE:    "badge-success",
    COMPLETED: "badge-gray",
    default:   "badge-gray",
  };
  return <span className={map[status] || map.default}>{children || status}</span>;
}

// ── Modal ─────────────────────────────────────────────
export function Modal({ open, isOpen, onClose, title, children, size = "md" }) {
  const isModalOpen = open || isOpen;
  if (!isModalOpen) return null;
  const sizes = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className={clsx(
          "bg-white dark:bg-gray-800 w-full sm:rounded-2xl shadow-xl flex flex-col",
          "rounded-t-2xl sm:rounded-2xl",
          "max-h-[90vh] sm:max-h-[85vh]",
          sizes[size]
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b dark:border-gray-700 flex-shrink-0">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white pr-4 truncate">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl leading-none flex-shrink-0 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>
        {/* Scrollable body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}

// ── Spinner ───────────────────────────────────────────
export function Spinner({ size = "md" }) {
  const sizes = { sm: "w-4 h-4", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <div
      className={clsx(
        "border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin",
        sizes[size]
      )}
    />
  );
}

// ── Empty State ───────────────────────────────────────
export function Empty({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center px-4">
      <div className="text-4xl sm:text-5xl mb-4">{icon || "📭"}</div>
      <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {title || "Nothing here yet"}
      </h3>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">{description}</p>
      )}
    </div>
  );
}

// ── Stats Card ────────────────────────────────────────
export function StatCard({ icon, label, value, color = "blue" }) {
  const colors = {
    blue:   "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
    green:  "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
    yellow: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400",
    purple: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
    red:    "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
  };
  return (
    <Card className="!p-4 sm:!p-6">
      <div className="flex items-center gap-3 sm:gap-4">
        <div
          className={clsx(
            "w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0 transition-colors",
            colors[color]
          )}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{label}</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{value ?? "—"}</p>
        </div>
      </div>
    </Card>
  );
}

// ── Responsive Table Wrapper ──────────────────────────
export function TableWrapper({ children }) {
  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0 rounded-none sm:rounded-lg">
      <div className="min-w-full inline-block align-middle">
        {children}
      </div>
    </div>
  );
}
