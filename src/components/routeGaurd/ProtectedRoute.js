import { useAuth } from "../../contexts/AuthContext";
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user && !['/login', '/signup'].includes(location.pathname)) {
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  return children;
}
