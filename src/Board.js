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
				{gameover.totals.map((total, index) => {
					return (
						<div key={index} className={total.id === gameover.winner.id ? "bold" : ""}>
							<span>
								Player {total.id}: {total.total}
							</span>
						</div>
					);
				})}
			</div>
		);
	}

	getPlayers() {
		const players = [];

		Object.entries(this.props.G.players).forEach(([playerId, playerCards]) => {
			const playerSlots = [];
			for (let slotI = 0; slotI < playerCards.length; slotI++) {
				const cardAtSlot = this.props.G.players[playerId][slotI];
				playerSlots.push(
					<Card
						keyId={slotI}
						suit={this.getSVGForSuit(cardAtSlot && cardAtSlot.suit)}
						value={cardAtSlot && cardAtSlot.value}
						onClickCallback={() => this.onPlaceCard(playerId, slotI)}
					/>
				);
			}
			players.push({ id: playerId, playerSlots });
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
