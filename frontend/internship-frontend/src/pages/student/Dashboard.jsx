import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { applicationAPI, reportAPI, certificateAPI } from "../../services/api";
import { StatCard, Badge, Card, Spinner } from "../../components/UI";

export default function StudentDashboard() {
  const { user } = useAuth();
  const studentId = user?.profileId;
  const [apps,   setApps]   = useState([]);
  const [reports, setReports] = useState([]);
  const [certs,  setCerts]  = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!studentId) return;
    Promise.all([
      applicationAPI.getByStudent(studentId),
      reportAPI.getByStudent(studentId),
      certificateAPI.getByStudent(studentId),
    ]).then(([a, r, c]) => {
      setApps(a.data); setReports(r.data); setCerts(c.data);
    }).finally(() => setLoading(false));
  }, [studentId]);

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

  const accepted  = apps.filter(a => a.status === "ACCEPTED").length;
  const pending   = apps.filter(a => a.status === "PENDING").length;
  const approved  = reports.filter(r => r.approvalStatus === "APPROVED").length;

  return (
    <div>
      <h1 className="page-title">Welcome back 👋</h1>
      <p className="text-gray-500 -mt-4 mb-6 text-sm">{user.email}</p>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon="📋" label="Total Applications" value={apps.length}   color="blue" />
        <StatCard icon="✅" label="Accepted"           value={accepted}       color="green" />
        <StatCard icon="⏳" label="Pending"            value={pending}        color="yellow" />
        <StatCard icon="🎓" label="Certificates"       value={certs.length}   color="purple" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title mb-0">Recent Applications</h2>
            <Link to="/student/applications" className="text-sm text-primary-600 hover:underline">View all</Link>
          </div>
          {apps.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-6">No applications yet</p>
          ) : (
            <div className="space-y-3">
              {apps.slice(0, 5).map(app => (
                <div key={app.applicationId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm text-gray-900">{app.internshipTitle}</p>
                    <p className="text-xs text-gray-500">{app.companyName}</p>
                  </div>
                  <Badge status={app.status} />
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Recent Reports */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title mb-0">Weekly Reports</h2>
            <Link to="/student/reports" className="text-sm text-primary-600 hover:underline">View all</Link>
          </div>
          {reports.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-6">No reports submitted yet</p>
          ) : (
            <div className="space-y-3">
              {reports.slice(0, 5).map(r => (
                <div key={r.reportId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm text-gray-900">Week {r.weekNumber}</p>
                    <p className="text-xs text-gray-500">{r.internshipTitle}</p>
                  </div>
                  <Badge status={r.approvalStatus} />
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Certificates */}
      {certs.length > 0 && (
        <Card className="mt-6">
          <h2 className="section-title">🎓 My Certificates</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certs.map(c => (
              <div key={c.certificateId} className="border border-green-200 bg-green-50 rounded-xl p-4">
                <p className="font-semibold text-green-900 text-sm">{c.internshipTitle}</p>
                <p className="text-xs text-green-700 mt-1">{c.companyName}</p>
                <p className="text-xs text-gray-500 mt-2">Cert #: {c.certificateNumber}</p>
                <p className="text-xs text-gray-400">Issued: {c.issueDate}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
