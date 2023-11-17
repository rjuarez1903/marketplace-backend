import jwt from "jsonwebtoken";
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
    { expiresIn: "1h" }
  );
  const resetPasswordUrl = `http://localhost:5173/reset-password?token=${token}`;
  const subject = "Restablecimiento de Contraseña";

  const text = `Hola ${firstName}, por favor hacé en el enlace para restablecer tu contraseña: ${resetPasswordUrl}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        .email-link {
          color: #4F46E5; /* Color del enlace */
          text-decoration: underline; /* Subrayado para resaltar que es un enlace */
          font-size: 16px;
        }
    
        .email-link:hover {
          color: #6D28D9; /* Color al pasar el mouse sobre el enlace */
        }
    
        .email-link:visited {
          color: #9CA3AF; /* Color del enlace visitado */
        }
    
        .email-body {
          font-family: Arial, sans-serif;
          line-height: 1.5;
          color: #374151;
        }
    
        .email-container {
          padding: 20px;
          background-color: #F3F4F6;
        }
    
        .email-title {
          color: #1F2937;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
    
        p {
          color: #4B5563;
          font-size: 16px;
          margin-bottom: 10px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-body">
          <div class="email-title">EduHub Team</div>
          <p>Hola ${firstName},</p>
          <p>Por favor haz click en el siguiente enlace para restablecer tu contraseña:</p>
          <a href="${resetPasswordUrl}" class="email-link">Restablecer Contraseña</a>
          <p>Si no solicitaste un restablecimiento de contraseña, ignora este correo electrónico o ponte en contacto con nosotros si tienes alguna pregunta.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendMail(email, subject, text, html);
};
