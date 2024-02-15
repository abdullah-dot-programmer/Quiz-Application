// Array of objects representing questions and their corresponding answers
const questions = [
    {
        question: "Which country has the largest democracy in the world?",
        answers: [
            {
                text: "United States",
                correct: false
            },
            {
                text: "England",
                correct: false
            },
            {
                text: "Pakistan",
                correct: false
            },
            {
                text: "India",
                correct: true
            },
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Madrid", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false },
        ]
    },
    {
        question: "Which country is famous for its Pyramids?",
        answers: [
            { text: "Egypt", correct: true },
            { text: "Greece", correct: false },
            { text: "Italy", correct: false },
            { text: "Mexico", correct: false },
        ]
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        answers: [
            { text: "China", correct: false },
            { text: "Japan", correct: true },
            { text: "South Africa", correct: false },
            { text: "Thailand", correct: false },
        ]
    },
];

// Selecting DOM elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-button");

// Initialize variables
let currentQuestionIndex = 0;
let score = 0;

// Function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
};

// Function to display the current question
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    // console.log(currentQuestion)
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        // console.log(answer.text)
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = true;
        }
        button.addEventListener("click", selectAnswer);
    })
};

// Function to reset the state of answer buttons and next button
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Function to handle the click event on an answer button
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct;
    // console.log(isCorrect)
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    // Disable all answer buttons after selecting an answer
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
};

// Event listener for the next button
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});
// Function to handle the click event on the next button
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
};

// Function to display the final score
function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
};



// Start the quiz when the page loads
startQuiz();