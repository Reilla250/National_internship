import React, { useEffect, useState } from "react";
import { evaluationAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Card, Spinner, Empty } from "../../components/UI";

export default function StudentEvaluations() {
  const { user } = useAuth();
  const [evals, setEvals]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    evaluationAPI.getByStudent(user?.profileId)
      .then(r => setEvals(r.data))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

  return (
    <div>
      <h1 className="page-title">My Evaluations</h1>
      {evals.length === 0 ? (
        <Empty icon="⭐" title="No evaluations yet" description="Your supervisor will evaluate you after your internship" />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {evals.map(e => (
            <Card key={e.evaluationId}>
              <h3 className="font-semibold text-gray-900 mb-1">{e.internshipTitle}</h3>
              <p className="text-xs text-gray-400 mb-4">{e.evaluationDate}</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  ["Performance",   e.performanceScore],
                  ["Technical",     e.technicalScore],
                  ["Communication", e.communicationScore],
                  ["Teamwork",      e.teamworkScore],
                ].map(([lbl, val]) => (
                  <div key={lbl} className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1">{lbl}</p>
                    <p className="text-xl font-bold text-gray-800">{val ?? "—"}<span className="text-xs font-normal text-gray-400">/100</span></p>
                    <div className="h-1.5 bg-gray-200 rounded-full mt-2">
                      <div className="h-1.5 bg-primary-500 rounded-full" style={{ width: `${val || 0}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-primary-50 rounded-xl p-3 text-center mb-3">
                <p className="text-xs text-primary-600 mb-0.5">Overall Average</p>
                <p className="text-3xl font-bold text-primary-700">{e.averageScore ?? "—"}<span className="text-sm font-normal">/100</span></p>
              </div>
              {e.comments && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                  <p className="text-xs font-medium text-blue-700 mb-1">Supervisor Comments:</p>
                  <p className="text-sm text-blue-800">{e.comments}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
