const { Server } = require("boardgame.io/server");
const { PlaceValues } = require("./Game.js");

const server = Server({ games: [PlaceValues] });

server.run(8080);
