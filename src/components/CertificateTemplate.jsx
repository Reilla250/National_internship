import React from "react";

export default function CertificateTemplate({ cert }) {
  if (!cert) return null;

  return (
    <div 
      id="certificate-print-area"
      className="relative w-full aspect-[1.414/1] bg-[#fdfbf7] p-12 flex flex-col items-center justify-between text-gray-900 border-[16px] border-double border-primary-900 shadow-2xl overflow-hidden print:shadow-none print:m-0"
    >
      {/* Decorative Corner Ornaments (Simplified with base Tailwind) */}
      <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-primary-700 opacity-50"></div>
      <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-primary-700 opacity-50"></div>
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-primary-700 opacity-50"></div>
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-primary-700 opacity-50"></div>

      {/* Watermark Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <span className="text-[20rem] font-bold">NDIMS</span>
      </div>

      {/* Header */}
      <div className="text-center z-10">
        <div className="w-20 h-20 bg-primary-900 text-white rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg">
          🎓
        </div>
        <h1 className="text-4xl font-serif font-bold uppercase tracking-widest text-primary-900">Certificate of Completion</h1>
        <div className="w-48 h-1 bg-primary-700 mx-auto mt-2 mb-1"></div>
        <div className="w-32 h-0.5 bg-primary-500 mx-auto"></div>
      </div>

      {/* Content */}
      <div className="text-center space-y-6 z-10 max-w-2xl">
        <p className="text-lg font-medium italic text-gray-600">This is to certify that</p>
        <h2 className="text-5xl font-serif font-bold text-gray-900 border-b-2 border-gray-200 inline-block pb-2 px-8">
          {cert.studentName}
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed px-12">
          has successfully completed an intensive professional internship in
          <span className="block font-bold text-xl text-primary-800 mt-2">
            {cert.internshipTitle}
          </span>
          at <span className="font-semibold">{cert.companyName}</span>
        </p>
        <p className="text-sm text-gray-500 italic">
          period: <span className="font-semibold text-gray-700">{cert.issueDate}</span>
        </p>
      </div>

      {/* Signatures & Verification */}
      <div className="w-full flex justify-between items-end px-12 z-10">
        <div className="text-center w-48">
          <div className="border-t border-gray-400 pt-2">
            <p className="text-sm font-bold text-gray-800">Industry Supervisor</p>
            <p className="text-[10px] text-gray-500">{cert.companyName}</p>
          </div>
        </div>

        <div className="text-center">
            <div className="bg-white border border-gray-200 p-2 rounded shadow-sm mb-2 mx-auto inline-block">
                <div className="w-16 h-16 bg-gray-100 flex items-center justify-center text-[10px] text-gray-400">
                    QR CODE
                </div>
            </div>
            <p className="text-[10px] text-gray-400 font-mono">Verify: {cert.verificationCode}</p>
        </div>

        <div className="text-center w-48">
          <div className="border-t border-gray-400 pt-2">
            <p className="text-sm font-bold text-gray-800">Academic Institution</p>
            <p className="text-[10px] text-gray-500">Seal of Authenticity</p>
          </div>
        </div>
      </div>

      {/* Footer Details */}
      <div className="w-full text-center pb-4 z-10">
        <p className="text-[10px] text-gray-400 font-mono uppercase tracking-tighter">
          Certificate No: {cert.certificateNumber} | Issued by: National Digital Internship Management System
        </p>
      </div>
    </div>
  );
}
