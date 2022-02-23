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
                <button @click="startGameButtonHandler"><h2>C'est parti !</h2></button>
                <img class="footer-shape" src="./assets/footer-shape.svg" />
            </footer>
        </div>
        <game-page v-else />
    </div>
</template>

<script>
import ButtonGameMode from "./components/ButtonGameMode.vue";
import GamePage from "./components/GamePage/GamePage.vue";
import PlayersList from "./components/PlayersList.vue";
import store from "./store";

export default {
    components: { ButtonGameMode, PlayersList, GamePage },
    name: "App",
    data() {
        return {
            globalState: store.state,
            localState: {},
        };
    },
    methods: {
        startGameButtonHandler() {
            return store.toggleIngameAction();
        },
    },
    mounted() {
        if (this.globalState.players.length > 0) {
            store.actions.setActivePlayer(this.globalState.players[0].id);
        }
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
    button {
        border: none;
        background: none;
        display: block;
        position: absolute;
        bottom: 8px;
        width: 100%;
        h2 {
            text-align: center;
            color: v.$color-text-black;
        }
    }
    img {
        width: 100%;
        height: 88px;
    }
}
</style>
