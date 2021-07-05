import { useState } from 'react';

import Board from './Board';

const Game = () => {
	const [history, setHistory] = useState([{ squares: Array(11).fill(null) }]);
	const [stepNumber, setStepNumber] = useState(0);
	const [xIsNext, setXIsNext] = useState(true);
	const [isAscending, setIsAscending] = useState(true);

	// console.log(history);
	const current = history[stepNumber];
	const { winner, line: winnerLine } = calculateWinner(current.squares);

	let moves = history.map((step, move) => {
		const latestMoveSquare = step.latestMoveSquare;
		const col = 1 + (latestMoveSquare % 3);
		const row = 1 + Math.floor(latestMoveSquare / 3);

		const desc = move
			? `Go to move #${move} (${col},${row})`
			: 'Go to game start';

		const classButton = move === stepNumber ? 'move-list-item-selected' : '';

		return (
			<li key={move}>
				<button className={`${classButton}`} onClick={() => jumpTo(move)}>
					{desc}
				</button>
			</li>
		);
	});

	let status;
	if (winner) {
		status = 'Winner: ' + winner;
	} else if (history.length === 10) {
		status = 'Draw. No one won.';
	} else {
		status = 'Next player: ' + (xIsNext ? 'X' : 'O');
	}

	if (!isAscending) {
		moves.reverse();
	}

	const handleClick = i => {
		const currentHistory = history.slice(0, stepNumber + 1);
		const currentStep = currentHistory[currentHistory.length - 1];
		const squares = currentStep.squares.slice();

		if (calculateWinner(squares).winner || squares[i]) return;

		squares[i] = xIsNext ? 'X' : 'O';

		setHistory(
			currentHistory.concat([
				{
					squares: squares,
					// Store the index of the latest moved square
					latestMoveSquare: i,
				},
			])
		);
		setStepNumber(currentHistory.length);
		setXIsNext(prevState => !prevState);
	};

	const handleSortToggle = () => {
		setIsAscending(prevState => !prevState);
	};

	const jumpTo = step => {
		setStepNumber(step);
		setXIsNext(step % 2 === 0);
	};

	const reset = () => {
		setHistory([{ squares: Array(11).fill(null) }]);
		setXIsNext(true);
		setStepNumber(0);
		setIsAscending(true);
	};

	return (
		<div className='game'>
			<div className='game-board'>
				<Board
					squares={current.squares}
					onClick={handleClick}
					winnerLine={winnerLine}
				/>
			</div>
			<div className='game-info'>
				<div>{status}</div>
				<button className='button' onClick={handleSortToggle}>
					{isAscending ? 'descending' : 'ascending'}
				</button>
				<button className='button button--new-game' onClick={reset}>
					New game
				</button>
				<ol>{moves}</ol>
			</div>
		</div>
	);
};

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return { winner: squares[a], line: lines[i] };
		}
	}

	return { winner: null };
}

export default Game;
