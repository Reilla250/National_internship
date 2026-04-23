import React, { useEffect, useState } from "react";
import { collaborationAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Button, Input, Card, Modal, Badge, StatCard, Spinner, Empty } from "../../components/UI";
import toast from "react-hot-toast";

export default function CompanyCollaboration() {
  const { user } = useAuth();
  const companyId = user?.profileId;
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [modal, setModal]       = useState(false);
  const [outcomeModal, setOutcomeModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [outcomeText, setOutcomeText]   = useState("");
  const [saving, setSaving]     = useState(false);
  const [form, setForm] = useState({ title: "", description: "", institutionId: "", startDate: "", endDate: "" });

  const load = () => {
    collaborationAPI.getByCompany(companyId)
      .then(r => setProjects(r.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { if (companyId) load(); }, [companyId]);

  const handleCreate = async () => {
    if (!form.title) { toast.error("Title is required"); return; }
    setSaving(true);
    try {
      await collaborationAPI.create({
        title: form.title, description: form.description,
        companyId, institutionId: form.institutionId ? Number(form.institutionId) : null,
        startDate: form.startDate || null, endDate: form.endDate || null,
      });
      toast.success("Project created!");
      setModal(false);
      setForm({ title: "", description: "", institutionId: "", startDate: "", endDate: "" });
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create");
    } finally { setSaving(false); }
  };

  const handleUpdateOutcome = async () => {
    setSaving(true);
    try {
      await collaborationAPI.updateStatus(selected.projectId, "COMPLETED", outcomeText);
      toast.success("Project marked complete!");
      setOutcomeModal(false);
      load();
    } catch { toast.error("Update failed"); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title mb-0">Collaboration Projects</h1>
        <Button onClick={() => setModal(true)}>+ New Project</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard icon="🤝" label="Total Projects" value={projects.length}                                  color="blue" />
        <StatCard icon="✅" label="Active"          value={projects.filter(p=>p.status==="ACTIVE").length}  color="green" />
        <StatCard icon="🏁" label="Completed"       value={projects.filter(p=>p.status==="COMPLETED").length} color="purple" />
      </div>

      {projects.length === 0 ? (
        <Empty icon="🤝" title="No collaboration projects" description="Create a new industry–academia project" />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map(p => (
            <Card key={p.projectId}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{p.title}</h3>
                <Badge status={p.status} />
              </div>
              {p.institutionName && <p className="text-xs text-primary-600 mb-2">🏫 {p.institutionName}</p>}
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{p.description}</p>
              {p.startDate && <p className="text-xs text-gray-400 mb-2">📅 {p.startDate} → {p.endDate || "Ongoing"}</p>}
              {p.outcomes && (
                <div className="bg-green-50 border border-green-100 rounded-lg p-2 mb-3">
                  <p className="text-xs font-medium text-green-700">Outcomes:</p>
                  <p className="text-xs text-green-800">{p.outcomes}</p>
                </div>
              )}
              {p.status === "ACTIVE" && (
                <Button size="sm" variant="success"
                  onClick={() => { setSelected(p); setOutcomeText(""); setOutcomeModal(true); }}>
                  Mark Complete
                </Button>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Create Modal */}
      <Modal open={modal} onClose={() => setModal(false)} title="New Collaboration Project" size="lg">
        <div className="space-y-4">
          <Input label="Project Title *" value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Smart Farming Data Platform" />
          <div>
            <label className="label">Description</label>
            <textarea rows={3} className="input resize-none" value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Describe the goals, scope, and expected outcomes..." />
          </div>
          <Input label="Institution ID (optional)" type="number" value={form.institutionId}
            onChange={e => setForm({ ...form, institutionId: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Date" type="date" value={form.startDate}
              onChange={e => setForm({ ...form, startDate: e.target.value })} />
            <Input label="End Date" type="date" value={form.endDate}
              onChange={e => setForm({ ...form, endDate: e.target.value })} />
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setModal(false)}>Cancel</Button>
            <Button className="flex-1" onClick={handleCreate} loading={saving}>Create Project</Button>
          </div>
        </div>
      </Modal>

      {/* Outcome Modal */}
      <Modal open={outcomeModal} onClose={() => setOutcomeModal(false)} title="Complete Project">
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Record the outcomes and results of this collaboration project.</p>
          <div>
            <label className="label">Project Outcomes *</label>
            <textarea rows={4} className="input resize-none" value={outcomeText}
              onChange={e => setOutcomeText(e.target.value)}
              placeholder="Describe what was achieved, publications, prototypes, or impact..." />
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setOutcomeModal(false)}>Cancel</Button>
            <Button className="flex-1" variant="success" onClick={handleUpdateOutcome} loading={saving}>
              Mark as Completed
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
