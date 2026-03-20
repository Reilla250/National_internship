import React, { useEffect, useState } from "react";
import { adminAPI } from "../../services/api";
import { StatCard, Card, Badge, Button, Spinner, Empty } from "../../components/UI";
import CreateUserModal from "../../components/admin/CreateUserModal";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import toast from "react-hot-toast";

const COLORS = ["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6","#06b6d4","#ec4899"];

export default function AdminDashboard() {
  const [stats, setStats]   = useState(null);
  const [users, setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab]       = useState("overview");
  const [userFilter, setUserFilter] = useState("ALL");
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [s, u] = await Promise.all([adminAPI.getStats(), adminAPI.getUsers()]);
      setStats(s.data);
      setUsers(u.data);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleToggleUser = async (user) => {
    const next = user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    try {
      await adminAPI.setUserStatus(user.userId, next);
      toast.success(`User ${next.toLowerCase()}`);
      load();
    } catch { toast.error("Failed to update status"); }
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

  const sectorData = Object.entries(stats?.internshipsBySector || {}).map(([name, value]) => ({ name, value }));
  const filteredUsers = userFilter === "ALL" ? users : users.filter(u => u.role?.roleName === userFilter);

  return (
    <div>
      <h1 className="page-title">⚙️ Admin Control Panel</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["overview","users"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
              tab === t ? "bg-primary-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}>{t}</button>
        ))}
      </div>

      {tab === "overview" && stats && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard icon="👥" label="Total Users"        value={stats.totalUsers}          color="blue" />
            <StatCard icon="👨‍🎓" label="Students"          value={stats.totalStudents}        color="green" />
            <StatCard icon="🏢" label="Companies"          value={stats.totalCompanies}       color="purple" />
            <StatCard icon="💼" label="Internships"        value={stats.totalInternships}     color="yellow" />
            <StatCard icon="🟢" label="Open Positions"     value={stats.openInternships}      color="green" />
            <StatCard icon="📋" label="Applications"       value={stats.totalApplications}    color="blue" />
            <StatCard icon="✅" label="Accepted"           value={stats.acceptedApplications} color="green" />
            <StatCard icon="🎓" label="Certificates"       value={stats.totalCertificates}    color="purple" />
          </div>

          {sectorData.length > 0 && (
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <h2 className="section-title">Internships by Sector</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={sectorData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
              <Card>
                <h2 className="section-title">Sector Distribution</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={sectorData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={85} label>
                      {sectorData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Legend /><Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>
          )}
        </>
      )}

      {tab === "users" && (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title mb-0">User Management</h2>
            <Button onClick={() => setShowCreateUserModal(true)} variant="primary">
              + Create User
            </Button>
          </div>
        <Card>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div className="flex gap-2 flex-wrap">
              {["ALL","STUDENT","COMPANY","SUPERVISOR","INSTITUTION","GOVERNMENT","ADMIN"].map(r => (
                <button key={r} onClick={() => setUserFilter(r)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    userFilter === r ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}>{r} ({r === "ALL" ? users.length : users.filter(u => u.role?.roleName === r).length})</button>
              ))}
            </div>
          </div>
          {filteredUsers.length === 0 ? (
            <Empty icon="👥" title="No users found" />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="table-header">
                    <th className="text-left py-2 px-4">ID</th>
                    <th className="text-left py-2 px-4">Email</th>
                    <th className="text-left py-2 px-4">Role</th>
                    <th className="text-left py-2 px-4">Status</th>
                    <th className="text-left py-2 px-4">Created</th>
                    <th className="text-left py-2 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map(u => (
                    <tr key={u.userId} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-400 text-xs">{u.userId}</td>
                      <td className="py-3 px-4 font-medium">{u.email}</td>
                      <td className="py-3 px-4">
                        <span className="badge badge-info">{u.role?.roleName}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge status={u.status} />
                      </td>
                      <td className="py-3 px-4 text-gray-400 text-xs">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
                      </td>
                      <td className="py-3 px-4">
                        <Button size="sm"
                          variant={u.status === "ACTIVE" ? "danger" : "success"}
                          onClick={() => handleToggleUser(u)}>
                          {u.status === "ACTIVE" ? "Deactivate" : "Activate"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
        <CreateUserModal
          isOpen={showCreateUserModal}
          onClose={() => setShowCreateUserModal(false)}
          onUserCreated={load}
        />
        </>
      )}
    </div>
  );
}
