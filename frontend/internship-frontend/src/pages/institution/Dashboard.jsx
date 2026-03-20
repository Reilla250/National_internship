import React, { useEffect, useState } from "react";
import { certificateAPI, collaborationAPI } from "../../services/api";
import { Button, Input, Card, Modal, StatCard, Spinner, Empty, Badge } from "../../components/UI";
import toast from "react-hot-toast";

export default function InstitutionDashboard() {
  const [collabs, setCollabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifyCode, setVerifyCode]     = useState("");
  const [verifyResult, setVerifyResult] = useState(null);
  const [verifying, setVerifying]       = useState(false);
  const [genModal, setGenModal]         = useState(false);
  const [collabModal, setCollabModal]   = useState(false);
  const [genForm, setGenForm]   = useState({ studentId: "", internshipId: "" });
  const [collabForm, setCollabForm] = useState({ title: "", description: "", companyId: "", startDate: "", endDate: "" });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const col = await collaborationAPI.getAll();
      setCollabs(col.data);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleVerify = async () => {
    if (!verifyCode.trim()) return;
    setVerifying(true);
    try {
      const { data } = await certificateAPI.verify(verifyCode.trim());
      setVerifyResult({ success: true, data });
    } catch {
      setVerifyResult({ success: false });
    } finally { setVerifying(false); }
  };

  const handleGenerate = async () => {
    if (!genForm.studentId || !genForm.internshipId) { toast.error("Please fill all fields"); return; }
    setSaving(true);
    try {
      await certificateAPI.generate({
        studentId: Number(genForm.studentId),
        internshipId: Number(genForm.internshipId),
      });
      toast.success("Certificate generated!");
      setGenModal(false);
      setGenForm({ studentId: "", internshipId: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to generate");
    } finally { setSaving(false); }
  };

  const handleCreateCollab = async () => {
    if (!collabForm.title) { toast.error("Title required"); return; }
    setSaving(true);
    try {
      await collaborationAPI.create({
        title: collabForm.title, description: collabForm.description,
        companyId: collabForm.companyId ? Number(collabForm.companyId) : null,
        startDate: collabForm.startDate || null, endDate: collabForm.endDate || null,
      });
      toast.success("Collaboration project created!");
      setCollabModal(false);
      setCollabForm({ title: "", description: "", companyId: "", startDate: "", endDate: "" });
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create");
    } finally { setSaving(false); }
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

  return (
    <div>
      <h1 className="page-title">Institution Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon="🤝" label="Total Collaborations" value={collabs.length}                                 color="blue" />
        <StatCard icon="✅" label="Active"               value={collabs.filter(c=>c.status==="ACTIVE").length}  color="green" />
        <StatCard icon="🏁" label="Completed"            value={collabs.filter(c=>c.status==="COMPLETED").length} color="purple" />
        <StatCard icon="📋" label="Pending Review"       value={collabs.filter(c=>c.status==="PENDING").length} color="yellow" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Certificate Tools */}
        <Card>
          <h2 className="section-title">🎓 Certificate Management</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-3">Verify a student's certificate authenticity:</p>
              <div className="flex gap-2">
                <Input placeholder="Enter verification code..." value={verifyCode}
                  onChange={e => { setVerifyCode(e.target.value); setVerifyResult(null); }} className="flex-1" />
                <Button onClick={handleVerify} loading={verifying}>Verify</Button>
              </div>
              {verifyResult && (
                <div className={`mt-3 rounded-xl p-4 text-sm ${verifyResult.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                  {verifyResult.success ? (
                    <div className="space-y-1">
                      <p className="font-bold text-green-800">✅ Valid Certificate</p>
                      <p className="text-green-700"><span className="font-medium">Student:</span> {verifyResult.data.studentName}</p>
                      <p className="text-green-700"><span className="font-medium">Internship:</span> {verifyResult.data.internshipTitle}</p>
                      <p className="text-green-700"><span className="font-medium">Company:</span> {verifyResult.data.companyName}</p>
                      <p className="text-green-700"><span className="font-medium">Issued:</span> {verifyResult.data.issueDate}</p>
                      <p className="font-mono text-xs text-gray-500 mt-1">#{verifyResult.data.certificateNumber}</p>
                    </div>
                  ) : (
                    <p className="font-semibold text-red-700">❌ Invalid or expired certificate code</p>
                  )}
                </div>
              )}
            </div>
            <div className="border-t pt-4">
              <p className="text-sm text-gray-500 mb-3">Issue a new completion certificate:</p>
              <Button className="w-full" onClick={() => setGenModal(true)}>🎓 Issue Certificate</Button>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <h2 className="section-title">⚡ Quick Actions</h2>
          <div className="space-y-3">
            {[
              { icon:"🎓", title:"Issue Certificate",      sub:"For completed internship",  color:"blue",   fn:()=>setGenModal(true) },
              { icon:"🤝", title:"New Collaboration",      sub:"Industry–academia project",  color:"purple", fn:()=>setCollabModal(true) },
            ].map(a => (
              <button key={a.title} onClick={a.fn}
                className={`w-full flex items-center gap-3 p-4 bg-${a.color}-50 hover:bg-${a.color}-100 rounded-xl text-left transition-colors`}>
                <span className="text-2xl">{a.icon}</span>
                <div>
                  <p className={`font-semibold text-${a.color}-900`}>{a.title}</p>
                  <p className={`text-xs text-${a.color}-600`}>{a.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Collaboration Projects */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title mb-0">🤝 Collaboration Projects</h2>
          <Button size="sm" onClick={() => setCollabModal(true)}>+ New Project</Button>
        </div>
        {collabs.length === 0 ? (
          <Empty icon="🤝" title="No collaborations yet" description="Start an industry–academia research project" />
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {collabs.map(c => (
              <div key={c.projectId} className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{c.title}</h3>
                  <Badge status={c.status} />
                </div>
                {c.companyName && <p className="text-xs text-gray-500 mb-1">🏢 {c.companyName}</p>}
                {c.institutionName && <p className="text-xs text-gray-500 mb-1">🏫 {c.institutionName}</p>}
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{c.description}</p>
                {c.startDate && <p className="text-xs text-gray-400 mt-2">📅 {c.startDate} → {c.endDate || "Ongoing"}</p>}
                {c.outcomes && <p className="text-xs text-green-700 mt-2 bg-green-50 p-2 rounded-lg">📋 {c.outcomes}</p>}
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Generate Certificate Modal */}
      <Modal open={genModal} onClose={() => setGenModal(false)} title="Issue Internship Certificate">
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
            ⚠️ Only issue certificates after verifying the student has completed all weekly reports and the internship period.
          </div>
          <Input label="Student ID *" type="number" value={genForm.studentId}
            onChange={e => setGenForm({ ...genForm, studentId: e.target.value })} placeholder="e.g. 1" />
          <Input label="Internship ID *" type="number" value={genForm.internshipId}
            onChange={e => setGenForm({ ...genForm, internshipId: e.target.value })} placeholder="e.g. 1" />
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setGenModal(false)}>Cancel</Button>
            <Button className="flex-1" onClick={handleGenerate} loading={saving}>Generate Certificate</Button>
          </div>
        </div>
      </Modal>

      {/* New Collaboration Modal */}
      <Modal open={collabModal} onClose={() => setCollabModal(false)} title="Create Collaboration Project">
        <div className="space-y-4">
          <Input label="Project Title *" value={collabForm.title}
            onChange={e => setCollabForm({ ...collabForm, title: e.target.value })} placeholder="e.g. AI in Agriculture Research" />
          <div>
            <label className="label">Description</label>
            <textarea rows={3} className="input resize-none" value={collabForm.description}
              onChange={e => setCollabForm({ ...collabForm, description: e.target.value })}
              placeholder="Project objectives and scope..." />
          </div>
          <Input label="Partner Company ID (optional)" type="number" value={collabForm.companyId}
            onChange={e => setCollabForm({ ...collabForm, companyId: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Date" type="date" value={collabForm.startDate}
              onChange={e => setCollabForm({ ...collabForm, startDate: e.target.value })} />
            <Input label="End Date" type="date" value={collabForm.endDate}
              onChange={e => setCollabForm({ ...collabForm, endDate: e.target.value })} />
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setCollabModal(false)}>Cancel</Button>
            <Button className="flex-1" onClick={handleCreateCollab} loading={saving}>Create Project</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
