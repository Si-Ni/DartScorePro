const nodemailer = require("nodemailer");

async function sendRegistrationEmail(userID, userMail, registrationCode) {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: userMail,
    subject: "Registration Code DartsCounter",
    html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          h2 {
            color: #007BFF;
          }
        </style>
      </head>
      <body>
        <p>Hello ${userID},</p>
        <p>Your registration code is: <strong>${registrationCode}</strong></p>
        <p>Thank you for registering with our service.</p>
      </body>
    </html>
  `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Registration email sent successfully");
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return true;
  } catch (error) {
    console.error("Error sending registration email:", error);
    return false;
  }
}

module.exports = sendRegistrationEmail;
