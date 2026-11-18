import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectIsAuthenticated, selectAuthRole } from "../redux/slices/authSlice";

export default function ProtectedRoute({ requiredRole = "admin" }) {
  const isAuthed = useSelector(selectIsAuthenticated);
  const role = useSelector(selectAuthRole);
  const loc = useLocation();

  if (!isAuthed) {
    return <Navigate to="/admin/login" state={{ from: loc }} replace />;
  }

  if (requiredRole && role !== requiredRole && role !== "admin") {
    return (
      <div className="p-12 text-center">
        <h2 className="text-2xl font-serif text-primary">Access denied</h2>
        <p className="mt-2 text-text/70">
          You don't have permission to view this page.
        </p>
      </div>
    );
  }

  return <Outlet />;
}