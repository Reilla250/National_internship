import React, { useEffect, useState } from "react";
import { reportAPI } from "../../services/api";
import { Button, Badge, Card, Modal, Select, Textarea, Spinner, Empty } from "../../components/UI";
import toast from "react-hot-toast";

export default function SupervisorReports() {
  const [internshipId, setInternshipId] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [modal, setModal]   = useState(false);
  const [form, setForm]     = useState({ approvalStatus: "APPROVED", supervisorNotes: "" });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    if (!internshipId) return;
    setLoading(true);
    reportAPI.getByInternship(internshipId)
      .then(r => setReports(r.data))
      .finally(() => setLoading(false));
  };

  const handleReview = async () => {
    setSaving(true);
    try {
      await reportAPI.review(selected.reportId, form);
      toast.success("Report reviewed");
      setModal(false);
      load();
    } catch { toast.error("Review failed"); }
    finally { setSaving(false); }
  };

  return (
    <div>
      <h1 className="page-title">Review Student Reports</h1>

      <div className="flex gap-3 mb-6">
        <input className="input flex-1" placeholder="Enter Internship ID to load reports..."
          value={internshipId} onChange={e => setInternshipId(e.target.value)} />
        <Button onClick={load}>Load Reports</Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Spinner size="lg" /></div>
      ) : reports.length === 0 && internshipId ? (
        <Empty icon="📝" title="No reports found" description="No reports submitted for this internship yet" />
      ) : (
        <div className="space-y-4">
          {reports.map(r => (
            <Card key={r.reportId}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{r.studentName} — Week {r.weekNumber}</h3>
                  <p className="text-xs text-gray-400">Submitted: {r.submissionDate}</p>
                </div>
                <Badge status={r.approvalStatus} />
              </div>
              <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 whitespace-pre-wrap mb-3">
                {r.reportContent}
              </p>
              {r.supervisorNotes && (
                <p className="text-xs text-blue-600 italic">Your notes: {r.supervisorNotes}</p>
              )}
              {r.approvalStatus === "PENDING" && (
                <Button size="sm" className="mt-2"
                  onClick={() => { setSelected(r); setForm({ approvalStatus: "APPROVED", supervisorNotes: "" }); setModal(true); }}>
                  Review Report
                </Button>
              )}
            </Card>
          ))}
        </div>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title="Review Report">
        <div className="space-y-4">
          <Select label="Decision" value={form.approvalStatus}
            onChange={e => setForm({ ...form, approvalStatus: e.target.value })}>
            <option value="APPROVED">✅ Approve</option>
            <option value="REJECTED">❌ Reject / Request Revision</option>
          </Select>
          <Textarea label="Supervisor Notes" rows={4} value={form.supervisorNotes}
            onChange={e => setForm({ ...form, supervisorNotes: e.target.value })}
            placeholder="Feedback for the student..." />
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setModal(false)}>Cancel</Button>
            <Button className="flex-1" onClick={handleReview} loading={saving}>Submit Review</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
