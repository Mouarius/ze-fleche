import { reactive } from "vue";

const initialPlayers = [
    {
        id: 0,
        name: "Emma",
    },
    {
        id: 1,
        name: "Marius",
    },
    {
        id: 2,
        name: "Lucas",
    },
];

const store = {
    debug: true,
    state: reactive({
        players: initialPlayers,
        gameMode: "301",
    }),

    addPlayerAction(playerName) {
        const idList = this.state.players.map((p) => p.id);
        const id = Math.max(...idList) + 1;
        const newPlayer = {
            id: id,
            name: playerName,
        };
        this.state.players.push(newPlayer);
    },
    editPlayerNameAction(playerId, newName) {
        const playerToEdit = this.state.players.find((p) => p.id === playerId);
        playerToEdit.name = newName;
    },
    removePlayerAction(playerId) {
        this.state.players = this.state.players.filter((p) => p.id !== playerId);
    },
    changeGlobalGameModeAction(gameMode) {
        this.state.gameMode = gameMode;
    },
};

export default store;
