import { calculateScore } from "../util/helper";
import store from "../store";

const maxTurns = 20;
let turnsCounter = 0;
let players = store.state.players;
let shotsHistory = store.state.shotsHistory; //history of the id of the player who took shots, to pop values of them if necessary

let initializeGame = () => {
    //Init players, score, etc
    store.actions.initShotsHistory();
    store.actions.initPlayers();
};

const runGame = () => {
    initializeGame();

    for (turnsCounter = 0; turnsCounter < maxTurns; turnsCounter++) {
        console.log(`Actual game turn : ${turnsCounter}`);
        for (let playerIndex = 0; playerIndex < players.length; playerIndex++) {
            //Request an action for the specific player
            const activePlayer = players[playerIndex];
            store.actions.setActivePlayer(activePlayer.id);
        }
    }
};

const calculatePlayerScores = (players) => {
    for (player in players) {
        player.score = calculateScore(player.listOfShots);
    }
};
