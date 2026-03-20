import React, { useEffect, useState } from "react";
import { dashboardAPI } from "../../services/api";
import { StatCard, Card, Spinner } from "../../components/UI";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line
} from "recharts";

const COLORS = ["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6","#06b6d4","#ec4899","#84cc16"];

export default function GovernmentDashboard() {
  const [stats, setStats]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    dashboardAPI.getStats()
      .then(r => setStats(r.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  if (!stats)  return <p className="text-center text-gray-400 py-20">No data available</p>;

  const sectorData = Object.entries(stats.internshipsBySector || {})
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const placementRate = stats.totalStudents > 0
    ? ((stats.acceptedApplications / stats.totalStudents) * 100).toFixed(1)
    : 0;

  const applicationBreakdown = [
    { name: "Accepted", value: stats.acceptedApplications || 0 },
    { name: "Pending",  value: stats.pendingApplications  || 0 },
    { name: "Other",    value: Math.max(0, (stats.totalApplications || 0) - (stats.acceptedApplications || 0) - (stats.pendingApplications || 0)) },
  ].filter(d => d.value > 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="page-title mb-1">🏛️ National Internship Dashboard</h1>
        <p className="text-sm text-gray-500">Real-time analytics for workforce planning and national policy decisions</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {["overview","analytics","report"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
              tab === t ? "bg-primary-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}>{t}</button>
        ))}
      </div>

      {tab === "overview" && (
        <>
          {/* KPI Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard icon="👨‍🎓" label="Total Students"       value={stats.totalStudents}          color="blue" />
            <StatCard icon="💼"   label="Open Internships"    value={stats.openInternships}         color="green" />
            <StatCard icon="📋"   label="Total Applications"  value={stats.totalApplications}       color="yellow" />
            <StatCard icon="✅"   label="Successful Placements" value={stats.acceptedApplications}  color="purple" />
            <StatCard icon="🎓"   label="Certificates Issued" value={stats.totalCertificates}       color="green" />
            <StatCard icon="🤝"   label="Active Collaborations" value={stats.activeCollaborations}  color="blue" />
            <StatCard icon="📈"   label="Placement Rate"      value={`${placementRate}%`}           color="purple" />
            <StatCard icon="⏳"   label="Pending Review"      value={stats.pendingApplications}     color="yellow" />
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            {sectorData.length > 0 && (
              <Card>
                <h2 className="section-title">Internships by Sector</h2>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={sectorData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} label={{ position: "top", fontSize: 10 }} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            )}

            {applicationBreakdown.length > 0 && (
              <Card>
                <h2 className="section-title">Application Status Distribution</h2>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={applicationBreakdown} dataKey="value" nameKey="name"
                      cx="50%" cy="50%" outerRadius={95} label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`}>
                      {applicationBreakdown.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip /><Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            )}
          </div>
        </>
      )}

      {tab === "analytics" && (
        <div className="space-y-6">
          {sectorData.length > 0 && (
            <Card>
              <h2 className="section-title">Sector-wise Internship Distribution</h2>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={sectorData} layout="vertical" margin={{ left: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={90} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]}
                    label={{ position: "right", fontSize: 11 }} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          )}

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <h2 className="section-title">Platform Overview</h2>
              <div className="space-y-3">
                {[
                  { label: "Students Registered",      value: stats.totalStudents,          max: stats.totalStudents,    color: "bg-blue-500" },
                  { label: "Internships Available",     value: stats.openInternships,        max: stats.totalStudents,    color: "bg-green-500" },
                  { label: "Successful Placements",     value: stats.acceptedApplications,   max: stats.totalStudents,    color: "bg-purple-500" },
                  { label: "Certificates Issued",       value: stats.totalCertificates,      max: stats.totalStudents,    color: "bg-yellow-500" },
                ].map(row => (
                  <div key={row.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{row.label}</span>
                      <span className="font-bold text-gray-900">{row.value ?? 0}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-2 ${row.color} rounded-full transition-all`}
                        style={{ width: row.max > 0 ? `${Math.min(100, ((row.value || 0) / row.max) * 100)}%` : "0%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h2 className="section-title">Key Metrics Summary</h2>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Total Registered Students",  value: stats.totalStudents },
                  { label: "Open Internship Positions",  value: stats.openInternships },
                  { label: "Applications Submitted",     value: stats.totalApplications },
                  { label: "Applications Pending",       value: stats.pendingApplications },
                  { label: "Accepted Placements",        value: stats.acceptedApplications },
                  { label: "Certificates Issued",        value: stats.totalCertificates },
                  { label: "Active Collaborations",      value: stats.activeCollaborations },
                  { label: "Placement Rate",             value: `${placementRate}%` },
                ].map(row => (
                  <div key={row.label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                    <span className="text-gray-600">{row.label}</span>
                    <span className="font-bold text-primary-600 text-base">{row.value ?? "—"}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {tab === "report" && (
        <Card>
          <h2 className="section-title">📄 National Internship Statistical Report</h2>
          <p className="text-sm text-gray-500 mb-6">
            Generated: {new Date().toLocaleDateString("en-RW", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="space-y-6">
            <section>
              <h3 className="font-semibold text-gray-800 mb-3 text-base">1. Executive Summary</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                The National Digital Internship Management System (NDIMS) currently hosts{" "}
                <strong>{stats.totalStudents}</strong> registered students with{" "}
                <strong>{stats.openInternships}</strong> active internship positions available across{" "}
                {sectorData.length} industry sectors. A total of{" "}
                <strong>{stats.acceptedApplications}</strong> students have been successfully placed,
                representing a placement rate of <strong>{placementRate}%</strong>.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-gray-800 mb-3 text-base">2. Application Statistics</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-2 px-4 font-semibold text-gray-600">Metric</th>
                      <th className="text-right py-2 px-4 font-semibold text-gray-600">Count</th>
                      <th className="text-right py-2 px-4 font-semibold text-gray-600">% of Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { label: "Total Applications", val: stats.totalApplications, pct: "100%" },
                      { label: "Accepted",           val: stats.acceptedApplications, pct: stats.totalApplications > 0 ? `${((stats.acceptedApplications/stats.totalApplications)*100).toFixed(1)}%` : "0%" },
                      { label: "Pending Review",     val: stats.pendingApplications,  pct: stats.totalApplications > 0 ? `${((stats.pendingApplications/stats.totalApplications)*100).toFixed(1)}%`  : "0%" },
                    ].map(r => (
                      <tr key={r.label} className="hover:bg-gray-50">
                        <td className="py-3 px-4">{r.label}</td>
                        <td className="py-3 px-4 text-right font-bold text-primary-600">{r.val ?? 0}</td>
                        <td className="py-3 px-4 text-right text-gray-500">{r.pct}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {sectorData.length > 0 && (
              <section>
                <h3 className="font-semibold text-gray-800 mb-3 text-base">3. Sector Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-2 px-4 font-semibold text-gray-600">Sector</th>
                        <th className="text-right py-2 px-4 font-semibold text-gray-600">Internships</th>
                        <th className="text-right py-2 px-4 font-semibold text-gray-600">% of Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {sectorData.map(s => (
                        <tr key={s.name} className="hover:bg-gray-50">
                          <td className="py-3 px-4">{s.name}</td>
                          <td className="py-3 px-4 text-right font-bold text-primary-600">{s.value}</td>
                          <td className="py-3 px-4 text-right text-gray-500">
                            {stats.openInternships > 0 ? `${((s.value / stats.openInternships) * 100).toFixed(1)}%` : "0%"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            <section>
              <h3 className="font-semibold text-gray-800 mb-3 text-base">4. Policy Recommendations</h3>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                <li>Encourage more companies in underrepresented sectors to post internship opportunities.</li>
                <li>Review pending applications with companies to reduce response turnaround time.</li>
                <li>Scale certificate issuance processes to match internship completion rates.</li>
                <li>Expand collaboration projects between academia and industry to deepen innovation ties.</li>
                <li>Monitor placement rates by institution to identify gaps in university support systems.</li>
              </ul>
            </section>
          </div>
        </Card>
      )}
    </div>
  );
}
