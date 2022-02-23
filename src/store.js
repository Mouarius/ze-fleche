import { reactive, computed, watchEffect } from "vue";
import initialPlayers from "./data/initialPlayers";
import { calculatePlayersRanks, calculatePlayersScore, calculateScore } from "./util/helper";
import { Player } from "./util/types";

const store = {
    debug: true,
    state: reactive({
        players: initialPlayers,
        gameMode: "301",
        inGame: false,
        shotsHistory: [],
        activeShotsCount: 0,
    }),
    getters: {
        players() {
            return store.state.players;
        },
        findPlayer(id) {
            return store.state.players.find((p) => p.id === id);
        },
    },
    actions: {
        initShotsHistory: () => {
            store.state.shotsHistory = [];
        },
        initPlayers: () => {
            store.state.players = [];
        },
        setActivePlayer: (id) => {
            //Deactivate all the players
            store.state.players.forEach((p) => {
                p.isActive = false;
            });

            const playerToActivate = store.getters.findPlayer(id);
            playerToActivate.isActive = true;
        },
        addShotToPlayer: (playerId, shotValue) => {
            const player = store.getters.findPlayer(playerId);
            player.listOfShots.push(shotValue);
            store.state.shotsHistory.push([playerId, shotValue]);
        },
        removeShotToPlayer: (playerId) => {
            const player = store.getters.findPlayer(playerId);
            player.listOfShots.pop();
            store.state.shotsHistory.pop();
        },
        editPlayerName: (playerId, newName) => {
            const playerToEdit = store.getters.findPlayer(playerId);
            playerToEdit.name = newName;
        },
    },

    toggleIngameAction() {
        this.state.inGame = !this.state.inGame;
    },

    addPlayerAction() {
        const newPlayer = new Player();
        if (this.state.players.length === 0) {
            newPlayer.isActive = true;
        } else {
            const idList = this.state.players.map((p) => p.id);
            const id = Math.max(...idList) + 1;
            newPlayer.id = id;
        }
        this.state.players.push(newPlayer);
    },
    removePlayerAction(playerId) {
        this.state.players = this.state.players.filter((p) => p.id !== playerId);
    },
    changeGlobalGameModeAction(gameMode) {
        this.state.gameMode = gameMode;
    },
    updatePlayerScoreAction(playerId, updatedScore) {
        const playerToUpdate = this.getters.findPlayer(this.state, playerId);
        playerToUpdate.score = updatedScore;
    },
    addShotToPlayerAction(playerId, shot) {
        const player = this.getters.findPlayer(this.state, playerId);
        if (player) {
            player.listOfShots.push(shot);
        }
    },
    removeLastShotToPlayerAction(playerId) {
        const player = this.getters.findPlayer(this.state, playerId);
        if (player) {
            player.listOfShots.pop();
        }
    },
};

watchEffect(() => {
    if (store.state.gameMode === "301") {
        //Updates the players scores whenever the list of shots changes
        store.state.players = calculatePlayersScore(store.state.gameMode, store.state.players);
        store.state.players = calculatePlayersRanks(store.state.gameMode, store.state.players);
    }
});

export default store;
