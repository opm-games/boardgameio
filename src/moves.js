import { INVALID_MOVE } from "boardgame.io/core";
import { placeValueSlots } from "./constants";

export function drawCard(G, ctx) {
	G.currentCard = G.deck.pop();
	G.currentCard.hidden = false;
	ctx.events.setStage("placeCard");
}
export function addToPlace(G, ctx, playerId, slotIndex) {
	if (
		playerId !== ctx.currentPlayer ||
		slotIndex + 1 > placeValueSlots ||
		!!G.players[ctx.currentPlayer][slotIndex]
	) {
		return INVALID_MOVE;
	}
	const player = G.players[ctx.currentPlayer];
	player.slots[slotIndex] = G.currentCard;

	let placeValueIndex = player.slots.length - slotIndex;
	let placeValue = 1;
	for (let i = 0; i <= placeValueIndex; i++) {
		placeValue *= 10;
	}

	player.score += G.currentCard.value * placeValue;
	G.currentCard = null;
	ctx.events.endTurn();
}
