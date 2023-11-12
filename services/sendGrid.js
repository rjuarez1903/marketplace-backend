import jwt from 'jsonwebtoken';
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendMail = async (email, subject, text, html) => {
  const msg = {
    to: email,
    from: process.env.USER_EMAIL,
    subject,
    text,
    html,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

export const sendPasswordResetEmail = async (user) => {
  const { email, firstName, _id } = user;
  const token = jwt.sign(
    { userId: _id, email: email },
    process.env.JWT_SECRET, 
    { expiresIn: '1h' } 
  );
  const resetPasswordUrl = `http://localhost:5173/reset-password?token=${token}`;
  const subject = "Restablecimiento de Contraseña";
  const text = `Hola ${firstName}, por favor hacé click en el enlace para restablecer tu contraseña: ${resetPasswordUrl}`;
  const html = `<p>Hola ${firstName}, por favor hacé click en el siguiente enlace para restablecer tu contraseña: <a href="${resetPasswordUrl}">${resetPasswordUrl}</a></p>`;
  await sendMail(email, subject, text, html);
}