import { ENV } from "../lib/env.js";
import { resendClient } from "../lib/resend.js";

export const sendMail = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required.",
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    /*
     * ---------------------------------------------------------
     * Email to Admin
     * ---------------------------------------------------------
     */

    const adminEmail = await resendClient.emails.send({
      from: ENV.RESEND_FROM_EMAIL,
      to: ENV.ADMIN_EMAIL,
      replyTo: email,
      subject: `New Contact Request${subject ? ` — ${subject}` : ""}`,

      html: `
        <!DOCTYPE html>
        <html>
          <body style="
            margin: 0;
            padding: 0;
            background: #f6f7f9;
            font-family: Arial, Helvetica, sans-serif;
            color: #171717;
          ">
            <div style="
              max-width: 600px;
              margin: 40px auto;
              background: #ffffff;
              border: 1px solid #e5e7eb;
              border-radius: 12px;
              overflow: hidden;
            ">

              <div style="
                padding: 24px;
                border-bottom: 1px solid #e5e7eb;
              ">
                <h1 style="
                  margin: 0;
                  font-size: 22px;
                  font-weight: 600;
                ">
                  New Contact Request
                </h1>

                <p style="
                  margin: 8px 0 0;
                  color: #737373;
                  font-size: 14px;
                ">
                  Someone submitted a new message through your website.
                </p>
              </div>

              <div style="padding: 24px;">

                <div style="margin-bottom: 20px;">
                  <p style="
                    margin: 0 0 6px;
                    color: #737373;
                    font-size: 13px;
                  ">
                    Name
                  </p>

                  <p style="
                    margin: 0;
                    font-size: 15px;
                    font-weight: 500;
                  ">
                    ${name}
                  </p>
                </div>

                <div style="margin-bottom: 20px;">
                  <p style="
                    margin: 0 0 6px;
                    color: #737373;
                    font-size: 13px;
                  ">
                    Email
                  </p>

                  <p style="
                    margin: 0;
                    font-size: 15px;
                  ">
                    ${email}
                  </p>
                </div>

                ${
                  phone
                    ? `
                      <div style="margin-bottom: 20px;">
                        <p style="
                          margin: 0 0 6px;
                          color: #737373;
                          font-size: 13px;
                        ">
                          Phone
                        </p>

                        <p style="
                          margin: 0;
                          font-size: 15px;
                        ">
                          ${phone}
                        </p>
                      </div>
                    `
                    : ""
                }

                ${
                  subject
                    ? `
                      <div style="margin-bottom: 20px;">
                        <p style="
                          margin: 0 0 6px;
                          color: #737373;
                          font-size: 13px;
                        ">
                          Subject
                        </p>

                        <p style="
                          margin: 0;
                          font-size: 15px;
                          font-weight: 500;
                        ">
                          ${subject}
                        </p>
                      </div>
                    `
                    : ""
                }

                <div>
                  <p style="
                    margin: 0 0 8px;
                    color: #737373;
                    font-size: 13px;
                  ">
                    Message
                  </p>

                  <div style="
                    padding: 16px;
                    background: #f9fafb;
                    border: 1px solid #e5e7eb;
                    border-radius: 8px;
                    font-size: 15px;
                    line-height: 1.6;
                    white-space: pre-line;
                  ">
                    ${message}
                  </div>
                </div>

              </div>

              <div style="
                padding: 16px 24px;
                background: #fafafa;
                border-top: 1px solid #e5e7eb;
                color: #737373;
                font-size: 12px;
              ">
                This message was sent from your website contact form.
              </div>

            </div>
          </body>
        </html>
      `,

      text: `
New Contact Request

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}\n` : ""}
${subject ? `Subject: ${subject}\n` : ""}

Message:
${message}
      `,
    });

    /*
     * ---------------------------------------------------------
     * Confirmation Email to User
     * ---------------------------------------------------------
     */

    const userEmail = await resendClient.emails.send({
      from: ENV.RESEND_FROM_EMAIL,
      to: email,
      subject: "Thanks for contacting us",

      html: `
        <!DOCTYPE html>
        <html>
          <body style="
            margin: 0;
            padding: 0;
            background: #f6f7f9;
            font-family: Arial, Helvetica, sans-serif;
            color: #171717;
          ">
            <div style="
              max-width: 600px;
              margin: 40px auto;
              background: #ffffff;
              border: 1px solid #e5e7eb;
              border-radius: 12px;
              overflow: hidden;
            ">

              <div style="padding: 32px 24px;">

                <h1 style="
                  margin: 0;
                  font-size: 24px;
                  font-weight: 600;
                ">
                  Thanks for reaching out, ${name}.
                </h1>

                <p style="
                  margin: 20px 0 0;
                  color: #525252;
                  font-size: 15px;
                  line-height: 1.7;
                ">
                  We've received your message and our team will review it
                  and get back to you as soon as possible.
                </p>

                <div style="
                  margin-top: 24px;
                  padding: 16px;
                  background: #f9fafb;
                  border: 1px solid #e5e7eb;
                  border-radius: 8px;
                ">
                  <p style="
                    margin: 0 0 8px;
                    font-size: 13px;
                    color: #737373;
                  ">
                    Your message
                  </p>

                  <p style="
                    margin: 0;
                    font-size: 14px;
                    line-height: 1.6;
                    white-space: pre-line;
                  ">
                    ${message}
                  </p>
                </div>

                <p style="
                  margin: 28px 0 0;
                  font-size: 15px;
                  line-height: 1.6;
                ">
                  Best regards,<br />
                  <strong>The Team</strong>
                </p>

              </div>

              <div style="
                padding: 16px 24px;
                background: #fafafa;
                border-top: 1px solid #e5e7eb;
                color: #737373;
                font-size: 12px;
              ">
                This is an automated confirmation email. Please don't reply
                if you don't need further assistance.
              </div>

            </div>
          </body>
        </html>
      `,

      text: `
Hi ${name},

Thank you for contacting us.

We've received your message and our team will get back to you as soon as possible.

Your message:

${message}

Best regards,
The Team
      `,
    });

    /*
     * ---------------------------------------------------------
     * Response
     * ---------------------------------------------------------
     */

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully.",
    });
  } catch (error) {
    console.error("Contact form email error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to send your message. Please try again later.",
    });
  }
};
