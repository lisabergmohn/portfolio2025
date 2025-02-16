import mongoose from "mongoose";

const verifyTokenSchema = new mongoose.Schema({
    email: {type: String, required: true},
    token: {type: String, required: true},
    expiresAt: {type: Date, required: true},
});

export default mongoose.model("verifyToken", verifyTokenSchema);