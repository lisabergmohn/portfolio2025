import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true}
});

export default mongoose.model("emailList", emailSchema);