import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
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
  MessageSquare,
  Eye,
  Download,
  GraduationCap
} from "lucide-react";
import supervisorIllustration from "../../assets/images/supervisor-illustration.svg";

export default function SupervisorDashboardModern() {
  const [supervisorStats, setSupervisorStats] = useState({
    totalStudents: 24,
    activeInternships: 18,
    pendingReports: 8,
    completedEvaluations: 42,
    avgPerformance: 4.2,
    upcomingMeetings: 5
  });

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      company: "Tech Corp",
      position: "Frontend Developer",
      progress: 75,
      nextReport: "2024-01-25",
      status: "on_track",
      avatar: "JD"
    },
    {
      id: 2,
      name: "Jane Smith",
      company: "StartupXYZ",
      position: "React Developer",
      progress: 60,
      nextReport: "2024-01-28",
      status: "needs_attention",
      avatar: "JS"
    },
    {
      id: 3,
      name: "Mike Johnson",
      company: "Digital Agency",
      position: "UI/UX Designer",
      progress: 85,
      nextReport: "2024-01-30",
      status: "excellent",
      avatar: "MJ"
    }
  ]);

  const [pendingTasks, setPendingTasks] = useState([
    {
      id: 1,
      type: "report_review",
      student: "John Doe",
      title: "Weekly Progress Report",
      dueDate: "2024-01-25",
      priority: "high"
    },
    {
      id: 2,
      type: "evaluation",
      student: "Jane Smith",
      title: "Mid-term Evaluation",
      dueDate: "2024-01-28",
      priority: "medium"
    },
    {
      id: 3,
      type: "meeting",
      student: "Mike Johnson",
      title: "Performance Review Meeting",
      dueDate: "2024-01-30",
      priority: "low"
    }
  ]);

  const [upcomingMeetings, setUpcomingMeetings] = useState([
    {
      id: 1,
      title: "Student Progress Review",
      student: "John Doe",
      date: "Jan 25, 2024",
      time: "2:00 PM",
      type: "review"
    },
    {
      id: 2,
      title: "Company Check-in",
      company: "Tech Corp",
      date: "Jan 26, 2024",
      time: "10:00 AM",
      type: "company"
    },
    {
      id: 3,
      title: "Team Meeting",
      date: "Jan 27, 2024",
      time: "3:00 PM",
      type: "team"
    }
  ]);

  const statCards = [
    { 
      title: "Total Students", 
      value: supervisorStats.totalStudents, 
      icon: Users, 
      color: "blue",
      subtitle: "Under supervision"
    },
    { 
      title: "Active Internships", 
      value: supervisorStats.activeInternships, 
      icon: BookOpen, 
      color: "green",
      subtitle: "Currently ongoing"
    },
    { 
      title: "Pending Reviews", 
      value: supervisorStats.pendingReports, 
      icon: FileText, 
      color: "yellow",
      subtitle: "Awaiting action"
    },
    { 
      title: "Completed", 
      value: supervisorStats.completedEvaluations, 
      icon: Award, 
      color: "purple",
      subtitle: "Evaluations done"
    }
  ];

  const quickActions = [
    { title: "View Students", icon: Users, link: "/supervisor/students", color: "blue" },
    { title: "Review Reports", icon: FileText, link: "/supervisor/reports", color: "green" },
    { title: "Evaluations", icon: Award, link: "/supervisor/evaluations", color: "purple" },
    { title: "Schedule Meeting", icon: Calendar, link: "/supervisor/meetings", color: "orange" }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'excellent': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'on_track': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'needs_attention': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'at_risk': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
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
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Supervisor Dashboard</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Monitor and guide student internships</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <button className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-purple-600 dark:text-purple-400">S</span>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Supervisor</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Performance Overview */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="hidden lg:block">
                <img 
                  src={supervisorIllustration} 
                  alt="Supervisor Dashboard" 
                  className="w-32 h-24 object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Supervision Performance</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-purple-100 text-sm">Avg Performance</p>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="text-2xl font-bold">{supervisorStats.avgPerformance}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-purple-100 text-sm">Success Rate</p>
                    <p className="text-2xl font-bold">92%</p>
                  </div>
                  <div>
                    <p className="text-purple-100 text-sm">Response Time</p>
                    <p className="text-2xl font-bold">24h</p>
                  </div>
                  <div>
                    <p className="text-purple-100 text-sm">Meetings Today</p>
                    <p className="text-2xl font-bold">{supervisorStats.upcomingMeetings}</p>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/supervisor/analytics" className="bg-white text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors">
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
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{card.value}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{card.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{card.subtitle}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Students Overview */}
          <div className="lg:col-span-2">
            <div className="dashboard-card rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">My Students</h2>
                <Link to="/supervisor/students" className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400">
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {students.map((student) => (
                  <div key={student.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-purple-600 dark:text-purple-400">{student.avatar}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{student.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{student.position} at {student.company}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Next report: {student.nextReport}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                          {student.status.replace('_', ' ').charAt(0).toUpperCase() + student.status.replace('_', ' ').slice(1)}
                        </span>
                        <div className="mt-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Progress</span>
                            <span className="text-xs font-medium text-gray-900 dark:text-white">{student.progress}%</span>
                          </div>
                          <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                            <div 
                              className="bg-purple-600 rounded-full h-1.5 transition-all duration-500"
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Tasks */}
            <div className="dashboard-card rounded-xl p-6 mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Pending Tasks</h2>
                <Link to="/supervisor/tasks" className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400">
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {pendingTasks.map((task) => (
                  <div key={task.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          task.type === 'report_review' ? 'bg-blue-100 dark:bg-blue-900' :
                          task.type === 'evaluation' ? 'bg-purple-100 dark:bg-purple-900' :
                          'bg-orange-100 dark:bg-orange-900'
                        }`}>
                          {task.type === 'report_review' ? <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" /> :
                           task.type === 'evaluation' ? <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" /> :
                           <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{task.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{task.student}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Due: {task.dueDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                        <div className="flex gap-2 mt-2">
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Meetings */}
            <div className="dashboard-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Upcoming Meetings</h2>
              <div className="space-y-4">
                {upcomingMeetings.map((meeting) => (
                  <div key={meeting.id} className="flex gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      meeting.type === 'review' ? 'bg-blue-100 dark:bg-blue-900' :
                      meeting.type === 'company' ? 'bg-green-100 dark:bg-green-900' :
                      'bg-purple-100 dark:bg-purple-900'
                    }`}>
                      <Calendar className={`w-5 h-5 ${
                        meeting.type === 'review' ? 'text-blue-600 dark:text-blue-400' :
                        meeting.type === 'company' ? 'text-green-600 dark:text-green-400' :
                        'text-purple-600 dark:text-purple-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{meeting.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {meeting.student || meeting.company} • {meeting.date}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{meeting.time}</p>
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

            {/* Performance Metrics */}
            <div className="dashboard-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Performance Metrics</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Student Satisfaction</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">4.5/5.0</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-600 rounded-full h-2" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Report Completion</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 rounded-full h-2" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Evaluation Quality</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-600 rounded-full h-2" style={{ width: '92%' }}></div>
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
