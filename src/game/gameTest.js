import store from "../store";

const players = [
    { name: "p1", score: 1, active: false },
    { name: "p2", score: 1, active: false },
    { name: "p3", score: 1, active: false },
];

let shotsHistory = [];

let store = {
    activePlayer: {},
};

function setActivePlayer(players, playerIndex) {}

const maxTurns = 20;
let shotsCount = 0;

for (let turn = 0; i <= maxTurns; i++) {
    for (let i = 0; i < players.length; i++) {
        setActivePlayer(players, i); //So the interfaces updates and knows who to add shots
        // listen for shots input
        // when 3 shots have been added to the history
        if (store.state.activeShotsCount === 3) {
            //jump to the other player
        }
    }
}

function addShot(playerId, shotValue) {
    shotsCount++;
}
