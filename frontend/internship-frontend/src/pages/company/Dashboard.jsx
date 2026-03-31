import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { internshipAPI, applicationAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { StatCard, Badge, Card, Spinner } from "../../components/UI";

export default function CompanyDashboard() {
  const { user } = useAuth();
  const companyId = user?.profileId;
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!companyId) return;
    Promise.all([
      internshipAPI.getByCompany(companyId),
      applicationAPI.getByCompany(companyId),
    ]).then(([i, a]) => {
      setInternships(i.data);
      setApplications(a.data);
    }).finally(() => setLoading(false));
  }, [companyId]);

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

  const open     = internships.filter(i => i.status === "OPEN").length;
  const pending  = applications.filter(a => a.status === "PENDING").length;
  const accepted = applications.filter(a => a.status === "ACCEPTED").length;

  return (
    <div>
      <h1 className="page-title">Company Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon="💼" label="Total Internships"   value={internships.length} color="blue" />
        <StatCard icon="🟢" label="Open Positions"      value={open}               color="green" />
        <StatCard icon="📋" label="Pending Applications" value={pending}            color="yellow" />
        <StatCard icon="✅" label="Accepted Interns"    value={accepted}           color="purple" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title mb-0">My Internship Listings</h2>
            <Link to="/company/internships" className="text-sm text-primary-600 hover:underline">Manage</Link>
          </div>
          <div className="space-y-3">
            {internships.slice(0,5).map(i => (
              <div key={i.internshipId} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg transition-colors">
                <div>
                  <p className="font-medium text-sm text-gray-900 dark:text-white uppercase">{i.title}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{i.location} · {i.slots} slots</p>
                </div>
                <Badge status={i.status} />
              </div>
            ))}
            {internships.length === 0 && <p className="text-gray-400 dark:text-gray-500 text-sm text-center py-4">No internships posted yet</p>}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title mb-0">Recent Applications</h2>
            <Link to="/company/applications" className="text-sm text-primary-600 hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {applications.slice(0,5).map(a => (
              <div key={a.applicationId} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg transition-colors">
                <div>
                  <p className="font-medium text-sm text-gray-900 dark:text-white uppercase">{a.studentName}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{a.internshipTitle}</p>
                </div>
                <Badge status={a.status} />
              </div>
            ))}
            {applications.length === 0 && <p className="text-gray-400 dark:text-gray-500 text-sm text-center py-4">No applications yet</p>}
          </div>
        </Card>
      </div>
    </div>
  );
}
