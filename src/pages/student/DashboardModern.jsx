import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  Briefcase, 
  FileText, 
  Award, 
  Calendar,
  Clock,
  TrendingUp,
  BookOpen,
  Target,
  Users,
  Star,
  MapPin,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Bell,
  User,
  Settings
} from "lucide-react";
import studentIllustration from "../../assets/images/student-hero.png";

export default function StudentDashboardModern() {
  const [studentStats, setStudentStats] = useState({
    appliedInternships: 12,
    activeApplications: 3,
    completedInternships: 2,
    totalEarnings: 4500,
    profileCompletion: 85,
    skillsCount: 15
  });

  const [recommendedInternships, setRecommendedInternships] = useState([
    {
      id: 1,
      company: "Tech Corp",
      position: "Frontend Developer Intern",
      location: "San Francisco, CA",
      stipend: "$1500/month",
      duration: "3 months",
      match: 95,
      logo: "TC"
    },
    {
      id: 2,
      company: "StartupXYZ",
      position: "React Developer",
      location: "Remote",
      stipend: "$1200/month",
      duration: "6 months",
      match: 88,
      logo: "SX"
    },
    {
      id: 3,
      company: "Digital Agency",
      position: "UI/UX Designer",
      location: "New York, NY",
      stipend: "$1400/month",
      duration: "4 months",
      match: 82,
      logo: "DA"
    }
  ]);

  const [applications, setApplications] = useState([
    {
      id: 1,
      company: "Tech Corp",
      position: "Frontend Developer",
      status: "pending",
      appliedDate: "2024-01-15",
      nextStep: "Technical Interview"
    },
    {
      id: 2,
      company: "StartupXYZ",
      position: "React Developer",
      status: "interview",
      appliedDate: "2024-01-10",
      nextStep: "Final Round"
    },
    {
      id: 3,
      company: "Digital Agency",
      position: "UI/UX Designer",
      status: "rejected",
      appliedDate: "2024-01-05",
      nextStep: "Apply Again"
    }
  ]);

  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      title: "Technical Interview - Tech Corp",
      date: "Jan 25, 2024",
      time: "2:00 PM",
      type: "interview"
    },
    {
      id: 2,
      title: "Career Fair - Virtual",
      date: "Jan 28, 2024",
      time: "10:00 AM",
      type: "event"
    },
    {
      id: 3,
      title: "Workshop: Resume Building",
      date: "Jan 30, 2024",
      time: "3:00 PM",
      type: "workshop"
    }
  ]);

  const statCards = [
    { 
      title: "Applications", 
      value: studentStats.appliedInternships, 
      icon: FileText, 
      color: "blue",
      subtitle: "Total submitted"
    },
    { 
      title: "Active", 
      value: studentStats.activeApplications, 
      icon: Clock, 
      color: "yellow",
      subtitle: "In progress"
    },
    { 
      title: "Completed", 
      value: studentStats.completedInternships, 
      icon: Award, 
      color: "green",
      subtitle: "Successfully finished"
    },
    { 
      title: "Earnings", 
      value: `$${studentStats.totalEarnings}`, 
      icon: DollarSign, 
      color: "purple",
      subtitle: "Total earned"
    }
  ];

  const quickActions = [
    { title: "Browse Internships", icon: Search, link: "/student/internships", color: "blue" },
    { title: "My Applications", icon: FileText, link: "/student/applications", color: "green" },
    { title: "Update Profile", icon: User, link: "/student/profile", color: "purple" },
    { title: "Career Resources", icon: BookOpen, link: "/student/resources", color: "yellow" }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'interview': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'accepted': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'rejected': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="min-h-screen bg-pattern-animated">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Student Dashboard</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back! Let's find your dream internship</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search internships..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <button className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">S</span>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Student</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Completion Banner */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="hidden lg:block">
                <img 
                  src={studentIllustration} 
                  alt="Student Dashboard" 
                  className="w-32 h-24 object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Complete Your Profile</h3>
                <p className="text-green-100 mb-4">Your profile is {studentStats.profileCompletion}% complete. A complete profile increases your chances of getting hired!</p>
                <div className="w-full bg-green-400/30 rounded-full h-2 mb-4">
                  <div 
                    className="bg-white rounded-full h-2 transition-all duration-500"
                    style={{ width: `${studentStats.profileCompletion}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <Link to="/student/profile" className="bg-white text-green-600 px-6 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors">
              Complete Profile
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
          {/* Recommended Internships */}
          <div className="lg:col-span-2">
            <div className="dashboard-card rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recommended Internships</h2>
                <Link to="/student/internships" className="text-sm text-green-600 hover:text-green-700 dark:text-green-400">
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {recommendedInternships.map((internship) => (
                  <div key={internship.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                          <span className="text-lg font-bold text-gray-600 dark:text-gray-400">{internship.logo}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{internship.position}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{internship.company}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {internship.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {internship.stipend}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {internship.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-green-600 mb-2">
                          <Target className="w-4 h-4" />
                          <span className="text-sm font-medium">{internship.match}% match</span>
                        </div>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Applications */}
            <div className="dashboard-card rounded-xl p-6 mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">My Applications</h2>
                <Link to="/student/applications" className="text-sm text-green-600 hover:text-green-700 dark:text-green-400">
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {applications.map((application) => (
                  <div key={application.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{application.position}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{application.company}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Applied: {application.appliedDate}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{application.nextStep}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <div className="dashboard-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      event.type === 'interview' ? 'bg-blue-100 dark:bg-blue-900' :
                      event.type === 'event' ? 'bg-purple-100 dark:bg-purple-900' :
                      'bg-green-100 dark:bg-green-900'
                    }`}>
                      <Calendar className={`w-5 h-5 ${
                        event.type === 'interview' ? 'text-blue-600 dark:text-blue-400' :
                        event.type === 'event' ? 'text-purple-600 dark:text-purple-400' :
                        'text-green-600 dark:text-green-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{event.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{event.date} • {event.time}</p>
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

            {/* Skills & Progress */}
            <div className="dashboard-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Skills & Progress</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Profile Completion</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{studentStats.profileCompletion}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-600 rounded-full h-2 transition-all duration-500" style={{ width: `${studentStats.profileCompletion}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Skills Added</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{studentStats.skillsCount}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['JavaScript', 'React', 'Node.js', 'Python'].map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
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
