import React, { useEffect, useState } from "react";
import { adminAPI } from "../../services/api";
import { Card, Button, Select, Spinner, Empty, Badge } from "../../components/UI";
import toast from "react-hot-toast";

export default function AssignSupervisor() {
  const [students,    setStudents]    = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [saving,      setSaving]      = useState(null); // studentId being saved
  const [selections,  setSelections]  = useState({});   // { studentId: supervisorId }

  useEffect(() => {
    Promise.all([adminAPI.getStudentsList(), adminAPI.getSupervisors()])
      .then(([sRes, supRes]) => {
        setStudents(sRes.data);
        setSupervisors(supRes.data);
        // Pre-fill existing assignments
        const pre = {};
        sRes.data.forEach(s => {
          if (s.supervisorId) pre[s.studentId] = s.supervisorId;
        });
        setSelections(pre);
      })
      .catch(() => toast.error("Failed to load data"))
      .finally(() => setLoading(false));
  }, []);

  const handleAssign = async (studentId) => {
    const supervisorId = selections[studentId];
    if (!supervisorId) return toast.error("Please select a supervisor first");
    setSaving(studentId);
    try {
      await adminAPI.assignSupervisor(studentId, supervisorId);
      toast.success("Supervisor assigned successfully!");
      // Update local state
      setStudents(prev =>
        prev.map(s => s.studentId === studentId ? { ...s, supervisorId: Number(supervisorId) } : s)
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to assign supervisor");
    } finally {
      setSaving(null);
    }
  };

  const getSupervisorName = (id) => {
    const s = supervisors.find(sv => sv.supervisorId === id);
    return s ? `${s.firstName} ${s.lastName}` : null;
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

  return (
    <div>
      <h1 className="page-title">👨‍🏫 Assign Supervisors to Students</h1>
      <p className="text-gray-500 dark:text-gray-400 -mt-4 mb-6 text-sm">
        Assign a supervisor to each registered student in the system.
      </p>

      {students.length === 0 ? (
        <Empty icon="👥" title="No students found" description="Students will appear here after registration." />
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {students.map(student => (
            <Card key={student.studentId} className="flex flex-col gap-3">
              {/* Student Info */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold text-sm flex-shrink-0">
                  {student.firstName?.[0]}{student.lastName?.[0]}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white truncate">
                    {student.firstName} {student.lastName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{student.program}</p>
                  {student.registrationNumber && (
                    <p className="text-xs text-gray-400 dark:text-gray-500">Reg: {student.registrationNumber}</p>
                  )}
                </div>
              </div>

              {/* Current Supervisor */}
              {student.supervisorId ? (
                <div className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 rounded-lg px-3 py-2">
                  ✅ Current: <span className="font-semibold">{getSupervisorName(student.supervisorId) || `ID: ${student.supervisorId}`}</span>
                </div>
              ) : (
                <div className="text-xs bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800 rounded-lg px-3 py-2">
                  ⚠️ No supervisor assigned yet
                </div>
              )}

              {/* Assign Form */}
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <Select
                    label="Select Supervisor"
                    value={selections[student.studentId] || ""}
                    onChange={e => setSelections(prev => ({ ...prev, [student.studentId]: e.target.value }))}
                  >
                    <option value="">-- Choose --</option>
                    {supervisors.map(sv => (
                      <option key={sv.supervisorId} value={sv.supervisorId}>
                        {sv.firstName} {sv.lastName}
                      </option>
                    ))}
                  </Select>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleAssign(student.studentId)}
                  loading={saving === student.studentId}
                  disabled={!selections[student.studentId]}
                  className="flex-shrink-0 mb-0.5"
                >
                  Assign
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
