import React, { useEffect, useState } from "react";
import { certificateAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Card, Spinner, Empty } from "../../components/UI";

export default function StudentCertificates() {
  const { user } = useAuth();
  const [certs, setCerts]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    certificateAPI.getByStudent(user?.profileId)
      .then(r => setCerts(r.data))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

  return (
    <div>
      <h1 className="page-title">My Certificates</h1>
      {certs.length === 0 ? (
        <Empty icon="🎓" title="No certificates yet"
          description="Complete an internship to receive your digital certificate" />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map(c => (
            <div key={c.certificateId}
              className="bg-gradient-to-br from-primary-700 to-primary-900 text-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-4 text-center">🎓</div>
              <p className="text-xs uppercase tracking-widest text-primary-200 text-center mb-1">
                Certificate of Completion
              </p>
              <h3 className="text-lg font-bold text-center mb-4">{c.studentName}</h3>
              <div className="border-t border-primary-500 my-4" />
              <p className="font-semibold text-center text-sm">{c.internshipTitle}</p>
              <p className="text-primary-200 text-center text-xs mt-1">{c.companyName}</p>
              <div className="mt-4 bg-primary-800 rounded-xl p-3 text-center">
                <p className="text-xs text-primary-300">Certificate Number</p>
                <p className="text-sm font-mono font-bold">{c.certificateNumber}</p>
              </div>
              <div className="mt-2 bg-primary-800 rounded-xl p-3 text-center">
                <p className="text-xs text-primary-300">Verification Code</p>
                <p className="text-sm font-mono font-bold tracking-wider">{c.verificationCode}</p>
              </div>
              <p className="text-xs text-primary-300 text-center mt-3">Issued: {c.issueDate}</p>
              <p className="text-xs text-primary-400 text-center">{c.issuedBy}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
