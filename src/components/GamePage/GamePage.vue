<template>
    <div class="game-page">
        <header>
            <h1>{{ globalState.gameMode.toUpperCase() }}</h1>
        </header>
        <leaderboard />
        <game-pad />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../../store";
import GamePad from "./GamePad.vue";
import Leaderboard from "./Leaderboard.vue";

export default defineComponent({
    components: { Leaderboard, GamePad },

    name: "GamePage",
    data() {
        return {
            globalState: store.state,
        };
    },
});
</script>

<style></style>
