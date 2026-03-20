import React, { useEffect, useState } from "react";
import { evaluationAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Button, Input, Textarea, Card, Modal, Spinner, Empty } from "../../components/UI";
import toast from "react-hot-toast";

function ScoreInput({ label, name, value, onChange }) {
  return (
    <div>
      <label className="label">{label} (0–100)</label>
      <input type="number" min={0} max={100} className="input" name={name} value={value} onChange={onChange} />
    </div>
  );
}

export default function SupervisorEvaluations() {
  const { user } = useAuth();
  const supervisorId = user?.profileId;
  const [evals, setEvals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal]   = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm]     = useState({
    studentId: "", internshipId: "",
    performanceScore: "", technicalScore: "",
    communicationScore: "", teamworkScore: "", comments: ""
  });

  const load = () => {
    evaluationAPI.getBySupervisor(supervisorId)
      .then(r => setEvals(r.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { if (supervisorId) load(); }, [supervisorId]);

  const set = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await evaluationAPI.evaluate(supervisorId, {
        studentId:          Number(form.studentId),
        internshipId:       Number(form.internshipId),
        performanceScore:   Number(form.performanceScore),
        technicalScore:     Number(form.technicalScore),
        communicationScore: Number(form.communicationScore),
        teamworkScore:      Number(form.teamworkScore),
        comments:           form.comments,
      });
      toast.success("Evaluation submitted!");
      setModal(false);
      setForm({ studentId:"", internshipId:"", performanceScore:"", technicalScore:"", communicationScore:"", teamworkScore:"", comments:"" });
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit evaluation");
    } finally { setSaving(false); }
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title mb-0">Evaluations</h1>
        <Button onClick={() => setModal(true)}>+ New Evaluation</Button>
      </div>

      {evals.length === 0 ? (
        <Empty icon="⭐" title="No evaluations yet" description="Submit evaluations for your interns" />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {evals.map(e => (
            <Card key={e.evaluationId}>
              <h3 className="font-semibold text-gray-900 mb-1">{e.studentName}</h3>
              <p className="text-sm text-gray-500 mb-3">{e.internshipTitle}</p>
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                {[
                  ["Performance",   e.performanceScore],
                  ["Technical",     e.technicalScore],
                  ["Communication", e.communicationScore],
                  ["Teamwork",      e.teamworkScore],
                ].map(([label, val]) => (
                  <div key={label} className="bg-gray-50 rounded-lg p-2 text-center">
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className="font-bold text-gray-900">{val ?? "—"}</p>
                  </div>
                ))}
              </div>
              <div className="bg-primary-50 rounded-lg p-2 text-center mb-2">
                <p className="text-xs text-primary-600">Average Score</p>
                <p className="text-xl font-bold text-primary-700">{e.averageScore ?? "—"}</p>
              </div>
              {e.comments && <p className="text-xs text-gray-500 italic">{e.comments}</p>}
              <p className="text-xs text-gray-400 mt-2">{e.evaluationDate}</p>
            </Card>
          ))}
        </div>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title="Submit Evaluation" size="lg">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Student ID *" name="studentId" value={form.studentId} onChange={set} type="number" />
          <Input label="Internship ID *" name="internshipId" value={form.internshipId} onChange={set} type="number" />
          <ScoreInput label="Performance Score" name="performanceScore" value={form.performanceScore} onChange={set} />
          <ScoreInput label="Technical Score"   name="technicalScore"   value={form.technicalScore}   onChange={set} />
          <ScoreInput label="Communication"     name="communicationScore" value={form.communicationScore} onChange={set} />
          <ScoreInput label="Teamwork Score"    name="teamworkScore"    value={form.teamworkScore}    onChange={set} />
          <div className="col-span-2">
            <Textarea label="Comments" name="comments" value={form.comments} onChange={set}
              placeholder="Overall feedback on the intern's performance..." />
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <Button variant="secondary" className="flex-1" onClick={() => setModal(false)}>Cancel</Button>
          <Button className="flex-1" onClick={handleSubmit} loading={saving}>Submit Evaluation</Button>
        </div>
      </Modal>
    </div>
  );
}
