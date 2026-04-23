import React, { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import { notificationAPI } from '../services/api';

export default function NotificationBox() {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const fetchNotifications = async () => {
    try {
      const { data } = await notificationAPI.getMyNotifications();
      setNotifications(data || []);
    } catch (err) {
      console.error("Failed to fetch notifications");
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const handleMarkAsRead = async (id, e) => {
    if (e) e.stopPropagation();
    try {
      await notificationAPI.markAsRead(id);
      fetchNotifications();
    } catch (err) {
      console.error("Failed to mark read");
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationAPI.markAllAsRead();
      fetchNotifications();
    } catch (err) {
      console.error("Failed to mark all read");
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
        title="Notifications"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full border border-gray-800">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              Notifications
              {unreadCount > 0 && (
                <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-200">
                  {unreadCount} new
                </span>
              )}
            </h3>
            {unreadCount > 0 && (
              <button 
                onClick={handleMarkAllRead}
                className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                Mark all read
              </button>
            )}
          </div>
          
          <div className="max-h-[350px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-gray-500 dark:text-gray-400 px-4 text-center">
                <Bell size={24} className="mb-2 opacity-20" />
                <p className="text-sm">You're all caught up!</p>
                <p className="text-xs opacity-70 mt-1">Check back later for new alerts.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {notifications.map((n) => (
                  <div 
                    key={n.id} 
                    className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors cursor-pointer ${!n.isRead ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}
                    onClick={(e) => { if(!n.isRead) handleMarkAsRead(n.id, e) }}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-[10px] font-bold tracking-wide uppercase px-1.5 py-0.5 rounded-sm ${!n.isRead ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
                        {n.type || 'INFO'}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {new Date(n.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className={`text-sm mt-1.5 leading-snug ${!n.isRead ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400'}`}>
                      {n.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
