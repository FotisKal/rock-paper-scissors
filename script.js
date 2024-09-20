function getComputerChoice() {
	const rand = Math.floor(Math.random() * 3);

	if (rand === 0) {
		return 'ROCK';
	} else if (rand === 1) {
		return 'PAPER';
	} else {
		return 'SCISSORS';
	}
}

function getHumanChoice() {
	let str;

	do {
		str = prompt().toUpperCase();
	} while (!validate(str));

	return str;
}

function validate(str) {
	return str === 'ROCK' || str === 'PAPER' || str === 'SCISSORS';
}