"use server";

import { Pool } from "pg";
import { revalidatePath } from "next/cache";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function deleteInvoice(id: string) {
  try {
    await pool.query("DELETE FROM invoices WHERE id = $1", [id]);
    
    // Tell Next.js to instantly refresh the billing table
    revalidatePath("/dashboard/billing");
  } catch (error) {
    console.error("Failed to delete invoice:", error);
  }
}