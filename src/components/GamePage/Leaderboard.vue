<template>
    <ul class="leaderboard">
        <leaderboard-item
            v-for="player in globalState.players"
            :key="player.id"
            :playerName="player.name"
            :score="player.score"
            :isActive="player.isActive"
            :rank="player.rank"
            :listOfShots="player.listOfShots"
        />
        <div class="active-rectangle" :style="{ transform: `translateY(${translateAmountPx})` }"></div>
    </ul>
</template>

<script>
import LeaderboardItem from "../GamePage/LeaderboardItem.vue";
import store from "../../store";
import { getActivePlayer } from "../../util/helper";
export default {
    components: { LeaderboardItem },
    name: "Leaderboard",
    data() {
        return {
            globalState: store.state,
            localState: {},
        };
    },
    computed: {
        activePlayerIndex() {
            return getActivePlayer(this.globalState.players)[1];
        },
        translateAmountPx() {
            return this.activePlayerIndex * 100 + "%";
        },
    },
};
</script>

<style lang="scss" scoped>
@use "../../styles/variables" as v;

.leaderboard {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.5rem;
    .active-rectangle {
        content: "";
        display: block;
        width: 100%;
        position: absolute;
        z-index: 0;
        background: rgba($color: #ffffff, $alpha: 0.1);
        border-radius: 0.7rem;
        box-sizing: border-box;
        top: 0;
        left: 0;
        right: 0;
        transition: all 0.3s ease;
        height: 2.2rem;
    }
}
</style>
