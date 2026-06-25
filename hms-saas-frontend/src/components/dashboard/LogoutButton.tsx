import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { logoutUser } from "@/app/actions/auth-actions";

export function LogoutButton() {
  return (
    <form action={logoutUser}>
      <Button 
        type="submit" 
        variant="ghost" 
        className="w-full justify-start text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400"
        title="Sign Out"
      >
        <LogOut className="h-4 w-4 md:mr-2" />
        <span className="hidden md:inline">Sign Out</span>
      </Button>
    </form>
  );
}