"use server";

import { Pool } from "pg";
import { revalidatePath } from "next/cache";

// Initialize the database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function addDoctor(formData: FormData) {
  // 1. Extract data from the form
  const fullName = formData.get("fullName") as string;
  const department = formData.get("department") as string;
  const specialization = formData.get("specialization") as string;
  const contactNumber = formData.get("contactNumber") as string;
  const email = formData.get("email") as string;

  // 2. Generate a random Doctor ID (e.g., DR-8492)
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const doctorId = `DR-${randomNum}`;

  try {
    // 3. Insert the record into your Supabase doctors table
    await pool.query(
      `INSERT INTO doctors (doctor_id, full_name, department, specialization, contact_number, email, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [doctorId, fullName, department, specialization, contactNumber, email, 'Active']
    );

    // 4. Tell Next.js to refresh the doctors page
    revalidatePath("/dashboard/doctors");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to insert doctor:", error);
    return { success: false, error: "Failed to save doctor to database" };
  }
}