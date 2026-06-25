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
import { Search, MoreHorizontal, Mail, Phone } from "lucide-react";
import { AddDoctorSheet } from "@/components/dashboard/doctors/AddDoctorSheet";
import { Pool } from "pg";
import Link from "next/link";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

type Doctor = {
  id: string;
  doctor_id: string;
  full_name: string;
  department: string;
  specialization: string;
  contact_number: string;
  email: string;
  status: string;
};

// 1. Force Next.js to always render this dynamically (bypass cache)
export const dynamic = "force-dynamic";

// 2. Safely type searchParams to support Next.js 14 and 15
type Props = {
  searchParams: Promise<{ q?: string }> | { q?: string };
};

export default async function DoctorsPage(props: Props) {
  // 3. AWAIT the searchParams so it captures the URL correctly
  const searchParams = await props.searchParams;
  const query = searchParams?.q || "";

  // Build our dynamic SQL query
  let sqlText = "SELECT * FROM doctors";
  const sqlValues = [];

  if (query) {
    sqlText += " WHERE full_name ILIKE $1 OR department ILIKE $1 OR doctor_id ILIKE $1";
    sqlValues.push(`%${query}%`);
  }

  sqlText += " ORDER BY created_at DESC";

  // Fetch filtered data from Supabase
  const { rows: doctors } = await pool.query<Doctor>(sqlText, sqlValues);

  return (
    <div className="flex flex-col gap-6 font-inter">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-bricolage text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Medical Staff
          </h1>
          <p className="font-dmsans text-zinc-500 dark:text-zinc-400 mt-1">
            Manage your hospital's doctors and their department assignments.
          </p>
        </div>
        <AddDoctorSheet />
      </div>

      {/* Toolbar - NOW FUNCTIONAL! */}
      <form method="GET" className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="relative flex-1 max-w-md flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input 
              name="q" 
              defaultValue={query} // This will now correctly keep your text!
              placeholder="Search by name, ID, or department..." 
              className="pl-10 bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
            />
          </div>
          <Button type="submit" variant="outline" className="border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-white shadow-sm">
            Search
          </Button>
          {/* Show a "Clear" button only if a search is active */}
          {query && (
            <Link href="/dashboard/doctors">
              <Button variant="ghost" type="button" className="text-zinc-500 hover:text-rose-600">
                Clear
              </Button>
            </Link>
          )}
        </div>
      </form>

      {/* Data Table */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-50 dark:bg-zinc-950/50">
            <TableRow className="border-zinc-200 dark:border-zinc-800">
              <TableHead className="font-jakarta text-zinc-500 font-semibold">Doctor Profile</TableHead>
              <TableHead className="font-jakarta text-zinc-500 font-semibold">Department</TableHead>
              <TableHead className="font-jakarta text-zinc-500 font-semibold">Contact Info</TableHead>
              <TableHead className="font-jakarta text-zinc-500 font-semibold">Status</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-zinc-500">
                  {query ? `No doctors found matching "${query}".` : "No medical staff found. Click 'Add Doctor' to register your first doctor!"}
                </TableCell>
              </TableRow>
            ) : (
              doctors.map((doc) => (
                <TableRow key={doc.id} className="border-zinc-200 dark:border-zinc-800">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">{doc.full_name}</span>
                      <span className="text-zinc-500 text-sm">ID: {doc.doctor_id}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-zinc-900 dark:text-zinc-100">{doc.department}</span>
                      <span className="text-zinc-500 text-sm">{doc.specialization}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center text-zinc-600 dark:text-zinc-400 text-sm">
                        <Phone className="mr-2 h-3.5 w-3.5 text-zinc-400" />
                        {doc.contact_number}
                      </span>
                      <span className="flex items-center text-zinc-600 dark:text-zinc-400 text-sm">
                        <Mail className="mr-2 h-3.5 w-3.5 text-zinc-400" />
                        {doc.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className="bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/50 font-normal"
                    >
                      {doc.status}
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