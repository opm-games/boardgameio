import React, { Fragment } from "react";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";

import { PlaceValues } from "./Game";
import { PlaceValuesBoard } from "./Board";
import "./styles.css";

const PlaceValuesClient = Client({
	game: PlaceValues,
	board: PlaceValuesBoard,
	numPlayers: 2,
	multiplayer: SocketIO({ server: "localhost:8000" }),
});

const App = () => (
	<Fragment>
		<PlaceValuesClient playerID="0" />
	</Fragment>
);

export default App;
