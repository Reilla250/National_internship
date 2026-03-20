import React, { useEffect, useState } from "react";
import { applicationAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Badge, Card, Spinner, Empty } from "../../components/UI";

export default function StudentApplications() {
  const { user } = useAuth();
  const [apps, setApps]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState("ALL");

  useEffect(() => {
    applicationAPI.getByStudent(user?.profileId)
      .then(r => setApps(r.data))
      .finally(() => setLoading(false));
  }, [user]);

  const filtered = filter === "ALL" ? apps : apps.filter(a => a.status === filter);

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

  return (
    <div>
      <h1 className="page-title">My Applications</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        {["ALL","PENDING","ACCEPTED","REJECTED"].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === s ? "bg-primary-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}>
            {s} ({s === "ALL" ? apps.length : apps.filter(a => a.status === s).length})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Empty icon="📋" title="No applications" description="Browse internships and apply to get started" />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map(a => (
            <Card key={a.applicationId}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{a.internshipTitle}</h3>
                  <p className="text-sm text-gray-500">{a.companyName}</p>
                </div>
                <Badge status={a.status} />
              </div>
              <p className="text-xs text-gray-400 mb-2">Applied: {a.applicationDate}</p>
              {a.coverLetter && (
                <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 line-clamp-2">{a.coverLetter}</p>
              )}
              {a.remarks && (
                <div className="mt-3 bg-blue-50 border border-blue-100 rounded-lg p-3">
                  <p className="text-xs font-medium text-blue-700">Company Remarks:</p>
                  <p className="text-sm text-blue-800">{a.remarks}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
