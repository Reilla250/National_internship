import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Building2, 
  Users, 
  FileText, 
  TrendingUp,
  BarChart3,
  Search,
  Filter,
  Bell,
  Settings,
  CheckCircle,
  AlertCircle,
  MapPin,
  DollarSign,
  GraduationCap,
  Award,
  Target,
  Activity,
  Calendar,
  Download,
  Eye
} from "lucide-react";
import governmentIllustration from "../../assets/images/government-illustration.svg";

export default function GovernmentDashboardModern() {
  const [governmentStats, setGovernmentStats] = useState({
    totalInstitutions: 156,
    activeInternships: 2840,
    participatingStudents: 45680,
    partnerCompanies: 892,
    totalInvestment: 12500000,
    employmentRate: 78
  });

  const [regionalData, setRegionalData] = useState([
    {
      id: 1,
      region: "North Region",
      institutions: 45,
      students: 12450,
      companies: 234,
      employmentRate: 82,
      growth: 12
    },
    {
      id: 2,
      region: "South Region", 
      institutions: 38,
      students: 10890,
      companies: 198,
      employmentRate: 76,
      growth: 8
    },
    {
      id: 3,
      region: "East Region",
      institutions: 42,
      students: 11560,
      companies: 267,
      employmentRate: 79,
      growth: 15
    },
    {
      id: 4,
      region: "West Region",
      institutions: 31,
      students: 10780,
      companies: 193,
      employmentRate: 75,
      growth: 6
    }
  ]);

  const [keyInitiatives, setKeyInitiatives] = useState([
    {
      id: 1,
      name: "National Skills Development Program",
      status: "active",
      budget: 2500000,
      beneficiaries: 12500,
      progress: 68,
      startDate: "2023-06-01",
      endDate: "2024-12-31"
    },
    {
      id: 2,
      name: "Youth Employment Initiative",
      status: "active",
      budget: 1800000,
      beneficiaries: 8900,
      progress: 45,
      startDate: "2023-09-01",
      endDate: "2024-06-30"
    },
    {
      id: 3,
      name: "Industry-Academia Partnership",
      status: "planning",
      budget: 3200000,
      beneficiaries: 15600,
      progress: 25,
      startDate: "2024-01-01",
      endDate: "2024-12-31"
    }
  ]);

  const [recentReports, setRecentReports] = useState([
    {
      id: 1,
      title: "Q4 2023 Internship Impact Report",
      type: "quarterly",
      date: "2024-01-15",
      status: "published",
      downloads: 245
    },
    {
      id: 2,
      title: "Regional Employment Analysis",
      type: "analysis",
      date: "2024-01-10",
      status: "review",
      downloads: 0
    },
    {
      id: 3,
      title: "Skills Gap Assessment 2023",
      type: "assessment",
      date: "2024-01-05",
      status: "published",
      downloads: 189
    }
  ]);

  const statCards = [
    { 
      title: "Total Institutions", 
      value: governmentStats.totalInstitutions.toLocaleString(), 
      icon: Building2, 
      color: "blue",
      trend: { value: 8, isUp: true }
    },
    { 
      title: "Active Internships", 
      value: governmentStats.activeInternships.toLocaleString(), 
      icon: FileText, 
      color: "green",
      trend: { value: 15, isUp: true }
    },
    { 
      title: "Students", 
      value: governmentStats.participatingStudents.toLocaleString(), 
      icon: Users, 
      color: "purple",
      trend: { value: 22, isUp: true }
    },
    { 
      title: "Companies", 
      value: governmentStats.partnerCompanies.toLocaleString(), 
      icon: Shield, 
      color: "orange",
      trend: { value: 12, isUp: true }
    }
  ];

  const quickActions = [
    { title: "Generate Reports", icon: FileText, link: "/government/reports", color: "blue" },
    { title: "View Analytics", icon: BarChart3, link: "/government/analytics", color: "green" },
    { title: "Manage Initiatives", icon: Target, link: "/government/initiatives", color: "purple" },
    { title: "Regional Data", icon: MapPin, link: "/government/regions", color: "orange" }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'planning': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'completed': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
      case 'published': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'review': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-dashboard-main">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Government Dashboard</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">National Internship Management Oversight</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              </div>
              
              <button className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">G</span>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Government</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        {/* National Overview */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-900 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="hidden lg:block">
                <img 
                  src={governmentIllustration} 
                  alt="Government Dashboard" 
                  className="w-32 h-24 object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">National Internship Program Overview</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-slate-300 text-sm">Total Investment</p>
                    <p className="text-2xl font-bold">{formatCurrency(governmentStats.totalInvestment)}</p>
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm">Employment Rate</p>
                    <p className="text-2xl font-bold">{governmentStats.employmentRate}%</p>
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm">Active Programs</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm">Monthly Growth</p>
                    <p className="text-2xl font-bold">+18%</p>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/government/overview" className="bg-white text-slate-700 px-6 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors">
              Full Report
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
          {/* Regional Data */}
          <div className="lg:col-span-2">
            <div className="dashboard-card rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Regional Performance</h2>
                <Link to="/government/regions" className="text-sm text-slate-600 hover:text-slate-700 dark:text-slate-400">
                  View All Regions
                </Link>
              </div>
              
              <div className="space-y-4">
                {regionalData.map((region) => (
                  <div key={region.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{region.region}</h3>
                      <div className={`flex items-center gap-1 text-sm ${region.growth > 10 ? 'text-green-600' : 'text-yellow-600'}`}>
                        <TrendingUp className="w-4 h-4" />
                        <span>+{region.growth}%</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Institutions</p>
                        <p className="font-medium text-gray-900 dark:text-white">{region.institutions}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Students</p>
                        <p className="font-medium text-gray-900 dark:text-white">{region.students.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Companies</p>
                        <p className="font-medium text-gray-900 dark:text-white">{region.companies}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Employment</p>
                        <p className="font-medium text-green-600">{region.employmentRate}%</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-slate-600 rounded-full h-2 transition-all duration-500"
                          style={{ width: `${region.employmentRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Initiatives */}
            <div className="dashboard-card rounded-xl p-6 mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Key Initiatives</h2>
                <Link to="/government/initiatives" className="text-sm text-slate-600 hover:text-slate-700 dark:text-slate-400">
                  Manage All
                </Link>
              </div>
              
              <div className="space-y-4">
                {keyInitiatives.map((initiative) => (
                  <div key={initiative.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{initiative.name}</h3>
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(initiative.status)}`}>
                        {initiative.status.charAt(0).toUpperCase() + initiative.status.slice(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Budget</p>
                        <p className="font-medium text-gray-900 dark:text-white">{formatCurrency(initiative.budget)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Beneficiaries</p>
                        <p className="font-medium text-gray-900 dark:text-white">{initiative.beneficiaries.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Period</p>
                        <p className="font-medium text-gray-900 dark:text-white">{initiative.startDate} - {initiative.endDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Progress</p>
                        <p className="font-medium text-slate-600">{initiative.progress}%</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-slate-600 rounded-full h-2 transition-all duration-500"
                        style={{ width: `${initiative.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Reports */}
            <div className="dashboard-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Reports</h2>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{report.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{report.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {report.status === 'published' && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">{report.downloads} ↓</span>
                      )}
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Download className="w-4 h-4" />
                      </button>
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

            {/* System Health */}
            <div className="dashboard-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">System Health</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Database</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">API Services</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">Healthy</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Data Sync</span>
                  </div>
                  <span className="text-sm text-yellow-600 font-medium">Delayed</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Security</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">Secured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
