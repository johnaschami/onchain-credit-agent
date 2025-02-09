const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());

const GAIA_API_URL = "https://0x0bf16f200e039d98948ccccb187444e6ba9e68e2.gaia.domains/v1/chat/completions";

app.post("/ask", async (req, res) => {
    const { question } = req.body;
    
    console.log('Received question:', question);

    try {
        // Increased timeout to 60 seconds
        const response = await axios.post(GAIA_API_URL, {
            model: "llama-3.2-3b",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: question }
            ],
            temperature: 0.7,
            max_tokens: 500
        }, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            timeout: 60000, // Increased timeout to 60 seconds
            validateStatus: function (status) {
                return status >= 200 && status < 600; // Accept a broader range of status codes
            }
        });

        if (response.status === 504) {
            return res.status(504).json({
                error: "Gateway timeout - The AI service is taking too long to respond",
                details: "Please try again in a few moments"
            });
        }

        res.json(response.data);
    } catch (error) {
        console.error("Error details:", {
            message: error.message,
            code: error.code,
            response: error.response?.data
        });

        // Send appropriate error response
        res.status(500).json({
            error: "Failed to get AI response",
            details: error.message,
            suggestion: "The AI service might be temporarily unavailable. Please try again in a few minutes."
        });
    }
});

// Add a simple test endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Using Gaia API URL: ${GAIA_API_URL}`);
});