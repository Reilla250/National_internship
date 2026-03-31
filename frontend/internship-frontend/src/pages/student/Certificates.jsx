import React, { useEffect, useState } from "react";
import { certificateAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Card, Spinner, Empty, Modal, Button } from "../../components/UI";
import CertificateTemplate from "../../components/CertificateTemplate";

export default function StudentCertificates() {
  const { user } = useAuth();
  const [certs, setCerts]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (user?.profileId) {
      certificateAPI.getByStudent(user.profileId)
        .then(r => setCerts(r.data))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title mb-0">My Certificates</h1>
      </div>
      
      {certs.length === 0 ? (
        <Empty icon="🎓" title="No certificates yet"
          description="Complete an internship to receive your digital certificate" />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map(c => (
            <Card key={c.certificateId} className="flex flex-col h-full bg-white dark:bg-gray-800 border-t-4 border-primary-600">
              <div className="flex-1">
                <div className="text-3xl mb-3 text-primary-600">📋</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">{c.internshipTitle}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{c.companyName}</p>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 mb-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Certificate No</span>
                    <span className="text-xs font-mono font-medium text-gray-700 dark:text-gray-300">{c.certificateNumber}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Issued Date</span>
                    <span className="text-xs text-gray-700 dark:text-gray-300">{c.issueDate}</span>
                  </div>
                </div>
              </div>
              
              <Button onClick={() => setSelected(c)} variant="primary" className="w-full">
                View & Download
              </Button>
            </Card>
          ))}
        </div>
      )}

      {/* Certificate Modal */}
      <Modal 
        open={!!selected} 
        onClose={() => setSelected(null)} 
        title="Your Digital Certificate"
        size="2xl"
      >
        <div className="flex flex-col gap-6">
          <div className="overflow-auto bg-gray-100 dark:bg-gray-900 p-8 rounded-2xl flex justify-center shadow-inner">
            <div className="min-w-[800px] w-full max-w-[1000px] shadow-2xl">
              <CertificateTemplate cert={selected} />
            </div>
          </div>
          
          <div className="flex gap-3 justify-end no-print">
            <Button variant="secondary" onClick={() => setSelected(null)}>Close</Button>
            <Button onClick={handlePrint} className="gap-2">
                <span>🖨️</span> Print / Save as PDF
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
