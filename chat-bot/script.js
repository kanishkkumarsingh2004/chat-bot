// Get references to HTML elements
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.querySelector('.chat-messages');

// Function to add a message to the chat
function addMessage(message, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(sender);
  messageDiv.textContent = message;
  chatMessages.appendChild(messageDiv);
}





// Function to handle user input and make an API request
async function handleUserInput() {
  const userMessage = userInput.value.trim();

  if (userMessage === '') {
    return; // Don't process empty messages
  }

  // Display user's message in the chat
  addMessage(userMessage, 'user');

  try {
    // Make an API request to your chatbot service
    const API_KEY = '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';
    const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions'; // Replace with your API endpoint URL
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch response from the chatbot API.');
    }

    const data = await response.json();

    // Display the bot's response in the chat
    addMessage(data.response, 'bot');
  } catch (error) {
    console.error('Error:', error);
    // Handle errors here, e.g., display an error message in the chat
    addMessage('Error: Unable to fetch response from the chatbot.', 'bot');
  }

  // Clear the input field
  userInput.value = '';
}

// Event listener for the Send button
sendButton.addEventListener('click', handleUserInput);

// Event listener for Enter key in the input field
userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleUserInput();
  }
});
