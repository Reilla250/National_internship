import React, { useEffect, useState } from "react";
import { internshipAPI, applicationAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Button, Input, Select, Badge, Card, Modal, Textarea, Spinner, Empty } from "../../components/UI";
import toast from "react-hot-toast";

export default function BrowseInternships() {
  const { user } = useAuth();
  const [internships, setInternships] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState(null);
  const [applyModal, setApplyModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [applying, setApplying] = useState(false);
  const [filters, setFilters]   = useState({ keyword: "", sector: "", location: "" });

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await internshipAPI.search(filters);
      setInternships(data);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleSearch = (e) => { e.preventDefault(); load(); };

  const handleApply = async () => {
    setApplying(true);
    try {
      await applicationAPI.apply(user.profileId, {
        internshipId: selected.internshipId,
        coverLetter,
      });
      toast.success("Application submitted!");
      setApplyModal(false);
      setCoverLetter("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to apply");
    } finally { setApplying(false); }
  };

  return (
    <div>
      <h1 className="page-title">Browse Internships</h1>

      {/* Search Filters */}
      <Card className="mb-6">
        <form onSubmit={handleSearch} className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[160px]">
            <Input placeholder="Search by keyword..." value={filters.keyword}
              onChange={e => setFilters({...filters, keyword: e.target.value})} />
          </div>
          <div className="w-40">
            <Select value={filters.sector} onChange={e => setFilters({...filters, sector: e.target.value})}>
              <option value="">All Sectors</option>
              {["ICT","Finance","Health","Education","Agriculture","Engineering","Media"].map(s =>
                <option key={s} value={s}>{s}</option>)}
            </Select>
          </div>
          <div className="w-40">
            <Input placeholder="Location..." value={filters.location}
              onChange={e => setFilters({...filters, location: e.target.value})} />
          </div>
          <Button type="submit">🔍 Search</Button>
          <Button type="button" variant="secondary" onClick={() => { setFilters({keyword:"",sector:"",location:""}); load(); }}>
            Clear
          </Button>
        </form>
      </Card>

      {loading ? (
        <div className="flex justify-center py-20"><Spinner size="lg" /></div>
      ) : internships.length === 0 ? (
        <Empty icon="🔍" title="No internships found" description="Try adjusting your search filters" />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {internships.map(i => (
            <Card key={i.internshipId} className="hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{i.title}</h3>
                  <p className="text-sm text-gray-500">{i.companyName}</p>
                </div>
                <Badge status={i.status} />
              </div>
              {i.sector && (
                <span className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded mb-2">
                  {i.sector}
                </span>
              )}
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{i.description}</p>
              <div className="text-xs text-gray-400 space-y-1 mb-4">
                {i.location && <p>📍 {i.location}</p>}
                {i.startDate && <p>📅 {i.startDate} → {i.endDate}</p>}
                <p>👥 {i.slots} slot{i.slots !== 1 ? "s" : ""}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => { setSelected(i); }}>
                  View Details
                </Button>
                <Button size="sm" onClick={() => { setSelected(i); setApplyModal(true); }}>
                  Apply Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Details Modal */}
      <Modal open={!!selected && !applyModal} onClose={() => setSelected(null)} title={selected?.title} size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="font-medium">Company:</span> {selected.companyName}</div>
              <div><span className="font-medium">Sector:</span> {selected.sector}</div>
              <div><span className="font-medium">Location:</span> {selected.location}</div>
              <div><span className="font-medium">Slots:</span> {selected.slots}</div>
              <div><span className="font-medium">Start:</span> {selected.startDate}</div>
              <div><span className="font-medium">End:</span> {selected.endDate}</div>
            </div>
            <div>
              <p className="font-medium text-sm mb-1">Description</p>
              <p className="text-sm text-gray-600">{selected.description}</p>
            </div>
            {selected.requiredSkills && (
              <div>
                <p className="font-medium text-sm mb-1">Required Skills</p>
                <p className="text-sm text-gray-600">{selected.requiredSkills}</p>
              </div>
            )}
            <Button className="w-full" onClick={() => setApplyModal(true)}>Apply for this Internship</Button>
          </div>
        )}
      </Modal>

      {/* Apply Modal */}
      <Modal open={applyModal} onClose={() => setApplyModal(false)} title={`Apply: ${selected?.title}`}>
        <div className="space-y-4">
          <Textarea
            label="Cover Letter (optional)"
            placeholder="Tell the company why you're a great fit..."
            value={coverLetter}
            onChange={e => setCoverLetter(e.target.value)}
            rows={6}
          />
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setApplyModal(false)}>Cancel</Button>
            <Button className="flex-1" onClick={handleApply} loading={applying}>Submit Application</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
