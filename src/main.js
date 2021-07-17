"use strict";

const initialPage = document.querySelector(".game__start");
const gameField = document.querySelector(".game__field");
const waldo = document.querySelector(".game__field__waldo");
const winPopUp = document.querySelector(".game__win");
const losePopUp = document.querySelector(".game__lose");
const gameTimer = document.querySelector(".game__info__timer");

const startBtn = document.querySelector(".game__start__btn");
const replayBtn = document.querySelector(".game__replay");
const nextBtn = document.querySelector(".game__next");
const gameQuit = document.querySelector(".game__quit");

class Sound {
	constructor() {
		this.bg = new Audio("../sound/bg.mp3");
		this.miss = new Audio("../sound/bug_pull.mp3");
		this.win = new Audio("../sound/game_win.mp3");
	}

	startBgSound() {
		this.bg.currentTime = 0;
		this.bg.play();
	}

	stopBgSound() {
		this.bg.pause();
	}
}

const sound = new Sound();

let MAP_NUMBER = 1;
let timer = undefined;
const GAME_DURATION = 30;

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
	MAP_NUMBER = 1;
	hideWinPupUp();
	hideFieldPage();
	showStartPage();
	hideTimer();
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
	showTimer();
	startTimer();
	sound.startBgSound();
}

function gameWin() {
	showWinPopUp();
	stopTimer();
	sound.stopBgSound();
	sound.win.play();
}

function gameLose() {
	showLosePopUp();
	stopTimer();
	sound.stopBgSound();
	sound.miss.play();
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

function startTimer() {
	let sec = GAME_DURATION;
	addTextToTimer(sec);
	timer = setInterval(() => {
		if(sec <= 1) {
			stopTimer();
			gameLose();
		}
		addTextToTimer(--sec);
	}, 1000)
}

function showTimer() {
	gameTimer.style.visibility = "visible";
}

function hideTimer() {
	gameTimer.style.visibility = "hidden";
}

function stopTimer() {
	clearInterval(timer);
}

function addTextToTimer(sec) {
	const minute = Math.floor(sec / 60);
	const second = sec % 60;

	if(second > 9) {
		gameTimer.textContent = `0${minute}:${second}`;
	} else {
		gameTimer.textContent = `0${minute}:0${second}`;
	}
}
