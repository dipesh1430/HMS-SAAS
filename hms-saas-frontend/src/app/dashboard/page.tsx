import { Users, Calendar, Stethoscope, Activity, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pool } from "pg";

// 1. Initialize the database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function DashboardOverviewPage() {
  // 2. Fetch live statistics from all three tables simultaneously
  const [patientsRes, appointmentsRes, doctorsRes] = await Promise.all([
    pool.query("SELECT COUNT(*) FROM patients"),
    pool.query("SELECT COUNT(*) FROM appointments WHERE appointment_date = CURRENT_DATE"),
    pool.query("SELECT COUNT(*) FROM doctors WHERE status = 'Active'")
  ]);

  // Extract the counts (PostgreSQL returns COUNT as a string, so we parse it)
  const totalPatients = patientsRes.rows[0].count;
  const appointmentsToday = appointmentsRes.rows[0].count;
  const activeDoctors = doctorsRes.rows[0].count;

  return (
    <div className="flex flex-col gap-6 font-inter">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-bricolage text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="font-dmsans text-zinc-500 dark:text-zinc-400 mt-1">
            Welcome back! Here is what's happening at your hospital today.
          </p>
        </div>
        <Button variant="outline" className="border-zinc-200 dark:border-zinc-800 shadow-sm font-jakarta">
          Download Report
        </Button>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Stat Card 1: Patients */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4">
            <h3 className="font-medium text-zinc-500 dark:text-zinc-400 font-jakarta">Total Patients</h3>
            <div className="h-10 w-10 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-zinc-900 dark:text-white font-outfit mb-1">
              {totalPatients}
            </div>
            <div className="flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>Registered in system</span>
            </div>
          </div>
        </div>

        {/* Stat Card 2: Appointments */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4">
            <h3 className="font-medium text-zinc-500 dark:text-zinc-400 font-jakarta">Appointments Today</h3>
            <div className="h-10 w-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center">
              <Calendar className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-zinc-900 dark:text-white font-outfit mb-1">
              {appointmentsToday}
            </div>
            <div className="flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>Scheduled for today</span>
            </div>
          </div>
        </div>

        {/* Stat Card 3: Doctors */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4">
            <h3 className="font-medium text-zinc-500 dark:text-zinc-400 font-jakarta">Active Staff</h3>
            <div className="h-10 w-10 bg-purple-50 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
              <Stethoscope className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-zinc-900 dark:text-white font-outfit mb-1">
              {activeDoctors}
            </div>
            <div className="flex items-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <Activity className="h-4 w-4 mr-1" />
              <span>Ready for duty</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Content Area (For Charts or Recent Activity Later) */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm p-10 flex flex-col items-center justify-center text-center min-h-[300px]">
        <p className="text-zinc-500 dark:text-zinc-400 mb-4">
          Detailed analytics and recent activity feed will go here.
        </p>
      </div>

    </div>
  );
}