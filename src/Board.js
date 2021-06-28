import React from "react";
import Card from "./Card";
import suits from "./res/images";
import "./styles.css";
export class PlaceValuesBoard extends React.Component {
	constructor(props) {
		super(props);
	}

	onPlaceCard(playerIndex, slotIndex) {
		this.props.moves.addToPlace(playerIndex, slotIndex);
	}

	onDrawCardFromDeck() {
		this.props.moves.drawCard();
	}

	cardsEqual() {
		const newCard = this.props.G.currentCard;
		const oldCard = this.state.currentCard;
		return (
			(newCard && newCard.value) === (oldCard && oldCard.value) &&
			newCard &&
			newCard.suit === oldCard &&
			oldCard.suit
		);
	}
	gameoverDisplay() {
		const { gameover } = this.props.ctx;
		if (!gameover) return "";
		return (
			<div>
				Scores:
				{Object.values(this.props.G.players).map((player) => {
					return (
						<div
							key={player.id}
							className={player.score === gameover.winningScore ? "bold" : ""}>
							<span>
								Player {player.id}: {player.score}
							</span>
						</div>
					);
				})}
			</div>
		);
	}

	getPlayers() {
		const players = [];

		Object.values(this.props.G.players).forEach((player) => {
			const playerSlots = [];

			for (let slotI = 0; slotI < player.slots.length; slotI++) {
				const cardAtSlot = player.slots[slotI];
				playerSlots.push(
					<Card
						keyId={slotI}
						suit={this.getSVGForSuit(cardAtSlot && cardAtSlot.suit)}
						value={cardAtSlot && cardAtSlot.value}
						onClickCallback={() => this.onPlaceCard(player.id, slotI)}
					/>
				);
			}
			players.push({ id: player.id, playerSlots });
		});
		return players;
	}

	getSVGForSuit(suit) {
		return suits[suit];
	}

	render() {
		let players = this.getPlayers();

		return (
			<React.Fragment>
				{/* deck area */}
				<div>Deck</div>

				{this.gameoverDisplay()}

				<div style={{ display: "flex" }}>
					<div>
						<Card
							className="card"
							style={{ marginRight: "5px" }}
							onClickCallback={() => this.onDrawCardFromDeck()}
							display="<><>"></Card>
					</div>
					{this.props.G.currentCard && (
						<Card
							value={this.props.G.currentCard.value}
							suit={this.getSVGForSuit(this.props.G.currentCard.suit)}
						/>
					)}
				</div>

				{/* player area */}

				<div>
					{players.map((player) => {
						return (
							<div key={player.id} className="player-slots">
								<div style={{ marginRight: "5px" }}>Player: {player.id}</div>
								{player.playerSlots}
							</div>
						);
					})}
				</div>
			</React.Fragment>
		);
	}
}
