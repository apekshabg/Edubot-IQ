// AI Chatbot functionality

// Send question to backend
function sendQuestion() {
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const message = userInput.value.trim();

    if (!message) return;

    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'user-message';
    userMsg.textContent = message;
    chatBox.appendChild(userMsg);

    // Clear input
    userInput.value = '';

    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;

    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'bot-message';
    typingIndicator.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span> EduBot is typing...</div>';
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Get AI response from backend
    fetch('/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        // Remove typing indicator
        chatBox.removeChild(typingIndicator);

        // Add bot response
        const botMsg = document.createElement('div');
        botMsg.className = 'bot-message';

        // Preserve line breaks
        const formattedResponse = data.response.replace(/\n/g, '<br>');
        botMsg.innerHTML = formattedResponse;

        chatBox.appendChild(botMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => {
        console.error('Error:', error);
        chatBox.removeChild(typingIndicator);

        const errorMsg = document.createElement('div');
        errorMsg.className = 'bot-message error';
        errorMsg.textContent = "Connection error. Please try again.";
        chatBox.appendChild(errorMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}

// Initialize chatbot
function initChatbot() {
    // Add event listener to send button
    document.querySelector('.input-area button').addEventListener('click', sendQuestion);

    // Add event listener for Enter key
    document.getElementById('user-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendQuestion();
        }
    });

    // Add welcome message
    const chatBox = document.getElementById('chat-box');
    const welcomeMsg = document.createElement('div');
    welcomeMsg.className = 'bot-message';
    welcomeMsg.textContent = "Hello! I'm EduBot, your AI learning assistant. How can I help you today?";
    chatBox.appendChild(welcomeMsg);

    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Initialize chatbot when on dashboard
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.chatbot-section')) {
        initChatbot();
    }
});