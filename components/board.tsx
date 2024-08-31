"use client";
import styles from "../app/page.module.css";
import Square from "../components/square";

type Squares = (string | null)[];

type BoardProps = {
	turn: boolean;
	squares: Squares;
	onplay: (nextSquares: Squares) => void;
};

function calcWinner(squares: Squares) {
	let winnedBy = [];
	for (let i = 0; i < 9; i += 3) {
		if (
			squares[i] &&
			squares[i] === squares[i + 1] &&
			squares[i] === squares[i + 2]
		) {
			winnedBy = [i, i + 1, i + 2];
			return { winner: squares[i], winnedBy };
		}
	}
	for (let i = 0; i < 3; i++) {
		if (
			squares[i] &&
			squares[i] === squares[i + 3] &&
			squares[i] === squares[i + 6]
		) {
			winnedBy = [i, i + 3, i + 6];
			return { winner: squares[i], winnedBy };
		}
	}
	if (squares[0] && squares[0] === squares[4] && squares[0] === squares[8]) {
		winnedBy = [0, 4, 8];
		return { winner: squares[0], winnedBy };
	}
	if (squares[2] && squares[2] === squares[4] && squares[2] === squares[6]) {
		winnedBy = [2, 4, 6];
		return { winner: squares[2], winnedBy };
	}
	return { winner: null, winnedBy: [] };
}

function Board({ turn, squares, onplay }: BoardProps) {
	const { winner, winnedBy } = calcWinner(squares);
	let status = `Next Player: ${turn ? "X" : "O"}`;

	function handleClick(i: number) {
		if (squares[i] || winner) return;

		const newSquares = squares.slice();
		newSquares[i] = turn ? "X" : "O";
		onplay(newSquares);
	}

	if (winner) status = `Winner: ${winner}`;
	else if (squares.every((cell) => cell)) status = "Draw";
	const board = [];
	for (let i = 0; i < 3; i++) {
		let row = [];
		for (let j = 0; j < 3; j++) {
			row.push(
				<Square
					key={i * 3 + j}
					value={squares[i * 3 + j]}
					onClick={() => handleClick(i * 3 + j)}
					highlight={winnedBy.includes(i * 3 + j)}
				/>
			);
		}
		board.push(
			<div key={i} className={styles.row}>
				{row}
			</div>
		);
	}

	return (
		<div>
			<div className={styles.status}>{status}</div>
			{board}
		</div>
	);
}

export default Board;
