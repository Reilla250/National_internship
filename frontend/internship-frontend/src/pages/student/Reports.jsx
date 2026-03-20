import React, { useEffect, useState } from "react";
import { reportAPI, applicationAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Button, Select, Textarea, Badge, Card, Modal, Spinner, Empty } from "../../components/UI";
import toast from "react-hot-toast";

export default function StudentReports() {
  const { user } = useAuth();
  const studentId = user?.profileId;
  const [reports,  setReports]  = useState([]);
  const [apps,     setApps]     = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [modal,    setModal]    = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ internshipId: "", weekNumber: 1, reportContent: "" });

  const load = async () => {
    setLoading(true);
    try {
      const [r, a] = await Promise.all([
        reportAPI.getByStudent(studentId),
        applicationAPI.getByStudent(studentId),
      ]);
      setReports(r.data);
      setApps(a.data.filter(a => a.status === "ACCEPTED"));
    } finally { setLoading(false); }
  };

  useEffect(() => { if (studentId) load(); }, [studentId]);

  const handleSubmit = async () => {
    if (!form.internshipId || !form.reportContent.trim()) {
      toast.error("Please fill all required fields"); return;
    }
    setSubmitting(true);
    try {
      await reportAPI.submit(studentId, {
        internshipId: Number(form.internshipId),
        weekNumber: Number(form.weekNumber),
        reportContent: form.reportContent,
      });
      toast.success("Report submitted!");
      setModal(false);
      setForm({ internshipId: "", weekNumber: 1, reportContent: "" });
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed");
    } finally { setSubmitting(false); }
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title mb-0">Weekly Reports (Logbook)</h1>
        <Button onClick={() => setModal(true)}>+ Submit Report</Button>
      </div>

      {reports.length === 0 ? (
        <Empty icon="📝" title="No reports yet" description="Submit your first weekly logbook entry" />
      ) : (
        <div className="space-y-4">
          {reports.map(r => (
            <Card key={r.reportId}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">Week {r.weekNumber} — {r.internshipTitle}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Submitted: {r.submissionDate}</p>
                </div>
                <Badge status={r.approvalStatus} />
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{r.reportContent}</p>
              {r.supervisorNotes && (
                <div className="mt-3 bg-blue-50 border border-blue-100 rounded-lg p-3">
                  <p className="text-xs font-medium text-blue-700 mb-1">Supervisor Notes:</p>
                  <p className="text-sm text-blue-800">{r.supervisorNotes}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title="Submit Weekly Report">
        <div className="space-y-4">
          <Select label="Internship" value={form.internshipId}
            onChange={e => setForm({...form, internshipId: e.target.value})}>
            <option value="">Select internship...</option>
            {apps.map(a => (
              <option key={a.internshipId} value={a.internshipId}>{a.internshipTitle}</option>
            ))}
          </Select>
          <div>
            <label className="label">Week Number</label>
            <input type="number" min={1} max={52} className="input"
              value={form.weekNumber}
              onChange={e => setForm({...form, weekNumber: e.target.value})} />
          </div>
          <Textarea label="Report Content *" rows={8}
            placeholder="Describe your activities, learnings, challenges, and achievements this week..."
            value={form.reportContent}
            onChange={e => setForm({...form, reportContent: e.target.value})} />
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setModal(false)}>Cancel</Button>
            <Button className="flex-1" onClick={handleSubmit} loading={submitting}>Submit</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
