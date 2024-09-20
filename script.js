playGame();

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
		if (choice === 'ROCK') {
			return  2;
		} else if (choice === 'PAPER') {
			return  0;
		} else {
			return  1;
		}
	});
	let exceptionCheckSum = choicesMapped.reduce((partialSum, a) => partialSum + a, 0);

	if (exceptionCheckSum === 2) {
		return humanChoice === 'ROCK';
	}

	let winnerIndex = choicesMapped.findIndex((choiceAsNum) => {
		return choiceAsNum === Math.max(...choicesMapped);
	});

	return winnerIndex !== 0;
}

function winMessage(humanChoice, computerChoice) {
	console.log('You won! ' + humanChoice + ' beats ' + computerChoice);
}

function loseMessage(humanChoice, computerChoice) {
	console.log('You lose! ' + computerChoice + ' beats ' + humanChoice)
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
			console.log('Tie! Both players chose ' + humanChoice);
		} else {
			humanScore++;
			winMessage(humanChoice, computerChoice);
		}
	}

	finalMessage(humanScore, computerScore);
}

function finalMessage(humanScore, computerScore) {
	if (humanScore > computerScore) {
		console.log('You won. Your Score: ' + humanScore + ', computer Score: ' + computerScore);
	} else if (humanScore < computerScore) {
		console.log('You lost. Your Score: ' + humanScore + ', computer Score: ' + computerScore);
	} else {
		console.log('Tie! Your Score: ' + humanScore + ', computer Score: ' + computerScore);
	}
}
