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
import { Search, MoreHorizontal, Calendar, Trash } from "lucide-react";
import { AddInvoiceSheet } from "@/components/dashboard/billing/AddInvoiceSheet";
import { Pool } from "pg";
import Link from "next/link";
import { deleteInvoice } from "@/app/actions/delete-actions";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 1. Force dynamic rendering so the page never serves stale cached data
export const dynamic = "force-dynamic";

// 2. Safely type searchParams (Supporting Next.js 15 Promises)
type Props = {
  searchParams: Promise<{ q?: string; status?: string }> | { q?: string; status?: string };
};

export default async function BillingPage(props: Props) {
  // 3. AWAIT the parameters to prevent the bug we caught earlier
  const searchParams = await props.searchParams;
  const query = searchParams?.q || "";
  const statusFilter = searchParams?.status || "all";

  // 4. Build a dynamic SQL query that handles both Search AND Status
  let sqlText = "SELECT * FROM invoices WHERE 1=1";
  const sqlValues = [];
  let paramIndex = 1;

  // Add search condition if typed
  if (query) {
    sqlText += ` AND (patient_name ILIKE $${paramIndex} OR invoice_number ILIKE $${paramIndex})`;
    sqlValues.push(`%${query}%`);
    paramIndex++;
  }

  // Add status condition if changed from "all"
  if (statusFilter !== "all") {
    sqlText += ` AND status ILIKE $${paramIndex}`;
    // Capatilize first letter (e.g., "pending" -> "Pending") to match database
    const formattedStatus = statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1);
    sqlValues.push(formattedStatus);
    paramIndex++;
  }

  sqlText += " ORDER BY created_at DESC";

  // Fetch filtered data from Supabase
  const { rows: invoices } = await pool.query(sqlText, sqlValues);

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
            Billing & Invoices
          </h1>
          <p className="font-dmsans text-zinc-500 dark:text-zinc-400 mt-1">
            Manage patient payments, generate invoices, and track pending balances.
          </p>
        </div>
        <AddInvoiceSheet />
      </div>

      {/* Toolbar - NOW FUNCTIONAL! */}
      <form method="GET" className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            name="q"
            defaultValue={query}
            placeholder="Search by patient or invoice number..."
            className="pl-10 bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
          />
        </div>

        <div className="flex w-full sm:w-auto items-center gap-2">
          <select
            name="status"
            defaultValue={statusFilter}
            className="h-10 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>

          <Button type="submit" variant="outline" className="border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-white shadow-sm">
            Filter
          </Button>

          {(query || statusFilter !== "all") && (
            <Link href="/dashboard/billing">
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
              <TableHead className="font-jakarta text-zinc-500 font-semibold">Invoice Details</TableHead>
              <TableHead className="font-jakarta text-zinc-500 font-semibold">Patient & Doctor</TableHead>
              <TableHead className="font-jakarta text-zinc-500 font-semibold">Amount</TableHead>
              <TableHead className="font-jakarta text-zinc-500 font-semibold">Status</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-zinc-500">
                  {(query || statusFilter !== "all")
                    ? "No invoices match your search filters."
                    : "No invoices found. Click 'Create Invoice' to bill a patient."}
                </TableCell>
              </TableRow>
            ) : (
              invoices.map((invoice: any) => (
                <TableRow key={invoice.id} className="border-zinc-200 dark:border-zinc-800">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">{invoice.invoice_number}</span>
                      <span className="flex items-center text-zinc-500 text-sm mt-0.5">
                        <Calendar className="mr-1.5 h-3 w-3" />
                        Due {formatDate(invoice.due_date)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">{invoice.patient_name}</span>
                      <span className="text-zinc-500 text-sm">Attending: {invoice.doctor_name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100 font-outfit">
                      ₹{Number(invoice.amount).toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        invoice.status === 'Paid'
                          ? "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/50 font-normal"
                          : "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/50 font-normal"
                      }
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <form action={deleteInvoice.bind(null, invoice.id)}>
                      <Button
                        type="submit"
                        variant="ghost"
                        size="icon"
                        className="text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                        title="Delete Invoice"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </form>
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