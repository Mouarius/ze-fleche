<template>
    <ul class="leaderboard">
        <leaderboard-item v-for="player in globalState.players" :key="player.id" :playerName="player.name" :score="player.score" :isActive="player.isActive" />
    </ul>
</template>

<script>
import LeaderboardItem from "../GamePage/LeaderboardItem.vue";
import store from "../../store";
export default {
    components: { LeaderboardItem },
    name: "Leaderboard",
    data() {
        return {
            globalState: store.state,
            localState: {},
        };
    },
    computed: {},
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
}
</style>
