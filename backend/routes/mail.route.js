import express from "express";
import { sendMail } from "../controllers/mail.controller.js";

const mailRouter = express.Router();

mailRouter.post("/send", sendMail);

export default mailRouter;
