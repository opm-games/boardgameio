import react from "react";

export default function Card({ hidden, suit, value, onClickCallback, display, key }) {
	return (
		<div key={key} className="slot" onClick={onClickCallback}>
			<span>
				{value && value}
				<img src={suit && suit}></img>
				{display}
			</span>
		</div>
	);
}
