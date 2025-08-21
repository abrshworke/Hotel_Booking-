
// models/Room.js
import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },

  
}, { timestamps: true });

const FeedbackModel = mongoose.model("Feedback", FeedbackSchema);
export default  FeedbackModel;
