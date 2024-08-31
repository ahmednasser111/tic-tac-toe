"use client";
import Board from "@/components/board";
import { useState } from "react";
import styles from "./page.module.css";
type Squares = (string | null)[];
function Home() {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const [isAsc, setAsc] = useState(false);
	let turn = currentMove % 2 === 0;
	let current = history[currentMove];

	function handlePlay(nextSquares: Squares) {
		setHistory([...history.slice(0, currentMove + 1), nextSquares]);
		setCurrentMove(currentMove + 1);
	}
	const moves = history.map((e, i) => {
		let desc = `GO to # ${i}`;
		return (
			<li key={i}>
				{currentMove === i ? (
					<p onClick={() => setCurrentMove(i)}>{`You are at move # ${
						i == 0 ? "start" : i
					}`}</p>
				) : (
					<button onClick={() => setCurrentMove(i)}>
						{i === 0 ? "Go to game start" : desc}
					</button>
				)}
			</li>
		);
	});
	return (
		<main className={styles.main}>
			<Board turn={turn} squares={current} onplay={handlePlay} />
			<ul className={styles["game-info"]}>{isAsc ? moves.reverse() : moves}</ul>
			<button onClick={() => setAsc(!isAsc)} className={styles["sort-button"]}>
				{isAsc ? "Sort Ascending" : "Sort Descending"}
			</button>
		</main>
	);
}
export default Home;
