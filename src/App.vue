<template>
    <div class="page-content">
        <h1 class="page-title">Ze Flèche</h1>
        <section class="game-mode">
            <h2>Mode de jeu</h2>
            <div class="game-modes">
                <button-game-mode button-game-mode="301" />
                <button-game-mode button-game-mode="Cricket" />
            </div>
        </section>
        <players-list />
        <footer><h2>C'est parti !</h2></footer>
    </div>
</template>

<script>
import ButtonGameMode from "./components/ButtonGameMode.vue";
import PlayersList from "./components/PlayersList.vue";
import store from "./store";

export default {
    components: { ButtonGameMode, PlayersList },
    name: "App",
    data() {
        return {
            globalState: store.state,
            localState: {},
        };
    },
    methods: {},
};
</script>

<style lang="scss">
footer {
    position: fixed;
    background: white;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    h2 {
        color: black;
        text-align: center;
        bottom: 1rem;
    }
}
</style>
