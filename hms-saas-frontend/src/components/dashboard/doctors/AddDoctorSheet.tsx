"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserPlus, Loader2 } from "lucide-react";
import { addDoctor } from "@/app/actions/doctor-actions";

export function AddDoctorSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);

  const formData = new FormData(e.currentTarget);
  const result = await addDoctor(formData);

  setIsLoading(false);

  if (result.success) {
    setIsOpen(false); 
  } else {
    alert("Something went wrong saving the doctor!");
  }
 };

  // Re-using our perfected SaaS styling
  const inputClass = "flex w-full rounded-md border border-zinc-300 bg-transparent px-4 py-2.5 text-sm shadow-sm transition-all placeholder:text-zinc-500 hover:border-zinc-400 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:hover:border-zinc-600 dark:focus:border-blue-500 dark:focus:ring-blue-500/20";
  const labelClass = "text-sm font-medium text-zinc-900 dark:text-zinc-200 mb-2 block font-inter";

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all font-jakarta">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Doctor
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-[480px] overflow-y-auto border-l border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl p-6 sm:p-8">
        <SheetHeader className="mb-8">
          <SheetTitle className="font-outfit text-2xl tracking-tight text-zinc-900 dark:text-white">
            Register New Doctor
          </SheetTitle>
          <SheetDescription className="text-sm text-zinc-500 dark:text-zinc-400 font-dmsans">
            Add a new medical professional to the hospital directory.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className={labelClass}>Full Name</label>
            <input 
              id="fullName" 
              name="fullName" 
              placeholder="e.g. Dr. Amit Patel" 
              required 
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label htmlFor="department" className={labelClass}>Department</label>
              <select 
                id="department" 
                name="department"
                required
                className={inputClass} 
                defaultValue=""
              >
                <option value="" disabled>Select...</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="General">General Practice</option>
              </select>
            </div>
            <div>
              <label htmlFor="specialization" className={labelClass}>Specialization</label>
              <input 
                id="specialization" 
                name="specialization" 
                placeholder="e.g. Surgeon" 
                required 
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="contactNumber" className={labelClass}>Contact Number</label>
            <input 
              id="contactNumber" 
              name="contactNumber" 
              type="tel" 
              placeholder="+91 98765 43210" 
              required 
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>Email Address</label>
            <input 
              id="email" 
              name="email" 
              type="email"
              placeholder="doctor@hospital.com" 
              required 
              className={inputClass}
            />
          </div>

          <div className="pt-6 flex gap-3 w-full">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="flex-1 h-11 border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm font-jakarta"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white shadow-sm font-jakarta" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Doctor"
              )}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}