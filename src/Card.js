import React from "react";

export default function Card({ hidden, suit, value, onClickCallback, display, keyId }) {
	return (
		<div key={keyId} className="slot" onClick={onClickCallback}>
			<span>
				{value && value}
				<img src={suit && suit}></img>
				{display}
			</span>
		</div>
	);
}
