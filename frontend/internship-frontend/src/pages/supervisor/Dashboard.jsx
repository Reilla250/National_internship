import React, { useEffect, useState } from "react";
import { reportAPI, evaluationAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Button, Badge, Card, Modal, Select, Textarea, StatCard, Spinner, Empty } from "../../components/UI";
import toast from "react-hot-toast";

export default function SupervisorDashboard() {
  const { user } = useAuth();
  const supervisorId = user?.profileId;
  const [evals, setEvals]   = useState([]);
  const [instStudents, setInstStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supervisorId) return;
    const loadData = async () => {
        try {
            const [eRes, sRes] = await Promise.all([
                evaluationAPI.getBySupervisor(supervisorId),
                supervisorAPI.getStudents(supervisorId)
            ]);
            setEvals(eRes.data);
            setInstStudents(sRes.data);
        } finally {
            setLoading(false);
        }
    };
    loadData();
  }, [supervisorId]);

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

  const avgScore = evals.length
    ? (evals.reduce((s, e) => s + (Number(e.averageScore) || 0), 0) / evals.length).toFixed(1)
    : "—";

  return (
    <div>
      <h1 className="page-title">Supervisor Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon="⭐" label="Total Evaluations"  value={evals.length}  color="blue" />
        <StatCard icon="📊" label="Average Score"      value={avgScore}      color="green" />
        <StatCard icon="👥" label="Students Evaluated" value={new Set(evals.map(e => e.studentId)).size} color="purple" />
        <StatCard icon="🏫" label="Institution Students" value={instStudents.length} color="yellow" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="section-title">Recent Evaluations</h2>
            {evals.length === 0 ? (
              <Empty icon="⭐" title="No evaluations yet" description="Go to Evaluations to assess students" />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="table-header">
                      <th className="text-left py-2 px-4">Student</th>
                      <th className="text-left py-2 px-4">Internship</th>
                      <th className="text-right py-2 px-4">Average</th>
                      <th className="text-left py-2 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {evals.slice(0, 5).map(e => (
                      <tr key={e.evaluationId} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="py-3 px-4 font-medium">{e.studentName}</td>
                        <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{e.internshipTitle}</td>
                        <td className="py-3 px-4 text-right font-bold text-primary-600">{e.averageScore ?? "—"}</td>
                        <td className="py-3 px-4 text-gray-400 text-xs">{e.evaluationDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <h2 className="section-title">My Institution Students</h2>
            {instStudents.length === 0 ? (
              <Empty icon="🏫" title="No students" />
            ) : (
              <div className="space-y-4">
                {instStudents.slice(0, 6).map(s => (
                  <div key={s.studentId} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full flex items-center justify-center font-bold text-sm">
                      {s.firstName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{s.firstName} {s.lastName}</p>
                      <p className="text-[10px] text-gray-500">{s.program}</p>
                    </div>
                  </div>
                ))}
                {instStudents.length > 6 && (
                    <p className="text-center text-xs text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
                        + {instStudents.length - 6} more students
                    </p>
                )}
                <Button variant="outline" className="w-full mt-2" onClick={() => window.location.href='/supervisor/students'}>
                    View All Students
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
