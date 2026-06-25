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
import { Search, MoreHorizontal, FileText, Pill } from "lucide-react";
import { AddRecordSheet } from "@/components/dashboard/records/AddRecordSheet";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

type MedicalRecord = {
  id: string;
  patient_name: string;
  doctor_name: string;
  diagnosis: string;
  medication: string | null;
  dosage: string | null;
  notes: string | null;
  created_at: Date;
};

export default async function MedicalRecordsPage() {
  // Fetch real data from Supabase
  const { rows: records } = await pool.query<MedicalRecord>(
    "SELECT * FROM medical_records ORDER BY created_at DESC"
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <div className="flex flex-col gap-6 font-inter">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-bricolage text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Medical Records
          </h1>
          <p className="font-dmsans text-zinc-500 dark:text-zinc-400 mt-1">
            Manage patient diagnoses, prescriptions, and clinical notes.
          </p>
        </div>
        <AddRecordSheet />
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input 
            placeholder="Search records by patient or doctor..." 
            className="pl-10 bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
          />
        </div>
        <Button variant="outline" className="border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm">
          Filter by Date
        </Button>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-50 dark:bg-zinc-950/50">
            <TableRow className="border-zinc-200 dark:border-zinc-800">
              <TableHead className="font-jakarta text-zinc-500 font-semibold">Date</TableHead>
              <TableHead className="font-jakarta text-zinc-500 font-semibold">Patient & Doctor</TableHead>
              <TableHead className="font-jakarta text-zinc-500 font-semibold">Diagnosis</TableHead>
              <TableHead className="font-jakarta text-zinc-500 font-semibold">Prescription</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-zinc-500">
                  No medical records found. Click "New Record" to add one!
                </TableCell>
              </TableRow>
            ) : (
              records.map((record) => (
                <TableRow key={record.id} className="border-zinc-200 dark:border-zinc-800">
                  <TableCell className="text-zinc-500 whitespace-nowrap">
                    {formatDate(record.created_at)}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">{record.patient_name}</span>
                      <span className="text-zinc-500 text-sm">Attending: {record.doctor_name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-zinc-900 dark:text-zinc-100">
                      <FileText className="mr-2 h-4 w-4 text-blue-500" />
                      {record.diagnosis}
                    </div>
                  </TableCell>
                  <TableCell>
                    {record.medication ? (
                      <div className="flex flex-col">
                        <span className="flex items-center text-zinc-900 dark:text-zinc-100 text-sm font-medium">
                          <Pill className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
                          {record.medication}
                        </span>
                        {record.dosage && <span className="text-zinc-500 text-sm pl-5">{record.dosage}</span>}
                      </div>
                    ) : (
                      <span className="text-zinc-400 text-sm italic">No medication</span>
                    )}
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