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
		!!G.hands[ctx.currentPlayer][slotIndex]
	) {
		return INVALID_MOVE;
	}
	G.hands[ctx.currentPlayer][slotIndex] = G.currentCard;

	G.currentCard = null;
	ctx.events.endTurn();
}
