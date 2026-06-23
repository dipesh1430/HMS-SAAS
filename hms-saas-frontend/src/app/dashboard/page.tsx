import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Users, CalendarCheck, Activity, CreditCard } from "lucide-react";
import { UpcomingAppointments } from "@/components/dashboard/UpcomingAppointments";
import { PatientFlowChart } from "@/components/dashboard/PatientFlowChart";
import { Navbar } from "@/components/dashboard/Navbar";

export default function DashboardOverview() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-bricolage text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Welcome back, Admin
        </h1>
        <p className="font-dmsans text-zinc-500 dark:text-zinc-400 mt-1">
          Here is what is happening at your hospital today.
        </p>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-jakarta text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Total Patients
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="font-inter text-2xl font-bold text-zinc-900 dark:text-white">1,248</div>
            <p className="text-xs text-emerald-600 mt-1 flex items-center">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-jakarta text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Appointments Today
            </CardTitle>
            <CalendarCheck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="font-inter text-2xl font-bold text-zinc-900 dark:text-white">42</div>
            <p className="text-xs text-zinc-500 mt-1">
              8 awaiting confirmation
            </p>
          </CardContent>
        </Card>

        <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-jakarta text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Available Staff
            </CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="font-inter text-2xl font-bold text-zinc-900 dark:text-white">18</div>
            <p className="text-xs text-emerald-600 mt-1">
              All departments staffed
            </p>
          </CardContent>
        </Card>

        <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-jakarta text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Revenue (Today)
            </CardTitle>
            <CreditCard className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="font-inter text-2xl font-bold text-zinc-900 dark:text-white">₹42,500</div>
            <p className="text-xs text-zinc-500 mt-1">
              Pending insurance claims: 3
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Body */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Placeholder for a Chart */}
        <Card className="col-span-4 border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardHeader>
            <CardTitle className="font-outfit">Patient Flow Overview</CardTitle>
            <CardDescription>Daily admissions vs discharges</CardDescription>
          </CardHeader>
          <CardContent>
            <PatientFlowChart />
          </CardContent>
        </Card>

        {/* Placeholder for Recent Activity/Appointments List */}
        <Card className="col-span-3 border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardHeader>
            <CardTitle className="font-outfit">Upcoming Appointments</CardTitle>
            <CardDescription>Next 4 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <UpcomingAppointments />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}