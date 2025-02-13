import React, { useState } from 'react';
import axios from 'axios';

const Chat = ({ selectedModel }) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSend = async () => {
        if (!input) return; // Prevent sending empty messages

        // Add user message to chat
        const userMessage = { user: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // Send request to the backend
        try {
            const response = await axios.post('http://localhost:5000/api/chat', {
                input,
                model: selectedModel,
            });
            const botMessage = { bot: response.data.response };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
        }

        // Clear input field
        setInput('');
    };

    return (
        <div>
            <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
                {messages.map((msg, index) => (
                    <div key={index}>
                        {msg.user && <strong>You:</strong>} {msg.user}
                        {msg.bot && <strong>Bot:</strong>} {msg.bot}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                style={{ width: '80%', marginRight: '10px' }}
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default Chat;