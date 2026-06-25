import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, MoreHorizontal, Clock, Calendar } from "lucide-react";
import { AddAppointmentSheet } from "@/components/dashboard/appointments/AddAppointmentSheet";
import { Pool } from "pg";

// 1. Set up the database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 2. Define the TypeScript type for our Appointments data
type Appointment = {
  id: string;
  patient_name: string;
  doctor_name: string;
  department: string;
  appointment_date: Date;
  appointment_time: string;
  status: string;
  created_at: Date;
};

export default async function AppointmentsPage() {
  // 3. Fetch the real data directly from Supabase, ordering by date and time
  const { rows: appointments } = await pool.query<Appointment>(
    "SELECT * FROM appointments ORDER BY appointment_date ASC, appointment_time ASC"
  );

  // Helper to format dates cleanly
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };

  // Helper to format time (e.g., 14:30:00 to 2:30 PM)
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString("en-US", { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col gap-6 font-inter">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-bricolage text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Appointments
          </h1>
          <p className="font-dmsans text-zinc-500 dark:text-zinc-400 mt-1">
            Schedule and manage upcoming doctor visits.
          </p>
        </div>
        <AddAppointmentSheet />
      </div>

      {/* Toolbar (Search & Filter) */}
      <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input 
            placeholder="Search by patient or doctor..." 
            className="pl-10 bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
          />
        </div>
        <input 
          type="date" 
          className="h-10 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-50 dark:bg-zinc-950/50">
            <TableRow className="border-zinc-200 dark:border-zinc-800">
              <TableHead className="font-jakarta text-zinc-500 font-semibold">Patient</TableHead>
              <TableHead className="font-jakarta text-zinc-500 font-semibold">Date & Time</TableHead>
              <TableHead className="font-jakarta text-zinc-500 font-semibold">Doctor & Dept</TableHead>
              <TableHead className="font-jakarta text-zinc-500 font-semibold">Status</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-zinc-500">
                  No appointments scheduled. Click "New Appointment" to book one!
                </TableCell>
              </TableRow>
            ) : (
              appointments.map((apt) => (
                <TableRow key={apt.id} className="border-zinc-200 dark:border-zinc-800">
                  <TableCell className="font-medium text-zinc-900 dark:text-zinc-100">
                    {apt.patient_name}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center text-zinc-900 dark:text-zinc-100 font-medium">
                        <Calendar className="mr-2 h-3.5 w-3.5 text-zinc-400" />
                        {formatDate(apt.appointment_date)}
                      </span>
                      <span className="flex items-center text-zinc-500 text-sm">
                        <Clock className="mr-2 h-3.5 w-3.5 text-zinc-400" />
                        {formatTime(apt.appointment_time)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-zinc-900 dark:text-zinc-100 font-medium">{apt.doctor_name}</span>
                      <span className="text-zinc-500 text-sm">{apt.department}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/50 font-normal"
                    >
                      {apt.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}