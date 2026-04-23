import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import SystemNotice from "./SystemNotice";

export default function Layout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 flex flex-col relative w-full transition-colors duration-200">
        <SystemNotice />
        <div className="max-w-7xl mx-auto p-6 w-full flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
