const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const GAIA_API_URL = "https://0x0bf16f200e039d98948ccccb187444e6ba9e68e2.gaia.domains/v1/chat/completions";

app.post("/ask", async (req, res) => {
    const { question } = req.body;

    try {
        const response = await axios.post(GAIA_API_URL, {
            messages: [
                { role: "system", content: "You are a financial assistant specializing in blockchain credit history." },
                { role: "user", content: question }
            ]
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Failed to fetch response from AI agent" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
