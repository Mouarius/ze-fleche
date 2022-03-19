import { reactive, ref } from "vue";
import { Player } from "../util/types";

export interface ICurrentPlayerReturn {
    index: number;
    playerId: number;
}
export type Volley = String[] | [];

const initialHistory = [
    [0, 1, 2],
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
    state: (String | number)[][];
    constructor(players: Player[]) {
        this.state = [];
        if (players.length > 0) {
            this.state[0] = [];
            players.forEach((player) => {
                this.state[0].push(player.id);
            });
        }
    }
    get currentTurn() {
        return this.state.length - 1;
    }

    get players() {
        return this.state[0];
    }

    get shots() {
        return this.state.slice(1, -1);
    }

    get currentPlayer() {
        const currentTurn = this.state.length - 1;
        const currentPlayerIndex = this.state[currentTurn].length > 0 ? this.state[currentTurn].length - 1 : 0;
        return { index: currentPlayerIndex, playerId: this.state[0][currentPlayerIndex] };
    }

    getVolley(playerId, turn) {
        console.log(this.state);
        return this.state[turn][playerId];
    }

    turn(turnValue: number) {
        return this.state[turnValue];
    }

    shotsOfPlayer(playerId: number) {
        return this.state
            .map((row, index) => {
                if (index > 0) {
                    return row[playerId];
                }
            })
            .slice(1);
    }
    setVolley(volleyValue, playerId: number, turn: number): void {
        // logger.debug(`Adding a new volley at turn ${turn} for player number ${playerId}`);
        if (!this.state[turn]) this.state.push([]);
        this.state[turn][playerId] = volleyValue;
    }
    print() {
        console.table(this.state);
    }
    push(volley: Volley) {
        const currentPlayer = this.currentPlayer;
        let turn = this.currentTurn;
        if (currentPlayer.index === this.players.length - 1) turn++;
        const nextPlayerIndex = currentPlayer.index === this.players.length - 1 ? 0 : currentPlayer.index + 1;
        this.setVolley(volley, nextPlayerIndex, turn);
    }
    pop() {
        const lastVolley = this.state[this.state.length - 1];
        lastVolley.pop();
        if (this.state[this.state.length - 1].length === 0 && this.state.length > 1) this.state.pop();
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
