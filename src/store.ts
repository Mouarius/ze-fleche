import { reactive, computed, watchEffect } from "vue";
import initialPlayers from "./data/initialPlayers";
import { ShotHistory, Volley } from "./data/ShotHistory";
import { getActivePlayer, setNextPlayerActive } from "./util/helper";
import { calculatePlayerScore } from "./util/helper/scoreHelper";
import { Player, ShotRecord } from "./util/types";

const store = {
    debug: true,
    state: reactive({
        players: initialPlayers as Player[],
        gameMode: "301",
        inGame: false,
        shotsHistory: [] as ShotRecord[],
        shotHistory: new ShotHistory(initialPlayers),
        winner: null,
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
            return getActivePlayer(store.state.players)[0];
        },
        changeGlobalGameMode(gameMode) {
            this.state.gameMode = gameMode;
        },
    },
    actions: {
        initializeGame() {
            store.state.inGame = true;
            store.state.shotHistory = new ShotHistory(store.state.players);
        },
        win: (playerId: number) => {
            let player = store.getters.findPlayer(playerId);
            if (player) {
                player.winner = true;
                store.state.winner = player;
            }
        },
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
            //TODO Remove the implementations of the old shotsHistory
            store.state.shotHistory.pushShot(shotValue);
            player.listOfShots.push(shotValue);
        },
        removeShotToPlayer: (playerId: number): ShotRecord => {
            const player = store.getters.findPlayer(playerId);
            player.listOfShots.pop();
            return store.state.shotHistory.popShot();
        },
        editPlayerName: (playerId: number, newName: string) => {
            const playerToEdit = store.getters.findPlayer(playerId);
            playerToEdit.name = newName;
        },
        //TODO Implementing abort player shots for shotHistory
        abortCurrentPlayerShots: (playerId: number) => {
            // const lastVolley = store.state.shotHistory.lastVolley;
            // if (lastVolley && lastVolley.length < 3) {
            //     const shotsToAdd = 3 - lastVolley.length;
            //     lastVolley.forEach((shot) => {
            //         shot = shot + "X";
            //     });
            //     for (let i = 0; i < shotsToAdd; i++) {
            //         lastVolley.push("X");
            //     }
            // }
            // const numberOfCurrentShots = store.state.shotsHistory.length % 3;
            // const shotsToAdd = 3 - numberOfCurrentShots;
            // //Abort the current shots
            // const currentShots: ShotRecord[] = [];
            // for (let i = 0; i < numberOfCurrentShots; i++) {
            //     const currentShot = store.actions.removeShotToPlayer(playerId);
            //     currentShots.push(currentShot);
            // }
            // //Append X to the current shots to signify that they were invalid
            // currentShots.forEach((shotRecord) => {
            //     shotRecord.value = shotRecord.value + "X";
            // });
            // //Re append the modified shots in reverse order
            // currentShots.reverse().forEach((shotRecord) => {
            //     store.actions.addShotToPlayer(playerId, shotRecord.value);
            // });
            // //Adds invalid shots to the rest
            // for (let i = 0; i < shotsToAdd; i++) {
            //     store.actions.addShotToPlayer(playerId, "X");
            // }
            // setNextPlayerActive(store.state.players);
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

const updatePlayersShots = (players: Player[]) => {
    //Update the list of shots for every player object
    if (players) {
        players.forEach((player) => {
            player.listOfShots = store.state.shotHistory.shotsOfPlayer(player.id);
        });
        return players;
    }
};
watchEffect(() => {
    if (store.state.gameMode === "301") {
        //Updates the players scores and ranks whenever the list of shots changes
        // store.state.players = calculatePlayersScore(store.state.gameMode, store.state.players);
        // store.state.players = calculatePlayersRanks(store.state.gameMode, store.state.players);
        store.state.players = updatePlayersShots(store.state.players);
        for (let i = 0; i < store.state.players.length; i++) {
            store.state.players[i].score = calculatePlayerScore(store.state.shotHistory, store.state.gameMode, store.state.players[i].id);
        }
    }
});

export default store;
