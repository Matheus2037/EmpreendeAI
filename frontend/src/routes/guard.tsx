import { useAuthContext } from "@/contexts/auth";
import { Outlet, Navigate } from "react-router-dom";

export function AuthGuard() {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
