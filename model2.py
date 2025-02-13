def get_response(user_input):
    if "weather" in user_input.lower():
        return "The weather is great today!"
    elif "bye" in user_input.lower():
        return "Goodbye! Have a great day!"
    else:
        return "Can you please clarify your question?"