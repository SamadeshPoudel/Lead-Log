import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  leadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lead",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, {
  timestamps: true // auto adds createdAt & updatedAt
});


const activity = mongoose.model("Activity", activitySchema);

export default activity;