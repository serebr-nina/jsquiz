


const questions = [
    {
    numb: 1,
    question: "When an operator's value is NULL, the typeof returned by the unary is:",
    answer: "Object",
    options: [
      "Integer",
      "Undefined",
      "Boolean",
      "Object"
    ]
  },
  {
    numb: 2,
    question: "What is the output of the following code snippet 'print (NaN === NaN)'?",
    answer: "false",
    options: [
      "true",
      "false",
      "undefined",
      "Error"
    ]
  },
  {
    numb: 3,
    question: "What does the Javascript 'debugger' statement is used for?",
    answer: "To act as a breakpoint in a program",
    options: [
      "To debug error in the current statement",
      "To debug all the error in the program",
      "To act as a breakpoint in a program",
      "To end the program"
    ]
  },
  {
    numb: 4,
    question: "What will be the output of the following code snippet 'print(typeof(NaN))'?",
    answer: "Object",
    options: [
      "Object",
      "String",
      "Number",
      "None of the above"
    ]
  },
  {
    numb: 5,
    question: "Which function is used serialize an object into a JSON string in Javascript?",
    answer: "stringify()",
    options: [
      "parse()",
      "convert()",
      "stringify()",
      "None of the above"
    ]
  },
];

var questionCounter = 0;
var countdown = 90;
var answersCorrect = 0;

var highScoresMap = {};

var timerText = document.getElementById("timer");
timerText.textContent = "Timer: " + countdown;

document.querySelector(".quiz").hidden = true;

var startClick = document.getElementById("start");
startClick.addEventListener("click", startQuiz);

var answerButton0 = document.getElementById("answer-0");
answerButton0.addEventListener("click", answer);

var answerButton1 = document.getElementById("answer-1");
answerButton1.addEventListener("click", answer);

var answerButton2 = document.getElementById("answer-2");
answerButton2.addEventListener("click", answer);

var answerButton3 = document.getElementById("answer-3");
answerButton3.addEventListener("click", answer);

function answer(event) {
    //console.log('Here: ' + event.currentTarget.textContent);
    if (questions[questionCounter].answer === event.currentTarget.textContent) {
        //console.log('Correct');
        answerStatus("Correct!");
        answersCorrect++;
    } else {
        //console.log('Incorrect');
        answerStatus("Incorrect!");
        countdown -= 10;
        timerText.textContent = "Timer: " + countdown;
    }
    questionCounter++;
    populateQuestions();
}

function startQuiz() {
    //console.log('Here');
    document.querySelector(".main").hidden = true;
    document.querySelector(".quiz").hidden = false;
    startCountdown();
    populateQuestions();
}

function populateQuestions () {
    if (questionCounter === 5) {
        Done();
        return;
    }

    document.querySelector(".question").textContent = questions[questionCounter].question;
    document.querySelector("#answer-0").textContent = questions[questionCounter].options[0];
    document.querySelector("#answer-1").textContent = questions[questionCounter].options[1];
    document.querySelector("#answer-2").textContent = questions[questionCounter].options[2];
    document.querySelector("#answer-3").textContent = questions[questionCounter].options[3];
}

function startCountdown () {
    var timeInterval = setInterval(function() {
        if (questionCounter === 5) {
            clearInterval(timeInterval);
            return;
        }
        if (countdown >= 1) {
            timerText.textContent = "Timer: " + countdown;
            countdown--;
            //console.log('countdown ' + countdown);
        }
        else {
            timerText.textContent = "Timer: 0"
            clearInterval(timeInterval);
            Done();
        }
    }, 1000);
}

function answerStatus (answer){
    var rightOrWrong = document.createElement("h2");
    rightOrWrong.textContent = answer;
    document.querySelector(".quiz").appendChild(rightOrWrong);
    setTimeout(function(){
        rightOrWrong.remove();
    }, 1000);
}

function Done () {
    if (answersCorrect === 0) {
        countdown = 0;
    }
    document.querySelector(".answers").hidden = true;

    document.querySelector(".question").textContent = "Done!";

    var scoreTotalEl = document.createElement("h2");
    scoreTotalEl.textContent = "Your final score is " + countdown + ".";
    document.querySelector(".question").appendChild(scoreTotalEl);
    console.log('Done ' + countdown);

    var doneDivEl = document.createElement("div");
    doneDivEl.innerHTML = "<h2>Enter Initials:</h2><form class='initials-form'><input type=text id='initials-input' /><button class='btn' id='initials-btn' type='submit'>Submit</button></form>";
    scoreTotalEl.appendChild(doneDivEl);
    document.querySelector(".initials-form").addEventListener("submit", scoreSubmit);
}

function scoreSubmit (event) {
    event.preventDefault();
    var initials = document.querySelector("#initials-input").value;

    var highScores = localStorage.getItem("scores");
    highScoresMap = JSON.parse(highScores);
    if (highScoresMap === null) {
        highScoresMap = {};
    }

    if (!initials) {
         alert("You need to input your initials!");
         return false;
     }
     else {
        // See if one already exists for initials and only replace if higher score
        console.log('submit ' + countdown);
        if (highScoresMap[initials] == null) {
            highScoresMap[initials] =  countdown;
        } else if (highScoresMap[initials] < countdown) {
            // replace it
            highScoresMap[initials] = countdown;
        }
        saveHighScores();
        window.location.href="./scores.html";
     }
}

function saveHighScores () {
    localStorage.setItem("scores", JSON.stringify(highScoresMap));
}