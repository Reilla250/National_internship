import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  Building2, 
  GraduationCap, 
  Briefcase, 
  Shield, 
  TrendingUp,
  FileText,
  Award,
  Activity,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Settings,
  LogOut,
  Bell,
  Search,
  Filter
} from "lucide-react";
import adminIllustration from "../../assets/images/government-hero.png";

export default function AdminDashboardModern() {
  const [stats, setStats] = useState({
    totalUsers: 1250,
    activeInternships: 89,
    pendingApplications: 156,
    completedInternships: 423,
    totalInstitutions: 45,
    totalCompanies: 127
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, user: "John Doe", action: "Applied for internship", time: "2 minutes ago", status: "pending" },
    { id: 2, user: "Jane Smith", action: "Completed internship", time: "1 hour ago", status: "completed" },
    { id: 3, user: "Tech Corp", action: "Posted new internship", time: "3 hours ago", status: "active" },
    { id: 4, user: "University X", action: "Registered 50 students", time: "5 hours ago", status: "completed" },
    { id: 5, user: "Mike Johnson", action: "Submitted evaluation", time: "1 day ago", status: "completed" }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, title: "System Update", message: "New features available", time: "1 hour ago", read: false },
    { id: 2, title: "Security Alert", message: "Unusual login detected", time: "3 hours ago", read: false },
    { id: 3, title: "Maintenance", message: "Scheduled maintenance tomorrow", time: "1 day ago", read: true }
  ]);

  const statCards = [
    { 
      title: "Total Users", 
      value: stats.totalUsers, 
      icon: Users, 
      color: "blue",
      trend: { value: 12, isUp: true },
      link: "/admin/users"
    },
    { 
      title: "Active Internships", 
      value: stats.activeInternships, 
      icon: Briefcase, 
      color: "green",
      trend: { value: 8, isUp: true },
      link: "/admin/internships"
    },
    { 
      title: "Pending Applications", 
      value: stats.pendingApplications, 
      icon: FileText, 
      color: "yellow",
      trend: { value: 5, isUp: false },
      link: "/admin/applications"
    },
    { 
      title: "Completed Internships", 
      value: stats.completedInternships, 
      icon: Award, 
      color: "purple",
      trend: { value: 15, isUp: true },
      link: "/admin/certificates"
    },
    { 
      title: "Institutions", 
      value: stats.totalInstitutions, 
      icon: Building2, 
      color: "indigo",
      trend: { value: 3, isUp: true },
      link: "/admin/institutions"
    },
    { 
      title: "Companies", 
      value: stats.totalCompanies, 
      icon: Shield, 
      color: "red",
      trend: { value: 10, isUp: true },
      link: "/admin/companies"
    }
  ];

  const quickActions = [
    { title: "Create User", icon: Users, link: "/admin/users/create", color: "blue" },
    { title: "Manage Internships", icon: Briefcase, link: "/admin/internships", color: "green" },
    { title: "View Reports", icon: FileText, link: "/admin/reports", color: "purple" },
    { title: "System Settings", icon: Settings, link: "/admin/settings", color: "gray" }
  ];

  return (
    <div className="min-h-screen bg-dashboard-main">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">National Internship Management System</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <button className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <Bell className="w-6 h-6" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">A</span>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Link key={index} to={card.link} className="dashboard-card rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${card.color}-100 dark:bg-${card.color}-900 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${card.color}-600 dark:text-${card.color}-400`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${card.trend.isUp ? 'text-green-600' : 'text-red-600'}`}>
                    {card.trend.isUp ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    <span>{card.trend.value}%</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{card.value}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{card.title}</p>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="dashboard-card rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
                  <img 
                    src={adminIllustration} 
                    alt="Admin Activity" 
                    className="w-16 h-12 object-contain hidden md:block"
                  />
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'completed' ? 'bg-green-500' :
                        activity.status === 'pending' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}></div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{activity.user}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{activity.action}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="dashboard-card rounded-xl p-6 mt-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
          </div>

          {/* Notifications & System Status */}
          <div className="space-y-8">
            <div className="dashboard-card rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Notifications</h2>
                <span className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 cursor-pointer">
                  Mark all read
                </span>
              </div>
              
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`p-4 rounded-lg border ${
                    notification.read 
                      ? 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600' 
                      : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notification.read ? 'bg-gray-400' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{notification.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">System Status</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Database</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">API Server</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Storage</span>
                  </div>
                  <span className="text-sm text-yellow-600 font-medium">78% Used</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Email Service</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
