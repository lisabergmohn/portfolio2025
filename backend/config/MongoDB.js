import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();


// koppla upp mot mongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ Connected to MongoDB`);
    } catch (error) {
        console.error(`❌ Error when connecting to MongoDB`);
        process.exit(1); // avsluta vid fel
    }
}

export default connectDB;