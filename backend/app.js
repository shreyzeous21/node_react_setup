import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import mailRouter from "./routes/mail.route.js";

export const app = express();

const API_VERSION = "/api/v1";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const frontendPath = join(__dirname, "../frontend/dist");

// =========================
// Middleware
// =========================

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// API
// =========================

// API health check
app.get(API_VERSION, (_req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 API is working",
  });
});

// Mail routes
app.use(`${API_VERSION}/mail`, mailRouter);

// =========================
// Frontend
// =========================

// Serve React/Vite frontend
app.use(express.static(frontendPath));

// React/Vite SPA fallback
app.use((req, res, next) => {
  // Don't return index.html for unknown API routes
  if (req.path.startsWith(API_VERSION)) {
    return next();
  }

  res.sendFile(join(frontendPath, "index.html"));
});

// =========================
// 404
// =========================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// =========================
// Error Handler
// =========================

app.use((err, _req, res, _next) => {
  console.error("❌ Server Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});
