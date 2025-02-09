import { useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await axios.post('/api/chat', { question });
            setResponse(result.data.choices[0].message.content);
        } catch (error) {
            console.error('Error:', error);
            setResponse('Error: Failed to get response from AI');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">AI Chat</h1>
            
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask a question..."
                    className="border p-2 mr-2"
                />
                <button 
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </form>

            {response && (
                <div className="mt-4 p-4 border rounded">
                    <h2 className="font-bold mb-2">Response:</h2>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
}

