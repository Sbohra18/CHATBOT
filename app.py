from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import sqlite3
from models.model1 import get_response as model1_response
from models.model2 import get_response as model2_response

app = Flask(__name__)
CORS(app)

# Database setup
def init_db():
    conn = sqlite3.connect('chat_history.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS chat_history
                 (id INTEGER PRIMARY KEY, user_input TEXT, bot_response TEXT)''')
    conn.commit()
    conn.close()

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_input = data['input']
    model_choice = data['model']

    if model_choice == 'model1':
        bot_response = model1_response(user_input)
    elif model_choice == 'model2':
        bot_response = model2_response(user_input)
    else:
        return jsonify({'error': 'Model not found'}), 404

    # Store chat history
    store_chat_history(user_input, bot_response)

    return jsonify({'response': bot_response})

def store_chat_history(user_input, bot_response):
    conn = sqlite3.connect('chat_history.db')
    c = conn.cursor()
    c.execute("INSERT INTO chat_history (user_input, bot_response) VALUES (?, ?)", (user_input, bot_response))
    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
    app.run(debug=True)