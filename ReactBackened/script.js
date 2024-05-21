const quizData = [
  {
    question: "What is the output of typeof typeof 1?",
    options: ["number", "string", "object", "undefined"],
    answer: "string"
  },
  {
    question: "What will the following code output: console.log(2 + '2' - 1)?",
    options: ["22", "3", "21", "NaN"],
    answer: "21"
  },
  {
    question: "What is the result of 'hello' instanceof String?",
    options: ["true", "false", "Error", "undefined"],
    answer: "false"
  },
  {
    question: "What will be the output of console.log(3 === '3')?",
    options: ["true", "false", "Error", "undefined"],
    answer: "false"
  },
  {
    question: "What does the following expression return: 5 > 4 > 3?",
    options: ["true", "false", "Error", "undefined"],
    answer: "false"
  },
  {
    question: "What will be the output of console.log([] == ![])?",
    options: ["true", "false", "Error", "undefined"],
    answer: "true"
  },
  {
    question: "What is the value of x after the following code: let x = 5; x = x++ + ++x;",
    options: ["10", "11", "12", "undefined"],
    answer: "12"
  },
  {
    question: "What will be logged: console.log(typeof typeof undefined)?",
    options: ["undefined", "null", "string", "number"],
    answer: "string"
  },
  {
    question: "What is the result of console.log(2 ** 3 ** 2)?",
    options: ["512", "64", "72", "9"],
    answer: "512"
  },
  {
    question: "What will be the output of console.log(+'10' + +'5')?",
    options: ["15", "105", "NaN", "Error"],
    answer: "15"
  }
];


let currentQuestionIndex = 0;
let score = 0;
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const playAgainButton = document.getElementById("play-again-btn");
const questionCountElement = document.getElementById("question-count");
const scoreElement = document.getElementById("score");

function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  optionsContainer.innerHTML = '';

  currentQuestion.options.forEach(option => {
    const optionElement = document.createElement('div');
    optionElement.innerText = option;
    optionElement.classList.add('option');
    optionElement.addEventListener('click', () => selectOption(optionElement, currentQuestion.answer));
    optionsContainer.appendChild(optionElement);
  });

  updateQuizHeader();
}

function selectOption(optionElement, correctAnswer) {
  if (optionElement.classList.contains('disabled')) {
    return;
  }

  if (optionElement.innerText === correctAnswer) {
    optionElement.classList.add('correct');
    score += 10;
  } else {
    optionElement.classList.add('wrong');
  }

  Array.from(optionsContainer.children).forEach(option => {
    option.classList.add('disabled');
    option.removeEventListener('click', selectOption);
  });

  scoreElement.innerText = `Score: ${score}`;
}

function updateQuizHeader() {
  questionCountElement.innerText = `Question: ${currentQuestionIndex + 1} / ${quizData.length}`;
}

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    questionElement.innerText = "🎉🎉 Quiz Completed! 🎉🎉";
    optionsContainer.innerHTML = '';
    nextButton.style.display = 'none';
    playAgainButton.style.display = 'block';
  }
});

playAgainButton.addEventListener('click', () => {
  currentQuestionIndex = 0;
  score = 0;
  scoreElement.innerText = `Score: ${score}`;
  nextButton.style.display = 'block';
  playAgainButton.style.display = 'none';
  loadQuestion();
});

loadQuestion();
