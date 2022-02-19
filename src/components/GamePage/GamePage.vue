<template>
    <div class="game-page">
        <header><h1>301</h1></header>
        <leaderboard />
        <game-pad />
    </div>
</template>

<script>
import GamePad from "./GamePad.vue";
import Leaderboard from "./Leaderboard.vue";

export default {
    components: { Leaderboard, GamePad },

    name: "GamePage",
};
</script>

<style></style>
