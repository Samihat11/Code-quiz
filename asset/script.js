//select dom elements
let quizBox = document.querySelector(".quiz-container");
let timeEL = document.querySelector(".timer");
let highscores = document.getElementById("highscore");
let startButton = document.querySelector("#start");
let rules = document.querySelector(".rules");
let answerEl = document.querySelector(".answer");
let head = document.querySelector("header");
let result = document.querySelector(".scoreResult");
let resultEl = document.querySelector("#resultForm");
let labelText = document.querySelector("#text");
let save = document.querySelector("#save");
let initialEl = document.querySelector("#initials");

// global variables
let timeLeft = 61;
let currentQuestionIndex;
let correct = 0;
let shuffledQ;
const questionEl = document.createElement("section");
let storedScores = JSON.parse(localStorage.getItem("storedScores")) || [];

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
//create function that starts the quiz and timer.
let takeQuiz = function () {
  rules.classList.add("hide");
  currentQuestionIndex = 0;
  let startTimer = setInterval(function () {
    if (timeLeft > 0) {
      timeLeft--;
    }
    timeEL.textContent = "Time: " + timeLeft;
    if (timeLeft <= 0 || currentQuestionIndex === questions.length) {
      timeEL.textContent = "";
      clearInterval(startTimer);
      gameOver();
    }
  }, 1000);
  //function to display questions
  nextQuestion();
};

// add event listener to trigger the showQuiz function.
startButton.addEventListener("click", takeQuiz);

//
let nextQuestion = function () {
  showQuestion(questions[currentQuestionIndex]);
};

/* Uses the section created globally to append question
Also creates buttons to display the options for the question 
*/
let showQuestion = function (questions) {
  questionEl.textContent = questions.question;
  questionEl.classList.add("container");
  head.appendChild(questionEl);
  questions.options.forEach((option) => {
    const button = document.createElement("button");
    button.classList.add("answerBtn");
    button.innerText = option;
    questionEl.appendChild(button);
    button.addEventListener("click", checkAnswer);
  });
};
/*Listens for a click to identify which option was chosen
  if correct changes background to green and red if wrong
  reduces time by 10 seconds if wrong
*/
function checkAnswer(e) {
  let selectedAnswer = e.target.innerText;
  const answer = questions[currentQuestionIndex].answer;
  if (selectedAnswer === answer) {
    correct++;
    e.target.classList.add("correct");
    currentQuestionIndex++;
  } else {
    timeLeft -= 10;
    if (timeLeft <= 0) {
      timeLeft = 0;
    }

    e.target.classList.add("wrong");
    currentQuestionIndex++;
  }
  if (currentQuestionIndex < questions.length) {
    setTimeout(nextQuestion, 500);
  }
}

//stops the quiz
function gameOver() {
  questionEl.classList.add("hide");
  result.classList.remove("hide");
  labelText.innerHTML = `<strong>Your final score is ${Math.round(
    correct * 16.7
  )}</strong>`;
  saveScore();
}
//saves the score and initial
function saveScore() {
  save.addEventListener("click", function (e) {
    e.preventDefault();
    userInitial = initialEl.value;
    if (userInitial === "") {
      alert("Please Enter Initial");
      return;
    }

    result.classList.add("hide");
    // location.replace("./highscores.html");
    //object for holding user initial and score
    let obj = {
      initial: userInitial,
      score: correct * timeLeft,
    };
    //saving to local storage after pushing object to storedScores array
    storedScores.push(obj);
    localStorage.setItem("storedScores", JSON.stringify(storedScores));
    //changes location to highscores.html to display scores
    location.assign("./highscores.html");
  });
}

//listens for a click on highscore button and displays highscores.html
highscores.addEventListener("click", function () {
  location.assign("./highscores.html");
});
