import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    website: {type: String},
    phone: {type: String},
    company: {type: String},
    status: {
        type: String,
        enum: ["New", "Contacted", "Interested", "Not interested", "Converted", "Lost"],
        default: "New"
    },
    createdAt: {type: Date, default: Date.now},
    userId: {type: String, required: true},
});

const lead = mongoose.model("Lead", leadSchema);

export default lead;