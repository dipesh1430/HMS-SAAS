"use server";

import { Pool } from "pg";
import { revalidatePath } from "next/cache";

// Initialize the database connection using the URL from your .env file
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function addPatient(formData: FormData) {
  // 1. Extract data from the form
  const fullName = formData.get("fullName") as string;
  const age = parseInt(formData.get("age") as string);
  const gender = formData.get("gender") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;

  // 2. Generate a random Patient ID (e.g., PT-4928)
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const patientId = `PT-${randomNum}`;

  try {
    // 3. Insert the record into your Supabase table
    await pool.query(
      `INSERT INTO patients (patient_id, full_name, age, gender, contact, address, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [patientId, fullName, age, gender, phone, address, 'Admitted']
    );

    // 4. Tell Next.js to refresh the patients table to show the new data
    revalidatePath("/dashboard/patients");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to insert patient:", error);
    return { success: false, error: "Failed to save patient to database" };
  }
}