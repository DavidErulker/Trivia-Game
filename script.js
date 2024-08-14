const socket = io();

const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer');
const submitButton = document.getElementById('submit');
const messagesElement = document.getElementById('messages');

socket.on('question', (question) => {
    questionElement.textContent = question;
    answerInput.value = '';
    answerInput.focus();
});

socket.on('correctAnswer', (data) => {
    const message = document.createElement('div');
    message.textContent = `${data.user} answered correctly: ${data.answer}`;
    messagesElement.appendChild(message);
});

socket.on('wrongAnswer', (answer) => {
    const message = document.createElement('div');
    message.textContent = `Wrong answer: ${answer}`;
    messagesElement.appendChild(message);
});

socket.on('gameOver', () => {
    questionElement.textContent = 'Game Over!';
    answerInput.disabled = true;
    submitButton.disabled = true;
});

submitButton.addEventListener('click', () => {
    const answer = answerInput.value;
    socket.emit('answer', answer);
});
