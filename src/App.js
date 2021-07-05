import React, { Fragment } from "react";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";

import { PlaceValues } from "./Game";
import { ToGold } from "./GameToGold";

import { PlaceValuesBoard } from "./Board";
import "./styles.css";

const PlaceValuesClient = Client({
	game: ToGold,
	board: PlaceValuesBoard,
	numPlayers: 2,
	multiplayer: SocketIO({ server: "localhost:8080" }),
});

const App = () => (
	<div>
		<PlaceValuesClient playerID="0" />
	</div>
);

export default App;
