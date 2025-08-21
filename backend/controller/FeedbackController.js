
import FeedbackModel from "../model/feedback.js";

// Create Feedback
export const createFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const feedback = new FeedbackModel({ name, email, message, userId: req.userId || null });
    await feedback.save();
    res.status(201).json({ success: true, message: "Feedback submitted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error submitting feedback", error: err.message });
  }
};

// Get All Feedback (for Admin)
export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await FeedbackModel.find().sort({ createdAt: -1 });
    console.log("All feedbacks from DB:", feedbacks); 
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


