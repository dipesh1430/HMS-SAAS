import Link from "next/link";
import { Home, Users, Calendar, Settings, Activity, Menu, Bell } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LogoutButton } from "@/components/dashboard/LogoutButton";
import { Button } from "@/components/ui/button";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 font-inter">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hidden md:flex md:flex-col">
        <div className="flex h-16 items-center border-b border-zinc-200 dark:border-zinc-800 px-6">
          <Activity className="h-6 w-6 text-blue-600 mr-2" />
          {/* Using Outfit for a sharp, modern brand name */}
          <span className="font-outfit text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            HMS Platform
          </span>
        </div>
        
        <nav className="flex flex-col gap-2 p-4 flex-1">
          {/* Using Plus Jakarta Sans for ultra-clean navigation links */}
          <Link href="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-jakarta text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50 transition-colors">
            <Home className="h-4 w-4" />
            Overview
          </Link>
          <Link href="/dashboard/patients" className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-jakarta text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50 transition-colors">
            <Users className="h-4 w-4" />
            Patients
          </Link>
          <Link href="/dashboard/appointments" className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-jakarta text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50 transition-colors">
            <Calendar className="h-4 w-4" />
            Appointments
          </Link>
          
          {/* Pushed to the bottom using mt-auto on the wrapper */}
          <div className="mt-auto">
            <Link href="/dashboard/settings" className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-jakarta text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50 transition-colors">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="flex h-16 items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-6 shadow-sm">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle (Visible only on small screens) */}
            <Button className="md:hidden text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
              <Menu className="h-5 w-5" />
            </Button>

            {/* Using DM Sans for a warm, readable breadcrumb/header */}
            <h2 className="font-dmsans text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              Dashboard Overview
            </h2>
          </div>
          
          <div className="flex items-center gap-5">
            {/* Notification Bell */}
            <ThemeToggle />
            <Button className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-blue-600 border border-white dark:border-zinc-950"></span>
            </Button>

            {/* Profile Badge */}
            <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm cursor-pointer hover:bg-blue-700 transition-colors">
              DK
            </div>
            <LogoutButton />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-zinc-50 dark:bg-zinc-900/50">
          {children}
        </main>
      </div>
    </div>
  );
}