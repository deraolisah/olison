import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";


import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 4000;

// Security & middleware
app.use(helmet());

// Parse comma-separated origins from env
const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// Allow Vercel preview deployments like olison-git-main-user.vercel.app
const previewRegex = /^https:\/\/olison[a-z0-9-]*\.vercel\.app$/;

console.log("🔐 CORS allowed origins:", allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      // Non-browser clients (curl, Postman, mobile) have no origin
      if (!origin) return callback(null, true);

      const isAllowed =
        allowedOrigins.includes(origin) || previewRegex.test(origin);

    //   if (!isAllowed) {
    //     console.warn(`🚫 CORS blocked origin: ${origin}`);
    //   }
    //   callback(isAllowed ? null : new Error("Not allowed by CORS"), isAllowed);

        if (isAllowed) return callback(null, true);

        console.warn(`🚫 CORS blocked origin: ${origin}`);
        return callback(null, false); // ✅ just deny — no thrown error
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(morgan("dev"));


// Ensure database connection is established before processing requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

// Rate limit auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: "Too many attempts, try again later" },
});

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Olison API is Running!",
  });
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authLimiter, authRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

if (process.env.NODE_ENV === "development"){
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`)
    });
}

// ⚠️ Important: Export app, do not call app.listen()
export default app;