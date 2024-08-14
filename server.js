const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let questions = [
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What is 2 + 2?", answer: "4" },
    // Add more questions here
];

let currentQuestionIndex = 0;
let currentQuestion = questions[currentQuestionIndex];

io.on('connection', (socket) => {
    console.log('A user connected');

    // Send the current question to the new user
    socket.emit('question', currentQuestion.question);

    // Handle answer submission
    socket.on('answer', (answer) => {
        if (answer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
            io.emit('correctAnswer', { user: socket.id, answer: answer });
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                currentQuestion = questions[currentQuestionIndex];
                io.emit('question', currentQuestion.question);
            } else {
                io.emit('gameOver');
            }
        } else {
            socket.emit('wrongAnswer', answer);
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

app.use(express.static('public'));

server.listen(3000, () => {
    console.log('Listening on *:3000');
});
