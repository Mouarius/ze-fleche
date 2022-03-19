<template>
    <div class="score-list">
        <table>
            <tr>
                <th v-for="player in sharedState.players" :key="player.id">{{ player.name }}</th>
            </tr>
            <tr v-for="(row, index) in flattenShotsByRow" :key="index">
                <td v-for="(shot, index) in row" :key="index">{{ shot }}</td>
            </tr>
        </table>
    </div>
</template>
<script lang="ts">
import store from "../../store";
import { ShotRecord } from "../../util/types";
export default {
    name: "ScoreList",
    data() {
        return {
            sharedState: store.state,
        };
    },
    methods: {
        groupShotsByPlayer(shotsHistory: ShotRecord[]) {
            const groupedShots = shotsHistory.reduce((acc, curr) => {
                let playerId = curr.playerId;
                if (!acc[playerId]) {
                    acc[playerId] = [];
                }
                acc[playerId].push(curr.value);
                return acc;
            }, {});
            return groupedShots;
        },
        groupShotsByRow(shotsHistory: ShotRecord[]) {
            let turn = 1;
            const numberOfPlayers = this.sharedState.players.length;

            const groupedShots = shotsHistory.reduce((acc, curr, currentIndex) => {
                if (currentIndex === 3 * numberOfPlayers * turn) {
                    turn++;
                }
                if (!acc[turn]) {
                    acc[turn] = [];
                }
                acc[turn].push(curr);
                return acc;
            }, {});
            return groupedShots;
        },
    },
    computed: {
        shotsByPlayer() {
            return this.groupShotsByPlayer(this.sharedState.shotsHistory);
        },
        shotsByRow() {
            return this.groupShotsByRow(this.sharedState.shotsHistory);
        },
        flattenShotsByRow() {
            const shotsByRow = this.groupShotsByRow(this.sharedState.shotsHistory);
            let flattenRow = {};
            let flattenShots = [];
            for (let i = 1; i <= Object.keys(shotsByRow).length; i++) {
                flattenRow = shotsByRow[i].reduce((acc, curr: ShotRecord, currIndex: number) => {
                    //if i%3 != 0 then acc = acc + curr
                    //else
                    let playerId = curr.playerId;
                    console.log("acc", acc);
                    console.log("playerId", playerId);
                    console.log("curr", curr);
                    if (!acc[playerId]) {
                        acc[playerId] = [];
                    }
                    acc[playerId] = acc[playerId] + " " + curr.value;
                    return acc;
                }, {});
                flattenShots.push(flattenRow);
            }
            return flattenShots;
        },
    },
};
</script>
<style lang="scss" scoped>
.score-list {
    display: block;
    position: fixed;
    top: 20px;
    left: 20px;
    width: auto !important;
    border: solid black 1px;
    padding: 8px;
    background: white;
    th {
        font-weight: 600;
        margin: 2px;
    }
    table,
    th,
    td {
        min-width: 32px;
        margin: 2px;
        border: solid 1px;
        padding: 4px;
    }
}
</style>
