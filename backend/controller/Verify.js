import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import verifyToken from '../models/User.js'
import path from 'path';

dotenv.config(); 

export const verifyAndShowCv = async (req, res) => {
    const token = req.query.token;

    if(!token) {
        return res.status(400).json({ error: "Ingen token är angiven" });
    }

    try {
        // verifiera jwt-signaturen
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // kolla om token finns i databas och är giltlig
        const record = await verifyToken.findOne({ token });

        if(!record || record.expiresAt < Date.now()) {
            return res
            .status(410)
            .json({ error: "Token har gått ut eller är ogitlig" });
        }

        // skicak cv-fil
        const cvPath = path.resolve("public/lbk.pdf");
        return res.sendFile(cvPath);

    } catch (error) {
        console.error(error);
        return res
        .status(500)
        .json({ error: "Något gick fel vid verifieringen" });
    }
};


