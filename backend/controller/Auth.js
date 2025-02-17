import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import validator from "validator";
import EmailList from "../models/EmailList.js";
import verifyToken from "../models/User.js";

console.log("API_URL:", process.env.API_URL);

export const sendMail = async (req, res) => {
  const { email } = req.body;

  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ error: "Ogitlig e-post" });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const code = new verifyToken({
    email,
    token,
    expiresAt: Date.now() + 60 * 60 * 1000,
  });
  await code.save();

  // spara e-post i separat databas
  const existingEmail = await EmailList.findOne({ email });
  if (!existingEmail) {
    await new EmailList({ email }).save();
  }

  // Konfigurera nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verificationLink = `${process.env.API_URL}/api/verify?token=${token}`;

  //const verificationLink = `https://www.datalisa.se/api/verify?token=${token}`;


  const mailOptions = {
    from: `Lisa B Karlmark <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Din engångslänk till CV",
    text: `Klicka på följande länk för att se mitt CV: 
    ${verificationLink}
    Länken gäller i 1 timme.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Länk skickad till e-post" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Kunde inte skicka e-post" });
  }
};
