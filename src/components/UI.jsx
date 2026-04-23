import React from "react";
import { clsx } from "clsx";

// ── Button ────────────────────────────────────────────
export function Button({ children, variant = "primary", size = "md", className, loading, ...props }) {
  const base = "inline-flex items-center justify-center font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary:   "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
    danger:    "bg-red-600 text-white hover:bg-red-700",
    ghost:     "text-gray-600 hover:bg-gray-100",
    success:   "bg-emerald-600 text-white hover:bg-emerald-700",
  };
  const sizes = { sm: "px-3 py-1.5 text-sm gap-1.5", md: "px-4 py-2 text-sm gap-2", lg: "px-6 py-3 text-base gap-2" };

  return (
    <button className={clsx(base, variants[variant], sizes[size], className)} disabled={loading || props.disabled} {...props}>
      {loading && <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
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
      <select className={clsx("input bg-white", error && "border-red-400", className)} {...props}>
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
    PENDING:  "badge-warning",
    ACCEPTED: "badge-success",
    REJECTED: "badge-danger",
    APPROVED: "badge-success",
    OPEN:     "badge-info",
    CLOSED:   "badge-gray",
    ACTIVE:   "badge-success",
    COMPLETED:"badge-gray",
    default:  "badge-gray",
  };
  return <span className={map[status] || map.default}>{children || status}</span>;
}

// ── Modal ─────────────────────────────────────────────
export function Modal({ open, isOpen, onClose, title, children, size = "md" }) {
  const isModalOpen = open || isOpen;
  if (!isModalOpen) return null;
  const sizes = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className={clsx("bg-white rounded-2xl shadow-xl w-full", sizes[size])}>
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ── Spinner ───────────────────────────────────────────
export function Spinner({ size = "md" }) {
  const sizes = { sm: "w-4 h-4", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <div className={clsx("border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin", sizes[size])} />
  );
}

// ── Empty State ───────────────────────────────────────
export function Empty({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-5xl mb-4">{icon || "📭"}</div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title || "Nothing here yet"}</h3>
      {description && <p className="text-sm text-gray-500 max-w-xs">{description}</p>}
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
    <Card>
      <div className="flex items-center gap-4">
        <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-colors", colors[color])}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value ?? "—"}</p>
        </div>
      </div>
    </Card>
  );
}
