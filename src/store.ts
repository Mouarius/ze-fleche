import { reactive, computed, watchEffect } from "vue";
import initialPlayers from "./data/initialPlayers";
import { calculatePlayersRanks, calculatePlayersScore, getActivePlayer, setNextPlayerActive } from "./util/helper";
import logger from "./util/logger";
import { Player, ShotRecord } from "./util/types";

const store = {
    debug: true,
    state: reactive({
        players: initialPlayers as Player[],
        gameMode: "301",
        inGame: false,
        shotsHistory: [] as ShotRecord[],
    }),
    getters: {
        findPlayer(id: number): Player {
            return store.state.players.find((p) => p.id === id);
        },
        lastPlayer(): Player {
            if (store.state.shotsHistory.length > 0) {
                let lastPlayerId = store.state.shotsHistory[store.state.shotsHistory.length - 1].playerId;
                return this.findPlayer(lastPlayerId);
            }
        },
        activePlayer() {
            return getActivePlayer(store.state.players);
        },
        changeGlobalGameMode(gameMode) {
            this.state.gameMode = gameMode;
        },
    },
    actions: {
        setActivePlayer: (id: number) => {
            //Deactivate all the players
            store.state.players.forEach((p) => {
                p.isActive = false;
            });

            const playerToActivate = store.getters.findPlayer(id);
            playerToActivate.isActive = true;
        },
        addShotToPlayer: (playerId: number, shotValue: string) => {
            const player = store.getters.findPlayer(playerId);

            player.listOfShots.push(shotValue);
            let shotRecord = { playerId: playerId, value: shotValue };
            store.state.shotsHistory.push(shotRecord);
        },
        removeShotToPlayer: (playerId: number): ShotRecord => {
            const player = store.getters.findPlayer(playerId);
            player.listOfShots.pop();
            return store.state.shotsHistory.pop();
        },
        editPlayerName: (playerId: number, newName: string) => {
            const playerToEdit = store.getters.findPlayer(playerId);
            playerToEdit.name = newName;
        },
        abortCurrentPlayerShots: (playerId: number) => {
            const numberOfCurrentShots = store.state.shotsHistory.length % 3;
            const shotsToAdd = 3 - numberOfCurrentShots;
            //Abort the current shots

            const currentShots: ShotRecord[] = [];
            for (let i = 0; i < numberOfCurrentShots; i++) {
                const currentShot = store.actions.removeShotToPlayer(playerId);
                currentShots.push(currentShot);
            }
            //Append X to the current shots to signify that they were invalid
            currentShots.forEach((shotRecord) => {
                shotRecord.value = shotRecord.value + "X";
            });
            //Re append the modified shots in reverse order
            currentShots.reverse().forEach((shotRecord) => {
                store.actions.addShotToPlayer(playerId, shotRecord.value);
            });
            //Adds invalid shots to the rest
            for (let i = 0; i < shotsToAdd; i++) {
                store.actions.addShotToPlayer(playerId, "X");
            }
            setNextPlayerActive(store.state.players);
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
};

watchEffect(() => {
    if (store.state.gameMode === "301") {
        //Updates the players scores and ranks whenever the list of shots changes
        store.state.players = calculatePlayersScore(store.state.gameMode, store.state.players);
        store.state.players = calculatePlayersRanks(store.state.gameMode, store.state.players);
    }
});

export default store;
