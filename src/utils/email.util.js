const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendResetPasswordEmail = async (email, resetLink) => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Reset your password",
    html: `
      <p>Bạn đã yêu cầu đặt lại mật khẩu.</p>
      <p>Click link bên dưới để đặt lại mật khẩu. Link có hiệu lực trong 15 phút.</p>
      <a href="${resetLink}">Đặt lại mật khẩu</a>
      <p>Nếu bạn không yêu cầu, hãy bỏ qua email này.</p>
    `
  });
};

module.exports = { sendResetPasswordEmail };
