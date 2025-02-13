import React, { useState } from 'react';
import Chat from './Chat';
import ModelSelector from './ModelSelector';

const App = () => {
    const [selectedModel, setSelectedModel] = useState('model1');

    return (
        <div style={{ padding: '20px' }}>
            <h1>Chatbot</h1>
            <ModelSelector selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
            <Chat selectedModel={selectedModel} />
        </div>
    );
};

export default App;