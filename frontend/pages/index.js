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
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <div className="max-w-4xl mx-auto p-6">
                {/* Header Section */}
                <div className="text-center mb-12 pt-8">
                    <h1 className="text-4xl font-bold text-blue-800 mb-4">
                        SME Credit Score Assistant
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Your AI-powered guide to understanding and improving business credit scores. 
                        Ask questions about credit assessment, financial health, and SME financing.
                    </p>
                </div>

                {/* Chat Interface */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <form onSubmit={handleSubmit} className="mb-6">
                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="Ask about SME credit scores, financial assessment, or business financing..."
                                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                            <button 
                                type="submit"
                                disabled={loading}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : 'Get Answer'}
                            </button>
                        </div>
                    </form>

                    {/* Sample Questions */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-500 mb-2">Sample Questions:</h3>
                        <div className="flex flex-wrap gap-2">
                            {["How can I improve my business credit score?", 
                              "What factors affect SME credit ratings?", 
                              "How to prepare for credit assessment?"].map((q, i) => (
                                <button 
                                    key={i}
                                    onClick={() => setQuestion(q)}
                                    className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-3 rounded-full transition-colors"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Response Section */}
                    {response && (
                        <div className="mt-6 bg-blue-50 rounded-lg p-6 border border-blue-100">
                            <h2 className="font-semibold text-blue-800 mb-3">Expert Response:</h2>
                            <div className="text-gray-700 prose max-w-none">
                                {response}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <footer className="text-center text-gray-500 text-sm">
                    <p>Powered by HakunaMatata AI • Secure & Confidential</p>
                </footer>
            </div>
        </div>
    );
}