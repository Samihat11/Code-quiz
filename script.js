//select dom elements
let quizBox = document.querySelector(".quiz-container");
let timeEL = document.querySelector(".timer");
let highScore = document.querySelector("#highScore");
let startButton = document.querySelector("#start");
let rules = document.querySelector(".rules");

let answerEl = document.querySelector(".answer");
let head = document.querySelector("header");
let result = document.querySelector(".result");
let resultEl = document.querySelector("#resultForm");
let labelText = document.querySelector("#text");

// variables
const count = 0;
let timeLeft = 101;
const score = 0;
let currentQuestionIndex = 0;
let correct = 0;
let wrong = 0;
let shuffledQ;

//create an array for questions
let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<scripting>", "<script>", "<Javascript>"],
    answer: "<script>",
  },
  {
    question: "How do you create a function in JavaScript?",
    options: [
      "function = myFunction()",
      "function:myFunction()",
      "function myFunction()",
    ],
    answer: "function myFunction()",
  },
  {
    question: "How do you round the number 7.25, to the nearest integer?",
    options: ["Math.rnd(7.25)", "round(7.25)", "Math.round(7.25)"],
    answer: "Math.round(7.25)",
  },
  {
    question: "How do you find the number with the highest value of x and y?",
    options: ["top(x,y)", "Math.max(x,y)", "Math.ceil(x,y)"],
    answer: "Math.max(x,y)",
  },
  {
    question: "How can you detect the client's browser name?",
    options: ["navigator.appName", "client.navName", "browser.name"],
    answer: "navigator.appName",
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    options: ["onclick", "onmouseover", "onchange", "onmouseclick"],
    answer: "onclick",
  },
];

let takeQuiz = function () {
  rules.classList.add("hide");
  shuffledQ = questions.sort(() => Math.random - 0.5);
  // currentQuestionIndex = 0;
  let startTimer = setInterval(function () {
    timeLeft--;
    timeEL.textContent = timeLeft;
    if (timeLeft <= 0 || currentQuestionIndex === shuffledQ.length - 1) {
      clearInterval(startTimer);
      gameOver();
    }
  }, 1000);

  nextQuestion();
};
startButton.addEventListener("click", takeQuiz);

let nextQuestion = function () {
  showQuestion(shuffledQ[currentQuestionIndex]);

  // if (currentQuestionIndex === shuffledQ.length - 1) {
  //   gameOver();
};
const questionEl = document.createElement("section");
let showQuestion = function (questions) {
  questionEl.textContent = shuffledQ.question;
  questionEl.classList.add("quiz-container");
  head.appendChild(questionEl);
  console.log(questions.answer);
  questions.options.forEach((option) => {
    console.log(option);
    const button = document.createElement("button");
    button.classList.add("btn");
    button.innerText = option;
    questionEl.appendChild(button);
    button.addEventListener("click", checkAnswer);
  });
};

function checkAnswer(e) {
  let selectedAnswer = e.target.innerText;
  console.log(selectedAnswer);
  const answer = shuffledQ[currentQuestionIndex].answer;
  console.log(answer);
  if (selectedAnswer === answer) {
    correct++;
    localStorage.setItem("Correct", correct);
    currentQuestionIndex++;
    nextQuestion();
  } else {
    timeLeft -= 10;
    wrong++;
    localStorage.setItem("Wrong", wrong);
    currentQuestionIndex++;
    nextQuestion();
  }
}
function gameOver() {
  questionEl.classList.add("hide");
  result.classList.remove("hide");
  labelText.innerText = `Your final score is ${correct}`;
}
