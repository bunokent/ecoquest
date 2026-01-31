import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: React.ReactElement;
  requireAuth?: boolean;
  requiredProgress?: number;
}

const ProtectedRoute = ({
  element,
  requireAuth = true,
  requiredProgress,
}: ProtectedRouteProps) => {
  const name = localStorage.getItem("name");
  const character = localStorage.getItem("character");
  const progress = parseInt(localStorage.getItem("progress") || "1", 10);
  const isAuthenticated = name && character;

  if (requireAuth && !isAuthenticated) {
    // User needs to authenticate, redirect to start
    return <Navigate to="/start" replace />;
  }

  if (!requireAuth && isAuthenticated) {
    // User is already authenticated, redirect to map
    return <Navigate to="/map" replace />;
  }

  if (requiredProgress && progress < requiredProgress) {
    // User hasn't unlocked this zone yet, redirect to map
    return <Navigate to="/map" replace />;
  }

  return element;
};

export default ProtectedRoute;
