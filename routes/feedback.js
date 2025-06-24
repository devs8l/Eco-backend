import express from 'express';
import Feedback from '../models/feedbackModel.js';
import { sendMail } from '../controllers/sendMail.js';

const router = express.Router();

// POST - Create new feedback
router.post('/', async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        const { email, name } = req.body;
        await sendMail(
            email,
            'Thank You for Your Feedback 🌼',
            `<p>Hi <strong>${name}</strong>,</p>
   <p>Thank you for sharing your thoughts with <strong>Eco Holiday</strong>! 🌿</p>
   <p>We truly appreciate your feedback and will carefully review your message. Our team is always working to improve, and your input helps us do that.</p>
   <p>Thanks for being part of the Eco Holiday family. We hope to see you again soon! 💚</p>
   <p>Warm regards,<br/><strong>The Eco Holiday Team</strong></p>`
        );

        res.status(201).json(feedback);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET - Get all feedback
router.get('/', async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;