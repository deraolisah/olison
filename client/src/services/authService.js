import api from "./api";

const TOKEN_KEY = "olison_admin_token";
const USER_KEY = "olison_admin_user";

const authService = {
  async login({ email, password, remember }) {
    const { data } = await api.post("/auth/login", { email, password });
    return { ...data, remember: Boolean(remember) };
  },

  logout() {
    return Promise.resolve(true);
  },

  getStoredSession() {
    const token =
      localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
    if (!token) return null;

    // Check local expiry
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp * 1000 < Date.now()) {
        this.clearSession();
        return null;
      }
      const userRaw =
        localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
      return {
        token,
        user: userRaw ? JSON.parse(userRaw) : null,
        expiresAt: payload.exp * 1000,
      };
    } catch {
      this.clearSession();
      return null;
    }
  },

  persistSession({ token, user, remember }) {
    const store = remember ? localStorage : sessionStorage;
    store.setItem(TOKEN_KEY, token);
    store.setItem(USER_KEY, JSON.stringify(user));
  },

  clearSession() {
    [localStorage, sessionStorage].forEach((s) => {
      s.removeItem(TOKEN_KEY);
      s.removeItem(USER_KEY);
    });
  },
};

export default authService;