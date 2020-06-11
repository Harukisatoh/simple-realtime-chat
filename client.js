const socket = io('http://localhost:3000/');

const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const username = prompt("What's your name?");
appendMessage('You joined');
socket.emit('new-user', username);

socket.on('chat-message', (messageObject) => {
    appendMessage(`${messageObject.username}: ${messageObject.message}`);
});

socket.on('user-connected', (name) => {
    appendMessage(`${name} connected`);
});

socket.on('user-disconnected', (name) => {
    appendMessage(`${name} disconnected`);
});

messageForm.addEventListener('submit', (event) => {
    // Prevents from page reload
    event.preventDefault();

    // Gets the message and send to server
    const message = messageInput.value;

    if (message === '') {
        return;
    }

    socket.emit('send-chat-message', message);

    // Renders your own message
    appendMessage(`You: ${message}`);

    // Clears the input element
    messageInput.value = '';
});

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}
