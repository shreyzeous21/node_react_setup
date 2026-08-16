import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

export const app = express();

const API_VERSION = "/api/v1";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const frontendPath = path.join(__dirname, "../frontend/dist");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  }),
);

app.use(API_VERSION, (_, res) => {
  res.send("🚀 API is working");
});

app.use(express.static(frontendPath));

app.get(/.*/, (_, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});
