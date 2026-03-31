import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { applicationAPI, reportAPI, certificateAPI, internshipAPI } from "../../services/api";
import { StatCard, Badge, Card, Spinner, Modal, Textarea, Button } from "../../components/UI";
import toast from "react-hot-toast";

export default function StudentDashboard() {
  const { user } = useAuth();
  const studentId = user?.profileId;
  const [apps,   setApps]   = useState([]);
  const [reports, setReports] = useState([]);
  const [certs,  setCerts]  = useState([]);
  const [openInternships, setOpenInternships] = useState([]);
  
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [selected, setSelected] = useState(null);
  const [applyModal, setApplyModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    if (!studentId) return;
    Promise.all([
      applicationAPI.getByStudent(studentId),
      reportAPI.getByStudent(studentId),
      certificateAPI.getByStudent(studentId),
      internshipAPI.search({ status: "OPEN" })
    ]).then(([a, r, c, i]) => {
      setApps(a.data); 
      setReports(r.data); 
      setCerts(c.data);
      setOpenInternships(i.data);
    }).finally(() => setLoading(false));
  }, [studentId]);

  const handleApply = async () => {
    setApplying(true);
    try {
      await applicationAPI.apply(user.profileId, {
        internshipId: selected.internshipId,
        coverLetter,
      });
      toast.success("Application submitted successfully!");
      setApplyModal(false);
      setCoverLetter("");
      // Refresh applications immediately to show locally
      const { data } = await applicationAPI.getByStudent(studentId);
      setApps(data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to apply.");
    } finally { setApplying(false); }
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

  const accepted  = apps.filter(a => a.status === "ACCEPTED").length;
  const pending   = apps.filter(a => a.status === "PENDING").length;

  return (
    <div>
      <h1 className="page-title">Welcome back 👋</h1>
      <p className="text-gray-500 dark:text-gray-400 -mt-4 mb-6 text-sm">{user.email}</p>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon="📋" label="Total Applications" value={apps.length}   color="blue" />
        <StatCard icon="✅" label="Accepted"           value={accepted}       color="green" />
        <StatCard icon="⏳" label="Pending"            value={pending}        color="yellow" />
        <StatCard icon="🎓" label="Certificates"       value={certs.length}   color="purple" />
      </div>

      {/* Published Internships (New Feature) */}
      <h2 className="section-title mt-8 mb-4">🚀 Published Internships</h2>
      {openInternships.length === 0 ? (
        <p className="text-gray-400 dark:text-gray-500 text-sm text-center py-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg">No open internships currently available.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {openInternships.map(i => (
            <Card key={i.internshipId} className="hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{i.title}</h3>
                  <p className="text-sm text-gray-500">{i.companyName}</p>
                </div>
                {i.sector && (
                  <span className="inline-block bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-full">
                    {i.sector}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{i.description}</p>
              <div className="text-xs text-gray-400 space-y-1 mb-4">
                {i.location && <p>📍 {i.location}</p>}
                <p>👥 {i.slots} slot{i.slots !== 1 ? "s" : ""}</p>
              </div>
              
              <Button 
                size="sm" 
                className="w-full"
                onClick={() => { setSelected(i); setApplyModal(true); }}
                disabled={apps.some(a => a.internshipId === i.internshipId)}
              >
                {apps.some(a => a.internshipId === i.internshipId) ? "Already Applied" : "Apply Now"}
              </Button>
            </Card>
          ))}
        </div>
      )}

      {/* Recent Applications & Reports */}
      <div className="grid lg:grid-cols-2 gap-6">
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
                <div key={app.applicationId} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm text-gray-900 dark:text-white">{app.internshipTitle}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{app.companyName}</p>
                  </div>
                  <Badge status={app.status} />
                </div>
              ))}
            </div>
          )}
        </Card>

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
                <div key={r.reportId} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm text-gray-900 dark:text-white">Week {r.weekNumber}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{r.internshipTitle}</p>
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
              <div key={c.certificateId} className="border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 rounded-xl p-4 transition-colors">
                <p className="font-semibold text-green-900 dark:text-green-400 text-sm">{c.internshipTitle}</p>
                <p className="text-xs text-green-700 dark:text-green-500 mt-1">{c.companyName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Cert #: {c.certificateNumber}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">Issued: {c.issueDate}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Application Modal */}
      <Modal open={applyModal} onClose={() => setApplyModal(false)} title={`Apply: ${selected?.title}`}>
        <div className="space-y-4">
          <Textarea
            label="Cover Letter (optional)"
            placeholder="Tell the company why you're a great fit..."
            value={coverLetter}
            onChange={e => setCoverLetter(e.target.value)}
            rows={5}
          />
          <div className="flex gap-3 mt-4">
            <Button variant="secondary" className="flex-1" onClick={() => setApplyModal(false)}>Cancel</Button>
            <Button className="flex-1" onClick={handleApply} loading={applying}>Submit Application</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
