import { drawCard, addToPlace } from "./moves";
import { placeValueSlots } from "./constants";

export const PlaceValues = {
	setup: (ctx) => ({
		deck: shuffle(getDeck()),
		hands: getHands(ctx),
		currentCard: null,
	}),

	endIf: (G) => {
		const isEnd = Object.values(G.hands).every((hand) => {
			return hand.every((position) => {
				return !!position;
			});
		});
		if (isEnd) {
			const totals = Object.keys(G.hands).map((id) => {
				const hand = G.hands[id];
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

	moves: { drawCard },

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
