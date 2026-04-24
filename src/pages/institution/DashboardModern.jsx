import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Building2, 
  Users, 
  GraduationCap, 
  FileText, 
  Award,
  Calendar,
  TrendingUp,
  Search,
  Filter,
  Bell,
  Settings,
  CheckCircle,
  Clock,
  AlertCircle,
  Star,
  BarChart3,
  Target,
  BookOpen,
  MapPin,
  Briefcase
} from "lucide-react";
import institutionIllustration from "../../assets/images/institution-hero.png";

export default function InstitutionDashboardModern() {
  const [institutionStats, setInstitutionStats] = useState({
    totalStudents: 850,
    activeInternships: 245,
    partnerCompanies: 42,
    completionRate: 88,
    avgSatisfaction: 4.3,
    placedStudents: 680
  });

  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: "Computer Science",
      students: 320,
      activeInternships: 95,
      completionRate: 92,
      head: "Dr. Smith"
    },
    {
      id: 2,
      name: "Engineering",
      students: 280,
      activeInternships: 78,
      completionRate: 86,
      head: "Dr. Johnson"
    },
    {
      id: 3,
      name: "Business",
      students: 180,
      activeInternships: 52,
      completionRate: 89,
      head: "Dr. Williams"
    },
    {
      id: 4,
      name: "Design",
      students: 70,
      activeInternships: 20,
      completionRate: 94,
      head: "Dr. Brown"
    }
  ]);

  const [recentPlacements, setRecentPlacements] = useState([
    {
      id: 1,
      student: "John Doe",
      company: "Tech Corp",
      position: "Frontend Developer",
      department: "Computer Science",
      stipend: "$1500/month",
      date: "2024-01-20"
    },
    {
      id: 2,
      student: "Jane Smith",
      company: "StartupXYZ",
      position: "Marketing Intern",
      department: "Business",
      stipend: "$1200/month",
      date: "2024-01-19"
    },
    {
      id: 3,
      student: "Mike Johnson",
      company: "Digital Agency",
      position: "UI/UX Designer",
      department: "Design",
      stipend: "$1400/month",
      date: "2024-01-18"
    }
  ]);

  const [partnerCompanies, setPartnerCompanies] = useState([
    {
      id: 1,
      name: "Tech Corp",
      industry: "Technology",
      activeInternships: 15,
      totalPlacements: 45,
      rating: 4.8,
      logo: "TC"
    },
    {
      id: 2,
      name: "StartupXYZ",
      industry: "Startup",
      activeInternships: 8,
      totalPlacements: 22,
      rating: 4.6,
      logo: "SX"
    },
    {
      id: 3,
      name: "Digital Agency",
      industry: "Design",
      activeInternships: 6,
      totalPlacements: 18,
      rating: 4.7,
      logo: "DA"
    }
  ]);

  const statCards = [
    { 
      title: "Total Students", 
      value: institutionStats.totalStudents, 
      icon: Users, 
      color: "blue",
      trend: { value: 8, isUp: true }
    },
    { 
      title: "Active Internships", 
      value: institutionStats.activeInternships, 
      icon: Briefcase, 
      color: "green",
      trend: { value: 12, isUp: true }
    },
    { 
      title: "Partner Companies", 
      value: institutionStats.partnerCompanies, 
      icon: Building2, 
      color: "purple",
      trend: { value: 5, isUp: true }
    },
    { 
      title: "Placed Students", 
      value: institutionStats.placedStudents, 
      icon: Award, 
      color: "orange",
      trend: { value: 15, isUp: true }
    }
  ];

  const quickActions = [
    { title: "Manage Students", icon: Users, link: "/institution/students", color: "blue" },
    { title: "View Internships", icon: Briefcase, link: "/institution/internships", color: "green" },
    { title: "Partner Companies", icon: Building2, link: "/institution/partners", color: "purple" },
    { title: "Reports", icon: FileText, link: "/institution/reports", color: "orange" }
  ];

  return (
    <div className="min-h-screen bg-dashboard-main">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Institution Dashboard</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage student internships and industry partnerships</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              
              <button className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-teal-600 dark:text-teal-400">I</span>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Institution</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Institution Overview */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="hidden lg:block">
                <img 
                  src={institutionIllustration} 
                  alt="Institution Dashboard" 
                  className="w-32 h-24 object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Institution Performance</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-teal-100 text-sm">Completion Rate</p>
                    <p className="text-2xl font-bold">{institutionStats.completionRate}%</p>
                  </div>
                  <div>
                    <p className="text-teal-100 text-sm">Student Satisfaction</p>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="text-2xl font-bold">{institutionStats.avgSatisfaction}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-teal-100 text-sm">Placement Rate</p>
                    <p className="text-2xl font-bold">{Math.round((institutionStats.placedStudents / institutionStats.totalStudents) * 100)}%</p>
                  </div>
                  <div>
                    <p className="text-teal-100 text-sm">Active Partners</p>
                    <p className="text-2xl font-bold">{institutionStats.partnerCompanies}</p>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/institution/analytics" className="bg-white text-teal-600 px-6 py-2 rounded-lg font-medium hover:bg-teal-50 transition-colors">
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
          {/* Departments Overview */}
          <div className="lg:col-span-2">
            <div className="dashboard-card rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Departments Overview</h2>
                <Link to="/institution/departments" className="text-sm text-teal-600 hover:text-teal-700 dark:text-teal-400">
                  View All
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {departments.map((dept) => (
                  <div key={dept.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{dept.name}</h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{dept.head}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Students</span>
                        <span className="font-medium text-gray-900 dark:text-white">{dept.students}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Active Internships</span>
                        <span className="font-medium text-gray-900 dark:text-white">{dept.activeInternships}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Completion Rate</span>
                        <span className="font-medium text-green-600">{dept.completionRate}%</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-teal-600 rounded-full h-2 transition-all duration-500"
                          style={{ width: `${dept.completionRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Placements */}
            <div className="dashboard-card rounded-xl p-6 mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Placements</h2>
                <Link to="/institution/placements" className="text-sm text-teal-600 hover:text-teal-700 dark:text-teal-400">
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentPlacements.map((placement) => (
                  <div key={placement.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-teal-600 dark:text-teal-400">
                            {placement.student.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{placement.student}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{placement.position} at {placement.company}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <GraduationCap className="w-4 h-4" />
                              {placement.department}
                            </span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              {placement.stipend}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Placed on</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{placement.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Partner Companies */}
            <div className="dashboard-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Top Partners</h2>
              <div className="space-y-4">
                {partnerCompanies.map((company) => (
                  <div key={company.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-600 dark:text-gray-400">{company.logo}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{company.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{company.industry}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">{company.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">• {company.totalPlacements} placed</span>
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

            {/* Upcoming Events */}
            <div className="dashboard-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Upcoming Events</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">Career Fair 2024</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Feb 15, 2024 • 10:00 AM</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">Industry Partnership Meet</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Feb 20, 2024 • 2:00 PM</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">Internship Orientation</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Feb 25, 2024 • 9:00 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
