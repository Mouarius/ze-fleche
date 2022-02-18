<template>
    <div class="page-content">
        <div class="initialization-page" v-if="!globalState.inGame">
            <h1 class="page-title">Ze Flèche</h1>
            <section class="game-mode">
                <h2>Mode de jeu</h2>
                <div class="game-modes">
                    <button-game-mode button-game-mode="301" />
                    <button-game-mode button-game-mode="Cricket" />
                </div>
            </section>
            <players-list />
            <footer>
                <h2><button @click="startGameButtonHandler">C'est parti !</button></h2>
                <img class="footer-shape" src="./assets/footer-shape.svg" />
            </footer>
        </div>
        <div class="game-page" v-else>
            <header><h1>301</h1></header>
            <leaderboard />
            <game-pad />
        </div>
    </div>
</template>

<script>
import ButtonGameMode from "./components/ButtonGameMode.vue";
import GamePad from "./components/GamePage/GamePad.vue";
import Leaderboard from "./components/GamePage/Leaderboard.vue";
import PlayersList from "./components/PlayersList.vue";
import store from "./store";

export default {
    components: { ButtonGameMode, PlayersList, Leaderboard, GamePad },
    name: "App",
    data() {
        return {
            globalState: store.state,
            localState: {},
        };
    },
    methods: {
        startGameButtonHandler() {
            store.toggleIngameAction();
        },
    },
};
</script>

<style lang="scss">
@use "styles/variables" as v;

.game-page {
    position: relative;
}

footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    img {
        width: 100%;
        height: 88px;
    }

    h2 {
        display: block;
        text-align: center;
        position: absolute;
        bottom: 8px;
        width: 100%;
    }
}
</style>
