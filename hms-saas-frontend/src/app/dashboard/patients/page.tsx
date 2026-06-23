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
import { Search, Plus, MoreHorizontal } from "lucide-react";

// Mock data to simulate MongoDB documents
const patientsData = [
  { id: "PT-1042", name: "Ramesh Kumar", age: 45, gender: "Male", contact: "+91 98765 43210", status: "Admitted" },
  { id: "PT-1043", name: "Sunita Sharma", age: 32, gender: "Female", contact: "+91 87654 32109", status: "Discharged" },
  { id: "PT-1044", name: "Vikram Singh", age: 28, gender: "Male", contact: "+91 76543 21098", status: "Outpatient" },
  { id: "PT-1045", name: "Anjali Desai", age: 54, gender: "Female", contact: "+91 65432 10987", status: "Admitted" },
  { id: "PT-1046", name: "Mohammad Ali", age: 61, gender: "Male", contact: "+91 54321 09876", status: "Outpatient" },
];

export default function PatientsPage() {
  return (
    <div className="flex flex-col gap-6 font-inter">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-bricolage text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Patient Records
          </h1>
          <p className="font-dmsans text-zinc-500 dark:text-zinc-400 mt-1">
            Manage and view all registered patients.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
          <Plus className="h-4 w-4" />
          Add New Patient
        </Button>
      </div>

      {/* Toolbar (Search & Filter) */}
      <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input 
            placeholder="Search by name or ID..." 
            className="pl-10 bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
          />
        </div>
        <Button variant="outline" className="border-zinc-200 dark:border-zinc-800">
          Filters
        </Button>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-50 dark:bg-zinc-950/50">
            <TableRow className="border-zinc-200 dark:border-zinc-800">
              <TableHead className="font-jakarta text-zinc-500 font-semibold">Patient ID</TableHead>
              <TableHead className="font-jakarta text-zinc-500 font-semibold">Name</TableHead>
              <TableHead className="font-jakarta text-zinc-500 font-semibold">Age/Gender</TableHead>
              <TableHead className="font-jakarta text-zinc-500 font-semibold">Contact</TableHead>
              <TableHead className="font-jakarta text-zinc-500 font-semibold">Status</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patientsData.map((patient) => (
              <TableRow key={patient.id} className="border-zinc-200 dark:border-zinc-800">
                <TableCell className="font-medium text-zinc-900 dark:text-zinc-100">
                  {patient.id}
                </TableCell>
                <TableCell className="text-zinc-700 dark:text-zinc-300">
                  {patient.name}
                </TableCell>
                <TableCell className="text-zinc-600 dark:text-zinc-400">
                  {patient.age} / {patient.gender.charAt(0)}
                </TableCell>
                <TableCell className="text-zinc-600 dark:text-zinc-400">
                  {patient.contact}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={`font-normal ${
                      patient.status === "Admitted" ? "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800/50" : 
                      patient.status === "Discharged" ? "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/50" : 
                      "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/50"
                    }`}
                  >
                    {patient.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}