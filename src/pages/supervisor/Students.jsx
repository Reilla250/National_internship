import React, { useEffect, useState } from "react";
import { applicationAPI, reportAPI, evaluationAPI, supervisorAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Card, Badge, Button, Modal, Spinner, Empty } from "../../components/UI";

export default function SupervisorStudents() {
  const { user } = useAuth();
  const supervisorId = user?.profileId;
  const [evals, setEvals]       = useState([]);
  const [instStudents, setInstStudents] = useState([]);
  const [loading, setLoading]   = useState(true);
  // Load by internship reports
  const [internshipId, setInternshipId] = useState("");
  const [reports, setReports]   = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [evalRes, instRes] = await Promise.all([
          evaluationAPI.getBySupervisor(supervisorId),
          supervisorAPI.getStudents(supervisorId)
        ]);
        setEvals(evalRes.data);
        setInstStudents(instRes.data);
      } catch (err) {
        console.error("Failed to load supervisor data", err);
      } finally {
        setLoading(false);
      }
    };
    if (supervisorId) fetchData();
  }, [supervisorId]);

  const loadReports = async () => {
    if (!internshipId) return;
    setLoadingReports(true);
    reportAPI.getByInternship(internshipId)
      .then(r => setReports(r.data))
      .finally(() => setLoadingReports(false));
  };

  // Group evaluations by student
  const studentMap = {};
  evals.forEach(e => {
    if (!studentMap[e.studentId]) studentMap[e.studentId] = { name: e.studentName, evals: [] };
    studentMap[e.studentId].evals.push(e);
  });

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

  return (
    <div>
      <h1 className="page-title">My Students</h1>

      {/* Institution Students Section */}
      <Card className="mb-6">
        <h2 className="section-title">Students from my Institution</h2>
        {instStudents.length === 0 ? (
          <Empty icon="🏫" title="No students found" description="No students registered from your institution yet" />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {instStudents.map(s => (
              <div key={s.studentId} className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-lg">
                    {s.firstName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{s.firstName} {s.lastName}</p>
                    <p className="text-xs text-gray-500">{s.program}</p>
                    <p className="text-[10px] text-gray-400">Reg: {s.registrationNumber}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center text-xs">
                  <span className="text-gray-400">📞 {s.phone || "No phone"}</span>
                  <Badge status="ACTIVE" />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Students from evaluations */}
      <Card className="mb-6">
        <h2 className="section-title">Students I've Evaluated</h2>
        {Object.keys(studentMap).length === 0 ? (
          <Empty icon="👥" title="No students yet" description="Students appear here once you submit evaluations" />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(studentMap).map(([id, s]) => {
              const avg = s.evals.reduce((sum, e) => sum + (Number(e.averageScore) || 0), 0) / s.evals.length;
              return (
                <div key={id} className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-lg">
                      {s.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{s.name}</p>
                      <p className="text-xs text-gray-400">{s.evals.length} evaluation{s.evals.length > 1 ? "s" : ""}</p>
                    </div>
                  </div>
                  <div className="bg-primary-50 rounded-lg p-2 text-center">
                    <p className="text-xs text-primary-600">Average Score</p>
                    <p className="text-xl font-bold text-primary-700">{avg.toFixed(1)}<span className="text-xs font-normal">/100</span></p>
                  </div>
                  {s.evals.map(e => (
                    <p key={e.evaluationId} className="text-xs text-gray-500 mt-2">📋 {e.internshipTitle}</p>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Lookup by internship */}
      <Card>
        <h2 className="section-title">Browse Reports by Internship</h2>
        <div className="flex gap-3 mb-4">
          <input className="input flex-1" type="number" placeholder="Enter Internship ID..."
            value={internshipId} onChange={e => setInternshipId(e.target.value)} />
          <Button onClick={loadReports}>Load</Button>
        </div>
        {loadingReports ? (
          <div className="flex justify-center py-8"><Spinner /></div>
        ) : reports.length > 0 ? (
          <div className="space-y-3">
            {reports.map(r => (
              <div key={r.reportId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm text-gray-900">{r.studentName} — Week {r.weekNumber}</p>
                  <p className="text-xs text-gray-400">Submitted: {r.submissionDate}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge status={r.approvalStatus} />
                  <Button size="sm" variant="ghost" onClick={() => setSelected(r)}>View</Button>
                </div>
              </div>
            ))}
          </div>
        ) : internshipId ? (
          <p className="text-center text-gray-400 py-4 text-sm">No reports found</p>
        ) : null}
      </Card>

      {/* Report Detail Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)}
        title={selected ? `${selected.studentName} — Week ${selected.weekNumber}` : ""} size="lg">
        {selected && (
          <div className="space-y-3">
            <div className="flex gap-2 items-center">
              <Badge status={selected.approvalStatus} />
              <span className="text-xs text-gray-400">{selected.submissionDate}</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-800 whitespace-pre-wrap">{selected.reportContent}</p>
            </div>
            {selected.supervisorNotes && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                <p className="text-xs font-medium text-blue-700 mb-1">Your Notes:</p>
                <p className="text-sm text-blue-800">{selected.supervisorNotes}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
