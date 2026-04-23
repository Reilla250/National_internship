import React, { useState, useEffect, useRef } from 'react';
import { clsx } from "clsx";
import { notificationAPI } from "../services/api";

export default function SystemNotice() {
  const [notices, setNotices] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const fetchNotices = async () => {
    try {
      const { data } = await notificationAPI.getMyNotifications();
      // Only keep unread notices, or keep them all but differentiate Unread. We'll show all and mark them as bold if unread!
      setNotices(data);
    } catch (err) {
      console.error("Failed to fetch notices", err);
    }
  };

  useEffect(() => {
    fetchNotices();
    // Poll every 30 seconds
    const interval = setInterval(fetchNotices, 30000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notices.filter(n => !n.isRead).length;

  // Auto-play interval for the marquee
  useEffect(() => {
    if (isOpen || notices.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notices.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isOpen, notices.length]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAsRead = async (id) => {
    try {
      await notificationAPI.markAsRead(id);
      fetchNotices();
    } catch (err) {
      console.error(err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationAPI.markAllAsRead();
      fetchNotices();
      setIsOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const getIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "success": return "🎉";
      case "warning": return "⚠️";
      case "danger": return "🚨";
      default: return "📢";
    }
  };

  if (notices.length === 0) return null; // Hide entirely if no notices ever

  const currentNotice = notices[currentIndex] || notices[0];

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-end px-6 sticky top-0 z-40 shrink-0 shadow-sm relative">
      <div className="relative" ref={dropdownRef}>
        
        {/* Notification Bell + Auto-playing Banner */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-blue-50/50 border border-blue-100 rounded-lg px-3 py-1.5 max-w-sm overflow-hidden text-sm">
            <span className="text-blue-500 font-medium whitespace-nowrap mr-2">📢 Notice:</span>
            <div className="relative w-64 h-5 overflow-hidden">
              <div key={currentNotice.id} className="absolute w-full truncate font-medium text-gray-700 animate-slide-up">
                {currentNotice.message}
              </div>
            </div>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors focus:bg-gray-100 focus:outline-none"
            title="Notifications"
          >
            <span className="text-xl">🔔</span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border border-white rounded-full animate-pulse"></span>
            )}
          </button>
        </div>

        {/* Dropdown Notification Box */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-3 w-96 bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden animate-fade-in origin-top-right">
            <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-2">
                <span className="text-lg">🔔</span>
                <h3 className="font-bold text-gray-900">Notifications</h3>
              </div>
              {unreadCount > 0 && (
                <span className="bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full font-bold">
                  {unreadCount} New
                </span>
              )}
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {notices.map((n, i) => (
                <div 
                  key={n.id}
                  onClick={() => { if(!n.isRead) markAsRead(n.id); setCurrentIndex(i); setIsOpen(false); }}
                  className={clsx(
                    "px-5 py-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 flex gap-4 transition-colors group relative",
                    !n.isRead ? "bg-blue-50/20" : "opacity-75"
                  )}
                >
                  <div className={clsx(
                    "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg",
                    n.type?.toLowerCase() === "success" ? "bg-green-100" :
                    n.type?.toLowerCase() === "warning" ? "bg-yellow-100" :
                    n.type?.toLowerCase() === "danger"  ? "bg-red-100" : "bg-blue-100"
                  )}>
                    {getIcon(n.type)}
                  </div>
                  <div>
                    <h4 className={clsx(
                      "text-sm font-semibold mb-1 group-hover:text-blue-600 transition-colors",
                      !n.isRead ? "text-blue-900" : "text-gray-700"
                    )}>
                      System Alert
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {n.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                       {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {!n.isRead && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
               <button className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors disabled:opacity-50" 
                       onClick={markAllAsRead} disabled={unreadCount === 0}>
                 Mark all as read
               </button>
               <span className="text-xs text-gray-400 flex items-center gap-1">
                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Live Sync
               </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
