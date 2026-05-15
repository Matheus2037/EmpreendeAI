import { signOut } from "firebase/auth";
import { Button } from "../ui/button";
import { auth } from "@/config/firebase";
import { LogOut } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const MOCK_MODE = import.meta.env.VITE_MOCK_AUTH === "true";

export function PrivateLayout() {
  const queryClient = useQueryClient();

  return (
    <div className="size-full flex items-center flex-col p-5">
      <header className="flex justify-between items-center w-full max-w-7xl mb-10">
        <Link to="/dashboard" className="flex items-center gap-1 select-none">
          <span className="text-xl font-bold text-primary">Empreende</span>
          <span className="text-xl font-bold text-foreground">AI</span>
        </Link>

        {!MOCK_MODE && (
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              signOut(auth);
              queryClient.clear();
            }}
          >
            Sair
            <LogOut />
          </Button>
        )}
      </header>

      <main className="size-full max-w-7xl flex flex-col gap-10">
        <Outlet />
      </main>
    </div>
  );
}
