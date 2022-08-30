
var highScoresMap = {};

function loadHighScores () {
    highScores = localStorage.getItem("scores");
    highScores = JSON.parse(highScores);
    highScoresMap = highScores;

    if (highScoresMap === null) {
        highScoresMap = {};
    }

    for(let key of Object.keys(highScoresMap)){
        var listItemEl = document.createElement("li");
        listItemEl.textContent = key + " " + highScoresMap[key];
        document.querySelector(".score-list").appendChild(listItemEl);
    }
}

function clearScores() {
    localStorage.clear();
    location.reload();
}

document.getElementById("clear-scores").addEventListener("click", clearScores);

loadHighScores();