"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Activity, Lock, Mail, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { loginUser } from "@/app/actions/auth-actions";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await loginUser(formData);

    // If we get a result back, it means there was an error (otherwise it redirects)
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  };

  const inputClass = "flex w-full rounded-md border border-zinc-300 bg-transparent px-4 py-2.5 pl-10 text-sm shadow-sm transition-all placeholder:text-zinc-500 hover:border-zinc-400 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:hover:border-zinc-600 dark:focus:border-blue-500 dark:focus:ring-blue-500/20";

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4 font-inter">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        
        <div className="flex flex-col items-center justify-center p-8 pb-6 border-b border-zinc-100 dark:border-zinc-800/50 text-center">
          <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 mb-4">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <h1 className="font-bricolage text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            HMS Platform
          </h1>
          <p className="font-dmsans text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            Sign in to access the hospital management dashboard.
          </p>
        </div>

        <div className="p-8 pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Error Message Display */}
            {error && (
              <div className="p-3 rounded-md bg-rose-50 border border-rose-200 flex items-start text-rose-600 dark:bg-rose-900/20 dark:border-rose-900/50 dark:text-rose-400">
                <AlertCircle className="h-5 w-5 mr-2 shrink-0" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-zinc-900 dark:text-zinc-200 mb-2 block font-jakarta">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input 
                  type="email" 
                  name="email"
                  placeholder="admin@hospital.com" 
                  required 
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-zinc-900 dark:text-zinc-200 block font-jakarta">
                  Password
                </label>
                <Link href="#" className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input 
                  type="password" 
                  name="password"
                  placeholder="••••••••" 
                  required 
                  className={inputClass}
                />
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white shadow-sm font-jakarta mt-2">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
}