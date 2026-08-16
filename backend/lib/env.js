import dotenv from "dotenv";

dotenv.config();

export const ENV = Object.freeze({
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT) || 8000,
});
