import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/MongoDB.js";
import { verifyAndShowCv } from "./controller/Verify.js";
import { sendMail } from "./controller/Auth.js";
import EmailList from "./models/EmailList.js";
import contactRoutes from "./routes/ContactRoute.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: ["https://datalisa.se", "https://www.datalisa.se"],
    methods: "GET,POST",
    credentials: true,
  })
);


app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes
const router = express.Router();
app.use("/api", router);
app.use("/api/contact", contactRoutes);

router.get("/api/verify", verifyAndShowCv);
router.post("/send", sendMail);

app.get("/api/emails", async (req, res) => {
  try {
    const emails = await EmailList.find();
    res.json(emails);
  } catch (error) {
    res.status(500).json({ error: "Kunde inte hämta e-postadresser" });
  }
});

// Skapa __dirname (för ES-moduler)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servera från frontend-dist mappen
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Alla andra rutter skickas till index.html (för att React Router ska kunna hantera routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

// (Valfritt) Basrutt för API-status – denna rutt används inte om du öppnar frontenden
app.get("/api", (req, res) => {
  res.send("API is running");
  console.log("API is running");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
