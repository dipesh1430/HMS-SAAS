"use server";

import { Pool } from "pg";
import { revalidatePath } from "next/cache";

// Initialize the database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function addAppointment(formData: FormData) {
  // 1. Extract all data from the booking form
  const patientName = formData.get("patientName") as string;
  const department = formData.get("department") as string;
  const doctorName = formData.get("doctorName") as string;
  const appointmentDate = formData.get("appointmentDate") as string;
  const appointmentTime = formData.get("appointmentTime") as string;
  const notes = formData.get("notes") as string;

  try {
    // 2. Insert the record into your Supabase appointments table
    await pool.query(
      `INSERT INTO appointments (patient_name, department, doctor_name, appointment_date, appointment_time, notes, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [patientName, department, doctorName, appointmentDate, appointmentTime, notes, 'Scheduled']
    );

    // 3. Tell Next.js to refresh the appointments page to show the new data
    revalidatePath("/dashboard/appointments");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to insert appointment:", error);
    return { success: false, error: "Failed to save appointment to database" };
  }
}