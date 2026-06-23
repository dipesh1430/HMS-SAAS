"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { LogOut, Activity } from "lucide-react";

export function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); 
        },
      },
    });
  };

  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-6">
      <div className="flex items-center gap-2">
        <div className="rounded-md bg-blue-600 p-1.5">
          <Activity className="h-5 w-5 text-white" />
        </div>
        <span className="font-outfit text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
          QuickCare
        </span>
      </div>
      
      <Button 
        variant="outline" 
        onClick={handleLogout}
        className="font-inter text-zinc-600 hover:text-red-600 hover:border-red-200 dark:text-zinc-400 dark:hover:text-red-400 transition-colors"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </Button>
    </header>
  );
}