import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const role = localStorage.getItem("userRole");

  if (!role) {
    return <Navigate to="/" replace />;
  }

  if (role !== allowedRole) {
    if (role === "customer") {
      return <Navigate to="/dashboard" replace />;
    }

    if (role === "operations") {
      return <Navigate to="/operations" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;