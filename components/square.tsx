import styles from "../app/page.module.css";
type SquareProps = {
	value: string | null;
	onClick: () => void;
	highlight: boolean;
};
function Square({ value, onClick, highlight }: SquareProps) {
	let className = `${styles.square} ${highlight ? styles.highlighted : ""} ${
		value ? (value === "X" ? "cross" : "circle") : ""
	}`;
	return (
		<div className={className} onClick={onClick}>
			{value}
		</div>
	);
}
export default Square;
