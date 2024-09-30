"use strict";

const ROCK_CHOICE = 'rock';
const PAPER_CHOICE = 'paper';
const SCISSORS_CHOICE = 'scissors';

playGame();

function getComputerChoice() {
	const rand = Math.floor(Math.random() * 3);

	if (rand === 0) {
		return ROCK_CHOICE;
	} else if (rand === 1) {
		return PAPER_CHOICE;
	} else {
		return SCISSORS_CHOICE;
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

/**
 *	The choices of the players are considered as numbers.
 * 	paper -> 0, scissors -> 1, rock -> 2: the greater number will always win as supposed to.
 * 	There is one exception: rock VS paper (only these two choices->numbers have a sum equal to 2).
 *
 * 	This approach requires fewer lines of code.
 *
 * 	Returns undefined if tie, false if human won, else true.
 */
function playRound(humanChoice, computerChoice) {
	if (humanChoice === computerChoice) {
		return undefined;
	}

	/*
	 * It's important for the first element to be the humanChoice.
	 * This way the final return will work as intended.
	 */
	let choices = [humanChoice, computerChoice];
	let choicesMapped = choices.map((choice) => {
		if (choice === ROCK_CHOICE) {
			return  2;
		} else if (choice === PAPER_CHOICE) {
			return  0;
		} else {
			return  1;
		}
	});
	let exceptionCheckSum = choicesMapped.reduce((partialSum, a) => partialSum + a, 0);

	if (exceptionCheckSum === 2) {
		return humanChoice === ROCK_CHOICE;
	}

	let winnerIndex = choicesMapped.findIndex((choiceAsNum) => {
		return choiceAsNum === Math.max(...choicesMapped);
	});

	return winnerIndex !== 0;
}

function winMessage(humanChoice, computerChoice) {
	let resultDiv = findOrCreateNode('div', 'result', 'btn-group');
	
	resultDiv.textContent = 'You won! ' + humanChoice.toUpperCase() + ' beats ' + computerChoice.toUpperCase();
}

function loseMessage(humanChoice, computerChoice) {
	let resultDiv = findOrCreateNode('div', 'result', 'btn-group');

	resultDiv.textContent = 'You lose! ' + computerChoice.toUpperCase() + ' beats ' + humanChoice.toUpperCase();
}

function tieMessage(humanChoice) {
	let resultDiv = findOrCreateNode('div', 'result', 'btn-group');

	resultDiv.textContent = 'Tie! Both players chose ' + humanChoice.toUpperCase();
}

function findOrCreateNode(tag, className, classNameBefore) {
	let result = document.querySelector('.' + className);
	const resultBefore = document.querySelector('.' + classNameBefore);

	if (result === null) {
		result = document.createElement(tag);
		result.classList.add(className);
		document.body.insertBefore(result, resultBefore);
	}

	return result;
}

function playGame() {
	let humanScore = 0;
	let computerScore = 0;
	let humanChoice;
	let computerChoice;
	let result;

	for (let i = 0; i < 5; i++) {
		humanChoice = getHumanChoice();
		computerChoice = getComputerChoice();
		result = playRound(humanChoice, computerChoice);

		if (result) {
			computerScore++;
			loseMessage(humanChoice, computerChoice);
		} else if (result === undefined) {
			tieMessage(humanChoice);
		} else {
			humanScore++;
			winMessage(humanChoice, computerChoice);
		}
	}

	finalMessage(humanScore, computerScore);
}

function finalMessage(humanScore, computerScore) {
	let finalScoreDiv = findOrCreateNode('div', 'final-score', 'result');

	if (humanScore > computerScore) {
		finalScoreDiv.textContent = 'You won. Your Score: ' + humanScore + ', computer Score: ' + computerScore;
	} else if (humanScore < computerScore) {
		finalScoreDiv.textContent = 'You lost. Your Score: ' + humanScore + ', computer Score: ' + computerScore;
	} else {
		finalScoreDiv.textContent = 'Tie! Your Score: ' + humanScore + ', computer Score: ' + computerScore;
	}
}