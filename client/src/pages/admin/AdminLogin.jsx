import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  loginAdmin,
  clearAuthError,
  selectIsAuthenticated,
} from "../../redux/slices/authSlice";

const MAX_ATTEMPTS = 5;
const LOCK_MS = 30_000;

export default function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loc = useLocation();

  const isAuthed = useSelector(selectIsAuthenticated);
  const { loading, error } = useSelector((s) => s.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: true,
  });
  const [showPw, setShowPw] = useState(false);
  const [touched, setTouched] = useState({});
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(0);
  const [now, setNow] = useState(Date.now());

  // Redirect if already logged in (respects ?from=)
  if (isAuthed) {
    const from = loc.state?.from?.pathname ?? "/admin";
    return <Navigate to={from} replace />;
  }

  // Clear stale error when the user starts typing again
  const onChange = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (error) dispatch(clearAuthError());
  };

  // Tick for lock countdown
  useEffect(() => {
    if (!lockedUntil) return;
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(t);
  }, [lockedUntil]);

  const isLocked = lockedUntil > now;
  const lockSecondsLeft = Math.ceil((lockedUntil - now) / 1000);

  const emailValid = /^\S+@\S+\.\S+$/.test(form.email);
  const passwordValid = form.password.length >= 6;
  const canSubmit =
    emailValid && passwordValid && !loading && !isLocked;

  const onSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!canSubmit) return;

    const res = await dispatch(
      loginAdmin({
        email: form.email,
        password: form.password,
        remember: form.remember,
      })
    );

    if (res.meta.requestStatus === "fulfilled") {
      const from = loc.state?.from?.pathname ?? "/admin";
      navigate(from, { replace: true });
      return;
    }

    // Track failed attempts → lock for 30s
    const next = attempts + 1;
    setAttempts(next);
    if (next >= MAX_ATTEMPTS) {
      setLockedUntil(Date.now() + LOCK_MS);
      setAttempts(0);
    }
  };

  const fieldErr = (k) => touched[k] && !form[k];

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif text-primary">Olison Admin</h1>
          <p className="text-sm text-text/60 mt-2">
            Sign in to manage your store
          </p>
        </div>

        <form onSubmit={onSubmit} className="card space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="label">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              className={`input ${
                fieldErr("email") ? "border-red-400" : ""
              }`}
              placeholder="admin@olison.com"
              value={form.email}
              onChange={(e) => onChange("email", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              disabled={loading || isLocked}
              required
            />
            {fieldErr("email") && (
              <p className="text-xs text-red-600 mt-1">Email is required</p>
            )}
            {touched.email && form.email && !emailValid && (
              <p className="text-xs text-red-600 mt-1">
                Enter a valid email address
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="label">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPw ? "text" : "password"}
                autoComplete="current-password"
                className={`input pr-16 ${
                  fieldErr("password") ? "border-red-400" : ""
                }`}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => onChange("password", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                disabled={loading || isLocked}
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-text/60 hover:text-primary px-2 py-1"
                tabIndex={-1}
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
            {fieldErr("password") && (
              <p className="text-xs text-red-600 mt-1">Password is required</p>
            )}
            {touched.password && form.password && !passwordValid && (
              <p className="text-xs text-red-600 mt-1">
                Minimum 6 characters
              </p>
            )}
          </div>

          {/* Remember me */}
          <label className="flex items-center gap-2 text-sm text-text/80 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 accent-primary"
              checked={form.remember}
              onChange={(e) => onChange("remember", e.target.checked)}
              disabled={loading || isLocked}
            />
            Keep me signed in for 8 hours
          </label>

          {/* Error / lock banner */}
          {error && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 p-2.5 rounded">
              {error}
            </p>
          )}
          {isLocked && (
            <p className="text-sm text-yellow-800 bg-yellow-50 border border-yellow-200 p-2.5 rounded">
              Too many failed attempts. Try again in {lockSecondsLeft}s.
            </p>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className="cta w-full disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>

          <p className="text-xs text-center text-text/40 pt-2 border-t">
            Demo: <b>admin@olison.com</b> / <b>admin123</b>
          </p>
        </form>

        <p className="text-center mt-6 text-sm text-text/60">
          <a href="/" className="hover:text-primary">← Back to store</a>
        </p>
      </div>
    </div>
  );
}