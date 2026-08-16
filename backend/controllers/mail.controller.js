import { ENV } from "../lib/env.js";
import { resendClient } from "../lib/resend.js";

export const sendMail = async (req, res) => {
  const { name, email, message } = req.body;

  await resendClient.emails.send({
    from: ENV.RESEND_FROM_EMAIL,
    to: "divyajeetsingh33@gmail.com",
    subject: `New Contact Form Message from ${name}`,
    replyTo: email,
    text: message,
  });

  res.status(200).json({
    success: true,
    message: "Email sent successfully",
  });
};
