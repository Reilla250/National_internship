import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Building2, 
  Users, 
  FileText, 
  Briefcase, 
  Calendar,
  TrendingUp,
  Search,
  Filter,
  Bell,
  Settings,
  Plus,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  Star,
  MapPin,
  DollarSign,
  GraduationCap,
  Award,
  BarChart3,
  Target
} from "lucide-react";
import companyIllustration from "../../assets/images/company-illustration.svg";

export default function CompanyDashboardModern() {
  const [companyStats, setCompanyStats] = useState({
    activeInternships: 8,
    totalApplications: 245,
    shortlistedCandidates: 42,
    hiredInterns: 15,
    avgRating: 4.6,
    completionRate: 78
  });

  const [internships, setInternships] = useState([
    {
      id: 1,
      title: "Frontend Developer Intern",
      department: "Engineering",
      applications: 45,
      status: "active",
      postedDate: "2024-01-10",
      deadline: "2024-02-15"
    },
    {
      id: 2,
      title: "Marketing Intern",
      department: "Marketing",
      applications: 32,
      status: "active",
      postedDate: "2024-01-08",
      deadline: "2024-02-10"
    },
    {
      id: 3,
      title: "Data Science Intern",
      department: "Analytics",
      applications: 28,
      status: "review",
      postedDate: "2024-01-05",
      deadline: "2024-02-05"
    }
  ]);

  const [recentApplications, setRecentApplications] = useState([
    {
      id: 1,
      candidate: "John Doe",
      position: "Frontend Developer Intern",
      university: "Tech University",
      appliedDate: "2024-01-20",
      status: "new",
      matchScore: 92
    },
    {
      id: 2,
      candidate: "Jane Smith",
      position: "Marketing Intern",
      university: "Business School",
      appliedDate: "2024-01-19",
      status: "reviewing",
      matchScore: 88
    },
    {
      id: 3,
      candidate: "Mike Johnson",
      position: "Data Science Intern",
      university: "Engineering College",
      appliedDate: "2024-01-18",
      status: "shortlisted",
      matchScore: 95
    }
  ]);

  const [topCandidates, setTopCandidates] = useState([
    {
      id: 1,
      name: "Sarah Wilson",
      position: "Frontend Developer",
      university: "MIT",
      skills: ["React", "JavaScript", "CSS"],
      matchScore: 96,
      avatar: "SW"
    },
    {
      id: 2,
      name: "David Chen",
      position: "Data Science",
      university: "Stanford",
      skills: ["Python", "ML", "Statistics"],
      matchScore: 94,
      avatar: "DC"
    },
    {
      id: 3,
      name: "Emily Brown",
      position: "Marketing",
      university: "Harvard",
      skills: ["SEO", "Content", "Analytics"],
      matchScore: 91,
      avatar: "EB"
    }
  ]);

  const statCards = [
    { 
      title: "Active Internships", 
      value: companyStats.activeInternships, 
      icon: Briefcase, 
      color: "blue",
      trend: { value: 12, isUp: true }
    },
    { 
      title: "Total Applications", 
      value: companyStats.totalApplications, 
      icon: FileText, 
      color: "green",
      trend: { value: 25, isUp: true }
    },
    { 
      title: "Shortlisted", 
      value: companyStats.shortlistedCandidates, 
      icon: Users, 
      color: "yellow",
      trend: { value: 8, isUp: true }
    },
    { 
      title: "Hired", 
      value: companyStats.hiredInterns, 
      icon: CheckCircle, 
      color: "purple",
      trend: { value: 15, isUp: true }
    }
  ];

  const quickActions = [
    { title: "Post Internship", icon: Plus, link: "/company/internships/create", color: "blue" },
    { title: "View Applications", icon: FileText, link: "/company/applications", color: "green" },
    { title: "Manage Interns", icon: Users, link: "/company/interns", color: "purple" },
    { title: "Company Profile", icon: Building2, link: "/company/profile", color: "orange" }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'review': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'closed': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
      case 'new': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'reviewing': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'shortlisted': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-main">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Company Dashboard</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage your internship programs and find talent</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search candidates..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              <button className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-orange-600 dark:text-orange-400">C</span>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Company</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Company Performance Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="hidden lg:block">
                <img 
                  src={companyIllustration} 
                  alt="Company Dashboard" 
                  className="w-32 h-24 object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Company Performance</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-orange-100 text-sm">Average Rating</p>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="text-2xl font-bold">{companyStats.avgRating}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-orange-100 text-sm">Completion Rate</p>
                    <p className="text-2xl font-bold">{companyStats.completionRate}%</p>
                  </div>
                  <div>
                    <p className="text-orange-100 text-sm">Total Hired</p>
                    <p className="text-2xl font-bold">{companyStats.hiredInterns}</p>
                  </div>
                  <div>
                    <p className="text-orange-100 text-sm">Active Programs</p>
                    <p className="text-2xl font-bold">{companyStats.activeInternships}</p>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/company/analytics" className="bg-white text-orange-600 px-6 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors">
              View Analytics
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div key={index} className="dashboard-card rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${card.color}-100 dark:bg-${card.color}-900 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${card.color}-600 dark:text-${card.color}-400`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${card.trend.isUp ? 'text-green-600' : 'text-red-600'}`}>
                    {card.trend.isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingUp className="w-4 h-4 rotate-180" />}
                    <span>{card.trend.value}%</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{card.value}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{card.title}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Internships */}
          <div className="lg:col-span-2">
            <div className="dashboard-card rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Active Internships</h2>
                <Link to="/company/internships" className="text-sm text-orange-600 hover:text-orange-700 dark:text-orange-400">
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {internships.map((internship) => (
                  <div key={internship.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{internship.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{internship.department}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {internship.applications} applications
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Deadline: {internship.deadline}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(internship.status)}`}>
                          {internship.status.charAt(0).toUpperCase() + internship.status.slice(1)}
                        </span>
                        <div className="flex gap-2 mt-2">
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <Settings className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Applications */}
            <div className="dashboard-card rounded-xl p-6 mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Applications</h2>
                <Link to="/company/applications" className="text-sm text-orange-600 hover:text-orange-700 dark:text-orange-400">
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentApplications.map((application) => (
                  <div key={application.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {application.candidate.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{application.candidate}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{application.position}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">{application.university} • Applied: {application.appliedDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-green-600 mb-2">
                          <Target className="w-4 h-4" />
                          <span className="text-sm font-medium">{application.matchScore}% match</span>
                        </div>
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Top Candidates */}
            <div className="dashboard-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Top Candidates</h2>
              <div className="space-y-4">
                {topCandidates.map((candidate) => (
                  <div key={candidate.id} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-orange-600 dark:text-orange-400">{candidate.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{candidate.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{candidate.position} • {candidate.university}</p>
                      <div className="flex items-center gap-1 text-green-600 mt-1">
                        <Target className="w-3 h-3" />
                        <span className="text-xs font-medium">{candidate.matchScore}% match</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {candidate.skills.slice(0, 2).map((skill) => (
                          <span key={skill} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="dashboard-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Link key={index} to={action.link} className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <div className={`w-12 h-12 bg-${action.color}-100 dark:bg-${action.color}-900 rounded-lg flex items-center justify-center mb-3`}>
                        <Icon className={`w-6 h-6 text-${action.color}-600 dark:text-${action.color}-400`} />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white text-center">{action.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Hiring Pipeline */}
            <div className="dashboard-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Hiring Pipeline</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">New Applications</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Under Review</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">28</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Shortlisted</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">15</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Interview Stage</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Offer Extended</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
