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
        <div v-if="globalState.winner" class="win-announcer">
            <div class="center-window">
                <em>{{ globalState.winner.name }}</em>
                <div>has won the game !</div>
            </div>
            <div class="win">
                <ul class="rays">
                    <li class="ray"></li>
                    <li class="ray"></li>
                    <li class="ray"></li>
                    <li class="ray"></li>
                    <li class="ray"></li>
                    <li class="ray"></li>
                    <li class="ray"></li>
                    <li class="ray"></li>
                    <li class="ray"></li>
                </ul>
            </div>
        </div>
        <score-list />
    </div>
</template>

<script>
import ButtonGameMode from "./components/ButtonGameMode.vue";
import GamePage from "./components/GamePage/GamePage.vue";
import PlayersList from "./components/PlayersList.vue";
import ScoreList from "./components/Debug/ScoreList.vue";
import store from "./store";

export default {
    components: { ButtonGameMode, PlayersList, GamePage, ScoreList },
    name: "App",
    data() {
        return {
            globalState: store.state,
            localState: {
                win: false,
            },
        };
    },
    methods: {
        startGameButtonHandler() {
            return store.toggleIngameAction();
        },
        playWinAnimation() {
            console.log("Wiiiin !");
            this.localState.win = true;
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
.win-announcer {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.37);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    .center-window {
        display: block;
        z-index: 50;
        background: white;
        padding: 2.2rem 1.8rem;
        border-radius: 2.8rem;
        text-align: center;
        justify-content: center;
        flex-direction: column;
        color: v.$color-primary-dark;
        font-weight: 600;
        font-size: 1.4rem;
        em {
            display: block;
            color: v.$color-primary;
            font-size: 2.4rem;
            margin-bottom: 0.6rem;
        }
    }
}
.win {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    animation: rotation 20s linear infinite;
    @keyframes rotation {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    .rays {
        position: relative;
        z-index: 1;

        // align-items: center;
        // justify-content: center;

        transform: translate(50vw, 50vh);
        .ray {
            transform-origin: left;

            @for $counter from 1 through 9 {
                &:nth-child(#{$counter}) {
                    transform: rotate($counter * 40deg);
                }
            }
            width: 0;
            height: 0;
            top: -100px;
            border-top: 100px solid transparent;
            border-right: 600px solid rgba($color: v.$color-secondary, $alpha: 0.9);
            border-bottom: 100px solid transparent;
            list-style-type: none;
            position: absolute;
        }
    }
}

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
