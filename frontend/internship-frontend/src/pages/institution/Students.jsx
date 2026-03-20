import React, { useEffect, useState } from "react";
import { applicationAPI, reportAPI } from "../../services/api";
import { Card, Badge, Spinner, Empty, Modal, Button } from "../../components/UI";

export default function InstitutionStudents() {
  const [internshipId, setInternshipId] = useState("");
  const [reports, setReports]   = useState([]);
  const [apps, setApps]         = useState([]);
  const [loading, setLoading]   = useState(false);
  const [selected, setSelected] = useState(null);
  const [tab, setTab]           = useState("applications");

  const loadByInternship = async () => {
    if (!internshipId) return;
    setLoading(true);
    try {
      const [r, a] = await Promise.all([
        reportAPI.getByInternship(internshipId),
        applicationAPI.getByInternship(internshipId),
      ]);
      setReports(r.data);
      setApps(a.data);
    } finally { setLoading(false); }
  };

  return (
    <div>
      <h1 className="page-title">Student Monitoring</h1>

      <Card className="mb-6">
        <h2 className="section-title">Load by Internship</h2>
        <div className="flex gap-3">
          <input className="input flex-1" placeholder="Enter Internship ID..." type="number"
            value={internshipId} onChange={e => setInternshipId(e.target.value)} />
          <Button onClick={loadByInternship}>Load</Button>
        </div>
      </Card>

      {/* Tabs */}
      {(apps.length > 0 || reports.length > 0) && (
        <div className="flex gap-2 mb-4">
          {["applications","reports"].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                tab === t ? "bg-primary-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}>
              {t} ({t === "applications" ? apps.length : reports.length})
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : tab === "applications" ? (
        apps.length === 0 ? (
          <Empty icon="📋" title="No applications" description="Enter an internship ID above to load data" />
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {apps.map(a => (
              <Card key={a.applicationId}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900">{a.studentName}</p>
                    <p className="text-sm text-gray-500">{a.internshipTitle}</p>
                    <p className="text-xs text-gray-400 mt-1">Applied: {a.applicationDate}</p>
                  </div>
                  <Badge status={a.status} />
                </div>
              </Card>
            ))}
          </div>
        )
      ) : (
        reports.length === 0 ? (
          <Empty icon="📝" title="No reports" description="No weekly reports found for this internship" />
        ) : (
          <div className="space-y-4">
            {reports.map(r => (
              <Card key={r.reportId}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{r.studentName} — Week {r.weekNumber}</p>
                    <p className="text-xs text-gray-400">Submitted: {r.submissionDate}</p>
                  </div>
                  <Badge status={r.approvalStatus} />
                </div>
                <p className="text-sm text-gray-600 line-clamp-3">{r.reportContent}</p>
                <Button size="sm" variant="ghost" className="mt-2"
                  onClick={() => setSelected(r)}>Read Full Report</Button>
              </Card>
            ))}
          </div>
        )
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)}
        title={selected ? `Week ${selected?.weekNumber} — ${selected?.studentName}` : ""} size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="flex gap-3 text-sm">
              <Badge status={selected.approvalStatus} />
              <span className="text-gray-400">Submitted: {selected.submissionDate}</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-800 whitespace-pre-wrap">{selected.reportContent}</p>
            </div>
            {selected.supervisorNotes && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                <p className="text-xs font-medium text-blue-700 mb-1">Supervisor Notes:</p>
                <p className="text-sm text-blue-800">{selected.supervisorNotes}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
