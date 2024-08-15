import nodemailer from "nodemailer";

export const postSendMail = async (req, res, next) => {
  const { to, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // Deshabilita la verificación del certificado
    },
  });

  const mailOptions = {
    from: "",
    to,
    subject,
    text: message,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
            color: #333;
          }
          .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: auto;
          }
          h2 {
            color: #444;
          }
          p {
            line-height: 1.6;
          }
          .message-box {
            background-color: #f1f1f1;
            padding: 15px;
            border-left: 4px solid #4CAF50;
            border-radius: 4px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>New Message Regarding Your Property</h2>
          <p>Hello,</p>
          <p>You have received a new message regarding your property:</p>
          <div class="message-box">
            <h5>${message}</h5>
          </div>
          <p>Thank you,</p>
          <p>Your Real Estate Team</p>
        </div>
      </body>
      </html>
    `,
  };
  try {
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      } else {
        console.log(info);
      }
    });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
