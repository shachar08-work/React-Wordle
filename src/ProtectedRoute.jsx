import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/select" replace />;
  }

  console.log(user.displayName); // safe to access here

  return children;
}