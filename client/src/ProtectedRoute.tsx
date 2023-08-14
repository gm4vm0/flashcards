import { ReactNode } from "react";
import useAuthStore from "./stores/auth-store";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const user = useAuthStore((state) => state.user);

  if (!user) return <Navigate to="/" replace />;
  return children;
}

export default ProtectedRoute;
