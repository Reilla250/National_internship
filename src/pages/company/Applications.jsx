import React, { useEffect, useState } from "react";
import { applicationAPI, certificateAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Button, Badge, Card, Modal, Textarea, Select, Spinner, Empty } from "../../components/UI";
import toast from "react-hot-toast";

export default function CompanyApplications() {
  const { user } = useAuth();
  const [apps, setApps]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [modal, setModal]     = useState(false);
  const [form, setForm]       = useState({ status: "ACCEPTED", remarks: "" });
  const [saving, setSaving]   = useState(false);
  const [issuing, setIssuing] = useState(false);
  const [filter, setFilter]   = useState("ALL");

  const load = () => {
    applicationAPI.getByCompany(user?.profileId)
      .then(r => setApps(r.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { if (user?.profileId) load(); }, [user]);

  const handleReview = async () => {
    setSaving(true);
    try {
      await applicationAPI.updateStatus(selected.applicationId, form);
      toast.success(`Application ${form.status.toLowerCase()}`);
      setModal(false);
      load();
    } catch { toast.error("Failed to update"); }
    finally { setSaving(false); }
  };

  const handleIssueCertificate = async (app) => {
    if (!window.confirm(`Issue completion certificate to ${app.studentName}?`)) return;
    setIssuing(true);
    try {
      await certificateAPI.generate({
        studentId: app.studentId,
        internshipId: app.internshipId
      });
      toast.success("Certificate issued successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Already issued or failed");
    } finally {
      setIssuing(false);
    }
  };

  const filtered = filter === "ALL" ? apps : apps.filter(a => a.status === filter);

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

  return (
    <div>
      <h1 className="page-title">Applications</h1>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["ALL","PENDING","ACCEPTED","REJECTED"].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === s
                ? "bg-primary-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}>
            {s} ({s === "ALL" ? apps.length : apps.filter(a => a.status === s).length})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Empty icon="📋" title="No applications" description="Applications from students will appear here" />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map(a => (
            <Card key={a.applicationId}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-gray-900">{a.studentName}</p>
                  <p className="text-sm text-gray-500">{a.internshipTitle}</p>
                  <div className="text-xs text-primary-600 font-medium mt-1">
                    {a.studentProgram} | {a.studentInstitution}
                  </div>
                </div>
                <Badge status={a.status} />
              </div>
              <p className="text-xs text-gray-400 mb-3">Applied: {a.applicationDate}</p>
              {a.coverLetter && (
                <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 line-clamp-3 mb-3">
                  {a.coverLetter}
                </p>
              )}
              {a.remarks && (
                <p className="text-xs text-gray-500 italic mb-3">Remarks: {a.remarks}</p>
              )}
              {a.status === "PENDING" && (
                <Button size="sm" onClick={() => { setSelected(a); setForm({ status: "ACCEPTED", remarks: "" }); setModal(true); }}>
                  Review Application
                </Button>
              )}
              {a.status === "ACCEPTED" && (
                <Button size="sm" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50"
                  onClick={() => handleIssueCertificate(a)} loading={issuing}>
                  🎓 Give Certificate
                </Button>
              )}
            </Card>
          ))}
        </div>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title="Review Application">
        {selected && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-2 border border-gray-200">
              <p><span className="font-medium text-gray-500">Student:</span> {selected.studentName}</p>
              <p><span className="font-medium text-gray-500">Reg No:</span> {selected.studentRegistrationNumber}</p>
              <p><span className="font-medium text-gray-500">Course:</span> {selected.studentProgram}</p>
              <p><span className="font-medium text-gray-500">Institution:</span> {selected.studentInstitution}</p>
              <p><span className="font-medium text-gray-500">Phone:</span> {selected.studentPhone}</p>
              <div className="pt-2 mt-2 border-t border-gray-200">
                <p><span className="font-medium text-gray-500">Internship:</span> {selected.internshipTitle}</p>
              </div>
            </div>
            <Select label="Decision" value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}>
              <option value="ACCEPTED">✅ Accept</option>
              <option value="REJECTED">❌ Reject</option>
            </Select>
            <Textarea label="Remarks (optional)" rows={3} value={form.remarks}
              onChange={e => setForm({ ...form, remarks: e.target.value })}
              placeholder="Feedback or reason for decision..." />
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setModal(false)}>Cancel</Button>
              <Button className="flex-1" onClick={handleReview} loading={saving}>Confirm Decision</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
