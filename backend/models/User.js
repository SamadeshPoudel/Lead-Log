import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    googleId: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    createdAt: {type: Date, default: Date.now},
})

const user = mongoose.model("User", userSchema);

export default user;