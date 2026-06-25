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
import { Receipt, Loader2 } from "lucide-react";
import { addInvoice } from "@/app/actions/invoice-actions";

export function AddInvoiceSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     setIsLoading(true);

     const formData = new FormData(e.currentTarget);
     const result = await addInvoice(formData);

     setIsLoading(false);

     if (result.success) {
       setIsOpen(false); 
     } else {
       alert("Something went wrong saving the invoice!");
     }
   };

  // Premium SaaS styling
  const inputClass = "flex w-full rounded-md border border-zinc-300 bg-transparent px-4 py-2.5 text-sm shadow-sm transition-all placeholder:text-zinc-500 hover:border-zinc-400 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:hover:border-zinc-600 dark:focus:border-blue-500 dark:focus:ring-blue-500/20";
  const labelClass = "text-sm font-medium text-zinc-900 dark:text-zinc-200 mb-2 block font-inter";

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all font-jakarta">
          <Receipt className="mr-2 h-4 w-4" />
          Create Invoice
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-[480px] overflow-y-auto border-l border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl p-6 sm:p-8">
        <SheetHeader className="mb-8">
          <SheetTitle className="font-outfit text-2xl tracking-tight text-zinc-900 dark:text-white">
            Generate Invoice
          </SheetTitle>
          <SheetDescription className="text-sm text-zinc-500 dark:text-zinc-400 font-dmsans">
            Bill a patient for medical services or consultations.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label htmlFor="patientName" className={labelClass}>Patient Name</label>
              <input 
                id="patientName" 
                name="patientName" 
                placeholder="e.g. Kanjariya Dipesh" 
                required 
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="doctorName" className={labelClass}>Attending Doctor</label>
              <input 
                id="doctorName" 
                name="doctorName" 
                placeholder="e.g. Dr. Amit Patel" 
                required 
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label htmlFor="amount" className={labelClass}>Amount (₹)</label>
              <input 
                id="amount" 
                name="amount" 
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00" 
                required 
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="dueDate" className={labelClass}>Due Date</label>
              <input 
                id="dueDate" 
                name="dueDate" 
                type="date" 
                required 
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="notes" className={labelClass}>Invoice Notes / Description</label>
            <textarea 
              id="notes" 
              name="notes" 
              rows={4}
              placeholder="Consultation fee, blood tests, etc." 
              className={`${inputClass} resize-none`}
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
                  Generating...
                </>
              ) : (
                "Create Invoice"
              )}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}