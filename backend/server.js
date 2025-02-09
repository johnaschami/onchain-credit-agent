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

// Add a root GET route
app.get('/', (req, res) => {
    res.send('Backend server is running!');
});

// Add a health check route
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString() 
    });
});

// Your existing POST route for AI chat
app.post("/ask", async (req, res) => {
    const { question } = req.body;
    
    console.log('Received question:', question);

    try {
        const response = await axios.post(GAIA_API_URL, {
            model: "llama-3.2-3b",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: question }
            ]
        }, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({
            error: "Failed to get AI response",
            details: error.message
        });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Using Gaia API URL: ${GAIA_API_URL}`);
});