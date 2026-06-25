"use server";

import { Pool } from "pg";
import { revalidatePath } from "next/cache";

// Initialize the database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function addInvoice(formData: FormData) {
  // 1. Extract data from the form
  const patientName = formData.get("patientName") as string;
  const doctorName = formData.get("doctorName") as string;
  const amount = formData.get("amount") as string;
  const dueDate = formData.get("dueDate") as string;
  const notes = formData.get("notes") as string;

  // 2. Generate a random Invoice Number (e.g., INV-84923)
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const invoiceNumber = `INV-${randomNum}`;

  try {
    // 3. Insert the record into your Supabase invoices table
    await pool.query(
      `INSERT INTO invoices (invoice_number, patient_name, doctor_name, amount, status, due_date, notes) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [invoiceNumber, patientName, doctorName, amount, 'Pending', dueDate, notes]
    );

    // 4. Tell Next.js to refresh the billing page
    revalidatePath("/dashboard/billing");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to insert invoice:", error);
    return { success: false, error: "Failed to save invoice to database" };
  }
}