import { reactive, ref } from "vue";
import { Player } from "../util/types";

export interface ICurrentPlayerReturn {
    index: number;
    playerId: number;
}
export type Volley = String[];

const initialHistory = [
    [
        ["1", "1", "1"],
        ["2", "2", "2"],
        ["3", "3", "3"],
    ], //turn 1
    [
        ["1", "1", "1"],
        ["2", "2", "2"],
        ["3", "3", "3"],
    ], //turn 2
    [
        ["1", "1", "1"],
        ["2", "2", "2"],
        ["3", "3", "3"],
    ], //turn 3
    [
        ["1", "1", "1"],
        ["2", "2", "2"],
        ["3", "3", "3"],
    ], //turn 4
];

export class ShotHistory {
    playersId: number[];
    listOfTurns: Volley[][];

    constructor(players: Player[]) {
        this.listOfTurns = [];
        if (players.length > 0) {
            this.playersId = players.map((player) => player.id);
        }
    }
    get currentTurn() {
        return this.listOfTurns.length - 1;
    }

    get currentPlayerId() {
        const currentPlayerIndex = this.listOfTurns[this.currentTurn]?.length - 1;
        return this.playersId[currentPlayerIndex];
    }
    get lastVolley() {
        if (this.listOfTurns.length > 0) {
            return this.getLastTurn().slice(-1)[0];
        }
        return null;
    }

    getLastTurn() {
        return this.listOfTurns.slice(-1)[0];
    }

    getVolley(playerId, turn) {
        if (playerId) {
            return this.listOfTurns[turn - 1][playerId];
        }
        return null;
    }

    getTurn(turnValue: number) {
        return this.listOfTurns[turnValue - 1];
    }

    getShotsOfPlayer(playerId: number) {
        const shotsOfPlayer = this.listOfTurns.map((turnRecord) => {
            if (turnRecord[playerId]) {
                return turnRecord[playerId];
            }
        });
        return shotsOfPlayer;
    }
    setVolley(volleyValue, playerId: number, turn: number): void {
        // logger.debug(`Adding a new volley at turn ${turn} for player number ${playerId}`);
        if (!this.listOfTurns[turn - 1]) this.listOfTurns.push([]);
        this.listOfTurns[turn - 1][playerId] = volleyValue;
    }
    print() {
        console.table(this.listOfTurns);
    }
    push(volley: Volley) {
        if (this.listOfTurns.length > 0) {
            let lastTurn = this.getLastTurn();
            if (lastTurn) {
                if (lastTurn.length === this.playersId.length) {
                    this.listOfTurns.push([volley]);
                } else {
                    lastTurn.push(volley);
                }
            }
        } else {
            this.listOfTurns.push([volley]);
        }
    }
    pushShot(shotValue: String) {
        const lastVolley = this.lastVolley;
        console.log("🚀 ~ file: ShotHistory.ts ~ line 105 ~ ShotHistory ~ pushShot ~ lastVolley", lastVolley);
        if (lastVolley) {
            if (lastVolley.length < 3) {
                const updatedVolley = lastVolley.concat([shotValue]);
                console.log("🚀 ~ file: ShotHistory.ts ~ line 109 ~ ShotHistory ~ pushShot ~ updatedVolley", updatedVolley);
                this.pop();
                this.push(updatedVolley);
            } else {
                this.push([shotValue]);
            }
        } else {
            this.push([shotValue]);
        }
    }
    pop() {
        const lastTurn = this.getLastTurn();
        lastTurn.pop();
        if (this.getLastTurn().length === 0) {
            this.listOfTurns.pop();
        }
    }
    popShot() {
        if (this.lastVolley) {
            this.lastVolley.pop();
            if (this.lastVolley.length === 0) {
                this.pop();
            }
        }
    }
}

// const sh = new ShotHistory();
// console.log(sh.state[0]);
// console.log(sh.players);
// console.log(sh.shots);
// console.log(sh.turn(1));
// console.log(sh.shotsOfPlayer(1));
// console.log(sh.getVolley(1, 3));
// console.log(sh.currentTurn);
// console.log(sh.currentPlayer);
// sh.print();
// sh.push(["2", "3"]);
// sh.push(["2", "3", "4"]);
// sh.print();
// sh.pop();
// sh.print();
