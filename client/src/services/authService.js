// Admin credentials for demo — replace with API later.
const DEMO = {
  email: "admin@olison.com",
  password: "admin123",
  user: {
    id: "u_admin",
    email: "admin@olison.com",
    name: "Olison Admin",
    role: "admin",           // "admin" | "staff"
  },
};

const TOKEN_TTL_MS = 1000 * 60 * 60 * 8; // 8 hours

function fakeJwt(payload) {
  // Not a real JWT — just a readable base64 JSON blob for the demo.
  return (
    "demo." +
    btoa(JSON.stringify({ ...payload, exp: Date.now() + TOKEN_TTL_MS })) +
    ".token"
  );
}

function parseToken(token) {
  try {
    if (!token || !token.startsWith("demo.")) return null;
    const raw = token.split(".")[1];
    const data = JSON.parse(atob(raw));
    if (data.exp && Date.now() > data.exp) return null;
    return data;
  } catch {
    return null;
  }
}

const authService = {
  async login({ email, password, remember }) {
    // TODO: swap for
    // const res = await axios.post("/api/auth/login", { email, password });
    // return res.data; // { token, user }
    await new Promise((r) => setTimeout(r, 700));

    if (
      email.trim().toLowerCase() !== DEMO.email ||
      password !== DEMO.password
    ) {
      throw new Error("Invalid email or password");
    }

    const token = fakeJwt({ sub: DEMO.user.id, role: DEMO.user.role });
    return { token, user: DEMO.user, remember: Boolean(remember) };
  },

  logout() {
    // TODO: await axios.post("/api/auth/logout")
    return Promise.resolve(true);
  },

  getStoredSession() {
    const token =
      localStorage.getItem("olison_admin_token") ||
      sessionStorage.getItem("olison_admin_token");
    if (!token) return null;
    const data = parseToken(token);
    if (!data) {
      localStorage.removeItem("olison_admin_token");
      sessionStorage.removeItem("olison_admin_token");
      return null;
    }
    const userRaw =
      localStorage.getItem("olison_admin_user") ||
      sessionStorage.getItem("olison_admin_user");
    return {
      token,
      user: userRaw ? JSON.parse(userRaw) : null,
      expiresAt: data.exp,
    };
  },

  persistSession({ token, user, remember }) {
    const store = remember ? localStorage : sessionStorage;
    store.setItem("olison_admin_token", token);
    store.setItem("olison_admin_user", JSON.stringify(user));
  },

  clearSession() {
    localStorage.removeItem("olison_admin_token");
    localStorage.removeItem("olison_admin_user");
    sessionStorage.removeItem("olison_admin_token");
    sessionStorage.removeItem("olison_admin_user");
  },
};

export default authService;