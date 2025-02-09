import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { question } = req.body;
        console.log('Sending question to backend:', question);

        const response = await axios.post('http://localhost:5000/ask', 
            { question },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        console.log('Response from backend:', response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        res.status(500).json({ 
            error: 'Failed to get AI response',
            details: error.message 
        });
    }
}