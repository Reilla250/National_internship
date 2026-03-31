import React, { useEffect, useState } from "react";
import { applicationAPI, reportAPI, institutionAPI } from "../../services/api";
import { Card, Badge, Spinner, Empty, Modal, Button } from "../../components/UI";
import { useAuth } from "../../context/AuthContext";

export default function InstitutionStudents() {
  const { user }                = useAuth();
  const [view, setView]         = useState("internship"); // "internship" or "all"
  const [internshipId, setInternshipId] = useState("");
  const [reports, setReports]   = useState([]);
  const [apps, setApps]         = useState([]);
  const [students, setStudents] = useState([]);
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

  const loadAllStudents = async () => {
    if (!user?.profileId) return;
    setLoading(true);
    try {
      const res = await institutionAPI.getStudents(user.profileId);
      setStudents(res.data);
    } finally { setLoading(false); }
  };

  useEffect(() => {
    if (view === "all") loadAllStudents();
  }, [view]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="page-title mb-0">Student Monitoring</h1>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button onClick={() => setView("internship")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              view === "internship" ? "bg-white shadow text-primary-600" : "text-gray-500 hover:text-gray-700"
            }`}>By Internship</button>
          <button onClick={() => setView("all")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              view === "all" ? "bg-white shadow text-primary-600" : "text-gray-500 hover:text-gray-700"
            }`}>All Students</button>
        </div>
      </div>

      {view === "internship" ? (
        <>
          <Card className="mb-6">
            <h2 className="section-title">Load by Internship</h2>
            <div className="flex gap-3">
              <input className="input flex-1" placeholder="Enter Internship ID..." type="number"
                value={internshipId} onChange={e => setInternshipId(e.target.value)} />
              <Button onClick={loadByInternship}>Load Data</Button>
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
        </>
      ) : (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title mb-0">My Students</h2>
            <Button size="sm" variant="ghost" onClick={loadAllStudents} loading={loading}>Refresh List</Button>
          </div>
          {loading && students.length === 0 ? (
            <div className="flex justify-center py-12"><Spinner /></div>
          ) : students.length === 0 ? (
            <Empty title="No students found" description="There are no students registered in the system yet." />
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full text-left">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-4 py-3 font-semibold text-sm text-gray-700">Name</th>
                    <th className="px-4 py-3 font-semibold text-sm text-gray-700">Reg Number</th>
                    <th className="px-4 py-3 font-semibold text-sm text-gray-700">Program</th>
                    <th className="px-4 py-3 font-semibold text-sm text-gray-700">Institution</th>
                    <th className="px-4 py-3 font-semibold text-sm text-gray-700">Phone</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {students.map(s => (
                    <tr key={s.studentId} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium">{s.firstName} {s.lastName}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{s.registrationNumber || "N/A"}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{s.program}</td>
                      <td className="px-4 py-3">
                         <span className="text-sm text-gray-600">{s.institution?.name || "N/A"}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{s.phone || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
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
