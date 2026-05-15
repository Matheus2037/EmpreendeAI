import { useAuthContext } from "@/contexts/auth";
import { Navigate } from "react-router-dom";

export function Redirect() {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}
