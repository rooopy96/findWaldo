export default class Sound {
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