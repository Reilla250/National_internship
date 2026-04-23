import React, { useEffect, useState } from "react";
import { internshipAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Button, Input, Select, Textarea, Badge, Card, Modal, Spinner, Empty } from "../../components/UI";
import toast from "react-hot-toast";

const empty = { title:"", description:"", requiredSkills:"", location:"", sector:"", startDate:"", endDate:"", slots:1 };

export default function CompanyInternships() {
  const { user } = useAuth();
  const companyId = user?.profileId;
  const [list,    setList]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal,   setModal]   = useState(false);
  const [editing, setEditing] = useState(null);
  const [form,    setForm]    = useState(empty);
  const [saving,  setSaving]  = useState(false);

  const load = () => {
    internshipAPI.getByCompany(companyId).then(r => setList(r.data)).finally(() => setLoading(false));
  };

  useEffect(() => { if (companyId) load(); }, [companyId]);

  const openNew  = () => { setEditing(null); setForm(empty); setModal(true); };
  const openEdit = (i) => { setEditing(i); setForm({ ...i, slots: i.slots }); setModal(true); };

  const handleSave = async () => {
    if (!form.title) return toast.error("Title is required");
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        requiredSkills: form.requiredSkills,
        location: form.location,
        sector: form.sector,
        startDate: form.startDate || null,
        endDate: form.endDate || null,
        slots: parseInt(form.slots) || 1
      };

      if (editing) {
        await internshipAPI.update(editing.internshipId, payload);
        toast.success("Internship updated");
      } else {
        await internshipAPI.create(companyId, payload);
        toast.success("Internship posted!");
      }
      setModal(false); load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this internship?")) return;
    try { await internshipAPI.delete(id); toast.success("Deleted"); load(); }
    catch { toast.error("Delete failed"); }
  };

  const toggleStatus = async (i) => {
    const next = i.status === "OPEN" ? "CLOSED" : "OPEN";
    await internshipAPI.updateStatus(i.internshipId, next);
    load();
  };

  const set = e => setForm({...form, [e.target.name]: e.target.value});

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title mb-0">My Internships</h1>
        <Button onClick={openNew}>+ Post Internship</Button>
      </div>

      {list.length === 0 ? (
        <Empty icon="💼" title="No internships yet" description="Post your first internship opportunity" />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {list.map(i => (
            <Card key={i.internshipId}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{i.title}</h3>
                <Badge status={i.status} />
              </div>
              {i.sector && <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{i.sector}</span>}
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">{i.description}</p>
              <div className="text-xs text-gray-400 mt-2 space-y-0.5">
                <p>📍 {i.location} · 👥 {i.slots} slots</p>
                {i.startDate && <p>📅 {i.startDate} — {i.endDate}</p>}
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="secondary" onClick={() => openEdit(i)}>Edit</Button>
                <Button size="sm" variant={i.status === "OPEN" ? "secondary" : "success"} onClick={() => toggleStatus(i)}>
                  {i.status === "OPEN" ? "Close" : "Reopen"}
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(i.internshipId)}>Delete</Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? "Edit Internship" : "Post New Internship"} size="lg">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2"><Input label="Title *" name="title" value={form.title} onChange={set} /></div>
          <Select label="Sector" name="sector" value={form.sector} onChange={set}>
            <option value="">Select sector</option>
            {["ICT","Finance","Health","Education","Agriculture","Engineering","Media"].map(s =>
              <option key={s} value={s}>{s}</option>)}
          </Select>
          <Input label="Location" name="location" value={form.location} onChange={set} />
          <Input label="Start Date" type="date" name="startDate" value={form.startDate} onChange={set} />
          <Input label="End Date"   type="date" name="endDate"   value={form.endDate}   onChange={set} />
          <Input label="Slots" type="number" name="slots" value={form.slots} onChange={set} min={1} />
          <div className="col-span-2">
            <Textarea label="Description" name="description" value={form.description} onChange={set} />
          </div>
          <div className="col-span-2">
            <Textarea label="Required Skills" name="requiredSkills" value={form.requiredSkills} onChange={set} rows={3} />
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <Button variant="secondary" className="flex-1" onClick={() => setModal(false)}>Cancel</Button>
          <Button className="flex-1" onClick={handleSave} loading={saving}>
            {editing ? "Update" : "Post Internship"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
