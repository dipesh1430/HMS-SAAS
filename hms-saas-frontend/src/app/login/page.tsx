"use client"; // This tells Next.js we are using React state and client-side interactivity

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Activity, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setError(error.message || "Invalid login credentials");
        setIsLoading(false);
        return;
      }

      // If successful, push the user securely into the dashboard!
      router.push("/dashboard");
      
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4 font-inter">
      <div className="w-full max-w-md space-y-8">
        
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="rounded-full bg-blue-600 p-3 shadow-sm">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <h1 className="font-outfit text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            HMS Platform
          </h1>
        </div>

        <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="font-outfit text-2xl font-semibold tracking-tight">
              Welcome back
            </CardTitle>
            <CardDescription className="font-dmsans text-zinc-500 dark:text-zinc-400">
              Enter your credentials to access the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Error Message Display */}
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="admin@hospital.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-zinc-200 dark:border-zinc-800 focus-visible:ring-blue-600"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="font-jakarta text-sm text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-zinc-200 dark:border-zinc-800 focus-visible:ring-blue-600"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-jakarta font-medium mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}