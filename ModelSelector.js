import React from 'react';

const ModelSelector = ({ selectedModel, setSelectedModel }) => {
    const models = ['model1', 'model2']; // Add more models as needed

    return (
        <div>
            <label htmlFor="model-select">Select a Model:</label>
            <select
                id="model-select"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                style={{ marginLeft: '10px' }}
            >
                {models.map((model) => (
                    <option key={model} value={model}>
                        {model}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ModelSelector;