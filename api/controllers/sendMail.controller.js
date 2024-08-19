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

export const postSendContactMail = async (req, res, next) => {
  const { to, name, message } = req.body;

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
    subject: `Thank you, ${name}! We've received your message and will get back to you shortly`,
    text: message,
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Your Message</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 50px auto;
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
    }
    .header h1 {
      color: #2c3e50;
    }
    .content {
      font-size: 16px;
      line-height: 1.6;
    }
    .content p {
      margin-bottom: 20px;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #777;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You, ${name}!</h1>
    </div>
    <div class="content">
      <p>Dear ${name},</p>
      <p>Thank you for getting in touch with us. We have received your message and one of our team members will be reaching out to you shortly.</p>
      <p>If you need immediate assistance, please feel free to call us directly at [Your Phone Number] or reply to this email.</p>
      <p>We appreciate your interest and look forward to assisting you!</p>
      <p>Best regards,</p>
      <p><strong>The Property Horizon Team</strong></p>
    </div>
    <div class="footer">
      <p>&copy; 2024 Property Horizon. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`,
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
