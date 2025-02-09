import { useState } from "react";
import axios from "axios";

export default function Home() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const askAI = async () => {
        const response = await axios.post("http://localhost:5000/ask", { question });
        setAnswer(response.data.choices[0].message.content);
    };

    return (
        <div style={{ padding: "2rem", fontFamily: "Arial" }}>
            <h1>AI On-Chain Credit Knowledge Base</h1>
            <input 
                type="text" 
                value={question} 
                onChange={(e) => setQuestion(e.target.value)} 
                placeholder="Ask about on-chain credit..." 
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
            <button onClick={askAI} style={{ padding: "10px 20px", cursor: "pointer" }}>Ask AI</button>
            <p><strong>Response:</strong> {answer}</p>
        </div>
    );
}
