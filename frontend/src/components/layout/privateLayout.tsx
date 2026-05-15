import { signOut } from "firebase/auth";
import { Button } from "../ui/button";
import { auth } from "@/config/firebase";
import { LogOut } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export function PrivateLayout() {
  const queryClient = useQueryClient();

  return (
    <div className="size-full flex items-center flex-col p-5">
      <header className="flex justify-between items-center w-full max-w-7xl mb-10">
        <Link to="/dashboard">
          <img src="/mascoteLogo.png" className="size-18 object-contain" />
        </Link>

        <Button
          size="lg"
          onClick={() => {
            signOut(auth);
            queryClient.clear();
          }}
        >
          Sair
          <LogOut />
        </Button>
      </header>

      <main className="size-full max-w-7xl flex flex-col gap-10">
        <Outlet />
      </main>
    </div>
  );
}
