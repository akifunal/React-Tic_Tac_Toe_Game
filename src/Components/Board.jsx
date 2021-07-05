import Square from './Square';

const Board = props => {
	function renderSquare(i) {
		const winnerLine = props.winnerLine;
		return (
			<Square
				key={i}
				value={props.squares[i]}
				onClick={() => props.onClick(i)}
				highlight={winnerLine && winnerLine.includes(i)}
			/>
		);
	}

	const boardSize = 3;
	let squares = [];

	for (let i = 0; i < boardSize; i++) {
		let row = [];
		for (let j = 0; j < boardSize; j++) {
			row.push(renderSquare(i * boardSize + j));
		}
		squares.push(
			<div key={i} className='board-row'>
				{row}
			</div>
		);
	}

	return <div>{squares}</div>;
	// return (
	// 	<div>
	// 		<div className='board-row'>
	// 			{renderSquare(0)}
	// 			{renderSquare(1)}
	// 			{renderSquare(2)}
	// 		</div>
	// 		<div className='board-row'>
	// 			{renderSquare(3)}
	// 			{renderSquare(4)}
	// 			{renderSquare(5)}
	// 		</div>
	// 		<div className='board-row'>
	// 			{renderSquare(6)}
	// 			{renderSquare(7)}
	// 			{renderSquare(8)}
	// 		</div>
	// 	</div>
	// );
};

export default Board;
