import dotenv from "dotenv";

dotenv.config();

export const ENV = Object.freeze({
  NODE_ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT),
});
