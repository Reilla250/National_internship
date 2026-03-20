import React, { useEffect, useState } from "react";
import { reportAPI, evaluationAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Button, Badge, Card, Modal, Select, Textarea, StatCard, Spinner, Empty } from "../../components/UI";
import toast from "react-hot-toast";

export default function SupervisorDashboard() {
  const { user } = useAuth();
  const supervisorId = user?.profileId;
  const [evals, setEvals]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supervisorId) return;
    evaluationAPI.getBySupervisor(supervisorId)
      .then(r => setEvals(r.data))
      .finally(() => setLoading(false));
  }, [supervisorId]);

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

  const avgScore = evals.length
    ? (evals.reduce((s, e) => s + (Number(e.averageScore) || 0), 0) / evals.length).toFixed(1)
    : "—";

  return (
    <div>
      <h1 className="page-title">Supervisor Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard icon="⭐" label="Total Evaluations"  value={evals.length}  color="blue" />
        <StatCard icon="📊" label="Average Score"      value={avgScore}      color="green" />
        <StatCard icon="👥" label="Students Evaluated" value={new Set(evals.map(e => e.studentId)).size} color="purple" />
      </div>

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
                  <th className="text-right py-2 px-4">Performance</th>
                  <th className="text-right py-2 px-4">Technical</th>
                  <th className="text-right py-2 px-4">Average</th>
                  <th className="text-left py-2 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {evals.map(e => (
                  <tr key={e.evaluationId} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{e.studentName}</td>
                    <td className="py-3 px-4 text-gray-500">{e.internshipTitle}</td>
                    <td className="py-3 px-4 text-right">{e.performanceScore ?? "—"}</td>
                    <td className="py-3 px-4 text-right">{e.technicalScore ?? "—"}</td>
                    <td className="py-3 px-4 text-right font-bold text-primary-600">{e.averageScore ?? "—"}</td>
                    <td className="py-3 px-4 text-gray-400">{e.evaluationDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
