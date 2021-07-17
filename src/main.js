"use strict";

const initialPage = document.querySelector(".game__start");
const gameField = document.querySelector(".game__field");
const waldo = document.querySelector(".game__field__waldo");
const winPopUp = document.querySelector(".game__win");
const losePopUp = document.querySelector(".game__lose");

const startBtn = document.querySelector(".game__start__btn");
const replayBtn = document.querySelector(".game__replay");
const nextBtn = document.querySelector(".game__next");
const gameQuit = document.querySelector(".game__quit");

let MAP_NUMBER = 1;
const GAME_DURATION = 10;

const waldoPosition = [
	{mapNumber: 1, x: 830, y: 141},
	{mapNumber: 2, x: 640, y: 330},
	{mapNumber: 3, x: 175, y: 681}
];

startBtn.addEventListener("click", (event) => {
	startGame();
});

nextBtn.addEventListener("click", () => {
	MAP_NUMBER++;
	hideWinPupUp();
	startGame();
})

replayBtn.addEventListener("click", () => {
	hideLosePopUp();
	startGame();
})

gameQuit.addEventListener("click", () => {
	hideWinPupUp();
	hideFieldPage();
	showStartPage();
})

gameField.addEventListener("click", (event) => {
	if(event.target.classList.contains("waldo")) {
		gameWin();
	} else {
		gameLose();
	}
})

function startGame() {
	hideStartPage();
	showFieldPage();
}

function gameWin() {
	showWinPopUp();
}

function gameLose() {
	showLosePopUp();
}

function showStartPage() {
	initialPage.style.visibility = "visible";
}

function hideStartPage() {
	initialPage.style.visibility = "hidden";
}

function showWinPopUp() {
	winPopUp.style.visibility = "visible";
}

function hideWinPupUp() {
	winPopUp.style.visibility = "hidden";
}

function showLosePopUp() {
	losePopUp.style.visibility = "visible";
}

function hideLosePopUp() {
	losePopUp.style.visibility = "hidden";
}

function showFieldPage() {
	gameField.style.visibility = "visible";
	makeField(MAP_NUMBER);
	makeWaldo(MAP_NUMBER);
}

function hideFieldPage() {
	gameField.style.visibility = "hidden";
}

function makeField(mapNum) {
	gameField.style.background = `url(img/bg/${mapNum}.jpeg)`;
	gameField.style.backgroundSize = "cover";
}

function makeWaldo(mapNum) {
	for(let i = 0; i < waldoPosition.length; i++) {
		if(waldoPosition[i].mapNumber === mapNum) {
			waldo.style.left = `${waldoPosition[i].x}px`;
			waldo.style.top = `${waldoPosition[i].y}px`;
		}
	}
}

