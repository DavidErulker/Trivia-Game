const questions = [
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What is 2 + 2?", answer: "4" },
    { question: "What is the tallest mountain in the world?", answer: "Everest" },
    { question: "Who wrote 'To Kill a Mockingbird'?", answer: "Harper Lee" },
    // Add more questions here
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer');
const submitButton = document.getElementById('submit');
const messagesElement = document.getElementById('messages');
const scoreElement = document.getElementById('score');

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        questionElement.textContent = questions[currentQuestionIndex].question;
        answerInput.value = '';
        answerInput.focus();
    } else {
        questionElement.textContent = 'Game Over! Your final score is ' + score;
        answerInput.disabled = true;
        submitButton.disabled = true;
    }
}

submitButton.addEventListener('click', () => {
    const answer = answerInput.value.trim().toLowerCase();
    if (answer === questions[currentQuestionIndex].answer.toLowerCase()) {
        score++;
        messagesElement.textContent = 'Correct!';
    } else {
        messagesElement.textContent = 'Wrong answer!';
    }
    scoreElement.textContent = 'Score: ' + score;
    currentQuestionIndex++;
    loadQuestion();
});

// Load the first question when the game starts
loadQuestion();
