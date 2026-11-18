import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sessionExpired } from "../redux/slices/authSlice";

export function useAuthGuard() {
  const expiresAt = useSelector((s) => s.auth.expiresAt);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!expiresAt) return;
    const ms = expiresAt - Date.now();
    if (ms <= 0) {
      dispatch(sessionExpired());
      return;
    }
    const t = setTimeout(() => dispatch(sessionExpired()), ms);
    return () => clearTimeout(t);
  }, [expiresAt, dispatch]);
}