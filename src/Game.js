import { drawCard, addToPlace } from "./moves";
import { placeValueSlots } from "./constants";
import { PlayerView } from "boardgame.io/core";

export const PlaceValues = {
	setup: (ctx) => {
		const G = {
			deck: shuffle(getDeck()),
			currentCard: null,
			players: getHands(ctx),
			currentCard: {},
		};
		return G;
	},
	playerView: (G, ctx, playerId) => {
		return { currentCard: G.currentCard, players: { [playerId]: G.players[playerId] } };
	},
	endIf: (G) => {
		const isEnd = Object.values(G.players).every((hand) => {
			return hand.every((position) => {
				return !!position;
			});
		});
		if (isEnd) {
			const totals = Object.keys(G.players).map((id) => {
				const hand = G.players[id];
				let total = 0;
				let placeValue = "1";
				for (let i = hand.length - 1; i >= 0; i--) {
					placeValue = Number.parseInt(placeValue, 10);

					const card = hand[i];
					total += card.value * placeValue;
					placeValue = placeValue.toString() + "0";
				}
				return { id, total };
			});
			const winner = { id: null, total: 0 };
			totals.forEach((playerTotal) => {
				if (winner.total < playerTotal.total) {
					winner.id = playerTotal.id;
					winner.total = playerTotal.total;
				}
			});

			return {
				winner,
				totals,
			};
		}
	},

	moves: {
		drawCard: {
			move: drawCard,
			client: false,
		},
	},

	turn: {
		activePlayers: { stage: "drawCard" },
		stages: {
			placeCard: {
				moves: {
					addToPlace,
				},
			},
		},
	},
};

function getHands(ctx) {
	const hands = {};
	ctx.playOrder.forEach((id) => {
		hands[id] = Array(placeValueSlots).fill(null);
	});
	return hands;
}
function shuffle(deck) {
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}
	return deck;
}

function getDeck() {
	const deck = [];
	["hearts", "spades", "diamonds", "clubs"].forEach((suit) => {
		for (let i = 0; i < 13; i++) {
			deck.push(new Card(i + 1, suit));
		}
	});

	return deck;
}

function Card(value, suit) {
	return {
		value,
		suit,
		hidden: true,
	};
}
