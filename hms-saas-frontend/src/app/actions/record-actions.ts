"use server";

import { Pool } from "pg";
import { revalidatePath } from "next/cache";

// Initialize the database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function addRecord(formData: FormData) {
  // 1. Extract data from the form
  const patientName = formData.get("patientName") as string;
  const doctorName = formData.get("doctorName") as string;
  const diagnosis = formData.get("diagnosis") as string;
  const medication = formData.get("medication") as string;
  const dosage = formData.get("dosage") as string;
  const notes = formData.get("notes") as string;

  try {
    // 2. Insert the record into your Supabase medical_records table
    await pool.query(
      `INSERT INTO medical_records (patient_name, doctor_name, diagnosis, medication, dosage, notes) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [patientName, doctorName, diagnosis, medication, dosage, notes]
    );

    // 3. Tell Next.js to refresh the records page
    revalidatePath("/dashboard/records");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to insert medical record:", error);
    return { success: false, error: "Failed to save record to database" };
  }
}