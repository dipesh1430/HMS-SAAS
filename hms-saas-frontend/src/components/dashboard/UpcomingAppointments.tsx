import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const appointments = [
  {
    id: "APT-001",
    patient: "Aarav Patel",
    doctor: "Dr. Sharma (Cardiology)",
    time: "10:30 AM",
    status: "Checked In",
  },
  {
    id: "APT-002",
    patient: "Priya Desai",
    doctor: "Dr. Mehta (General)",
    time: "11:00 AM",
    status: "Pending",
  },
  {
    id: "APT-003",
    patient: "Rohan Shah",
    doctor: "Dr. Iyer (Neurology)",
    time: "11:15 AM",
    status: "In Progress",
  },
  {
    id: "APT-004",
    patient: "Ananya Singh",
    doctor: "Dr. Sharma (Cardiology)",
    time: "11:45 AM",
    status: "Pending",
  },
];

export function UpcomingAppointments() {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-zinc-200 dark:border-zinc-800 hover:bg-transparent">
          <TableHead className="font-jakarta text-zinc-500">Patient</TableHead>
          <TableHead className="font-jakarta text-zinc-500">Time</TableHead>
          <TableHead className="font-jakarta text-zinc-500 hidden sm:table-cell">Doctor</TableHead>
          <TableHead className="font-jakarta text-zinc-500 text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((apt) => (
          <TableRow key={apt.id} className="border-zinc-200 dark:border-zinc-800">
            <TableCell className="font-inter font-medium text-zinc-900 dark:text-zinc-100">
              {apt.patient}
            </TableCell>
            <TableCell className="font-inter text-zinc-600 dark:text-zinc-400">
              {apt.time}
            </TableCell>
            <TableCell className="font-inter text-zinc-600 dark:text-zinc-400 hidden sm:table-cell">
              {apt.doctor}
            </TableCell>
            <TableCell className="text-right">
              <Badge 
                variant={apt.status === "Checked In" ? "default" : apt.status === "In Progress" ? "secondary" : "outline"}
                className={`font-inter font-normal ${
                  apt.status === "Checked In" ? "bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400" : 
                  apt.status === "In Progress" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400" : 
                  "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {apt.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}