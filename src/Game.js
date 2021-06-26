import { drawCard, addToPlace } from "./moves";
import { placeValueSlots } from "./constants";
import { PlayerView } from "boardgame.io/core";

export const PlaceValues = {
	setup: (ctx) => {
		const G = {
			deck: shuffle(getDeck()),
			currentCard: null,
			players: getHands(ctx),
		};
		return G;
	},
	playerView: (G, ctx, playerId) => {
		const player = G.players[playerId];
		if (player.isTeacher) return G;
		return { currentCard: G.currentCard, players: { [playerId]: G.players[playerId] } };
	},
	endIf: (G) => {
		const isEnd = Object.values(G.players).every((player) => {
			return player.slots.every((position) => {
				return !!position;
			});
		});
		if (isEnd) {
			return {
				winningScore: Object.values(G.players).reduce(function (a, b) {
					return Math.max(a.score, b.score);
				}),
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
	const players = {};
	ctx.playOrder.forEach((id) => {
		const slots = Array(placeValueSlots).fill(null);
		players[id] = new Player(id, slots, false);
	});
	return players;
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

function Player(id, slots, isTeacher) {
	return {
		id,
		slots,
		isTeacher,
		score: 0,
	};
}

function Card(value, suit, hidden) {
	return {
		value,
		suit,
		hidden: hidden === undefined ? false : true,
	};
}
