import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  console.log("Inkommande förfrågan från: ", name, email, message);

    if(!name || !email || !message) {
        return res.status(400).json({ message: 'Alla fält måste fyllas i' });
    }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: { 
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
        }   
    });
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.RECEIVER_EMAIL,
        subject: "Nytt meddelande från kontaktformulär",
        text: `Name: ${name}\nE-post: ${email || "Ej angivet"}\n\nMeddelande:\n${message}`,
        };
    
        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Tack för ditt meddelande.\nJag återkommer inom kort.' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Det gick inte att skicka meddelandet' });
        }
    });
    
    export default router;