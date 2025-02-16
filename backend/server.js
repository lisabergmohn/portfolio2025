import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/MongoDB.js";
import { verifyAndShowCv } from "./controller/Verify.js";
import cors from "cors";
import { sendMail } from "./controller/Auth.js";
import EmailList from "./models/EmailList.js";
import contactRoutes from "./routes/ContactRoute.js";

const app = express();

dotenv.config();

// middleware

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: "GET,POST",
    credentials: true,
  })
);

app.use(express.json());

// connect to mongodb
connectDB();

// Routes
const router = express.Router();
app.use("/api", router);
app.use("/api/contact", contactRoutes);

app.get("/api/verify", verifyAndShowCv);
app.post("/api/send", sendMail);

app.get("/api/emails", async (req, res) => {
  try {
    const emails = await EmailList.find();
    res.json(emails);
  } catch (error) {
    res.status(500).json({ error: "Kunde inte hämta e-postadresser" });
  }
});

// basrutt
app.get("/", (req, res) => {
  res.send("Api is running");
  console.log("Api is running");
});

const PORT = process.env.PORT || 8080;

// connecting to server port 8080
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
