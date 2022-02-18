import { reactive } from "vue";

const initialPlayers = [
    {
        id: 0,
        name: "Emma",
        score: 0,
        isActive: false,
        listOfShots: [],
    },
    {
        id: 1,
        name: "Marius",
        score: 0,
        isActive: true,
        listOfShots: [],
    },
    {
        id: 2,
        name: "Lucas",
        score: 0,
        isActive: false,
        listOfShots: [],
    },
];

const store = {
    debug: true,
    state: reactive({
        players: initialPlayers,
        gameMode: "301",
        inGame: true,
    }),
    toggleIngameAction() {
        this.state.inGame = !this.state.inGame;
    },

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
