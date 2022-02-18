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
            <div class="game-pad">
                <header><h2>Marius</h2></header>
                <div class="inline-score"><span class="result">12</span> +<span class="result">12</span> + <span class="result">12</span> = <span class="result total">124</span></div>
                <div class="numpad">
                    <button class="number">0</button><button class="number">1</button><button class="number">2</button><button class="number">3</button><button class="number">4</button
                    ><button class="number">5</button><button class="number">6</button><button class="number">7</button><button class="number">8</button><button class="number">9</button
                    ><button class="number">10</button><button class="number">11</button><button class="number">12</button><button class="number">13</button><button class="number">14</button
                    ><button class="number">15</button><button class="number">16</button><button class="number">17</button><button class="number">18</button><button class="number">19</button
                    ><button class="number">20</button><button class="number">25</button>
                    <button class="double function">DOUBLE</button>
                    <button class="triple function">TRIPLE</button>
                    <button class="undo function"><i class="fa-solid fa-arrow-rotate-left"></i></button>
                </div>
                <img class="game-pad-shape" src="./assets/gamepad-shape.svg" alt="shape" />
            </div>
        </div>
    </div>
</template>

<script>
import ButtonGameMode from "./components/ButtonGameMode.vue";
import Leaderboard from "./components/Leaderboard.vue";
import PlayersList from "./components/PlayersList.vue";
import store from "./store";

export default {
    components: { ButtonGameMode, PlayersList, Leaderboard },
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

.inline-score {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    margin-bottom: 2rem;
    font-family: "Public Sans", sans-serif;
    font-size: 1.4rem;
    font-weight: 700;

    .result {
        display: flex;
        align-items: center;

        background: v.$color-grey-50;
        height: 2rem;
        border-radius: 2rem;
        text-align: center;

        padding: 0 0.7rem;
        margin: 0 0.5rem;
    }
    .total {
        background-color: v.$color-primary;
        color: white;
    }
}

.game-page {
    position: relative;
}
.game-pad {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    padding: 1rem;

    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
        color: v.$color-text-black;
    }
    .game-pad-shape {
        width: 100%;
        height: 22rem;
        bottom: 0;
        position: absolute;
        z-index: -1;
        svg {
            box-shadow: 0px -19px 25px rgba(0, 0, 0, 0.25);
        }
    }

    .numpad {
        display: grid;
        justify-content: center;
        grid-template-columns: repeat(7, 2.625rem);
        grid-template-rows: repeat(4, 2.625rem);
        column-gap: 7px;
        row-gap: 7px;

        button {
            width: 42px;
            height: 42px;
            border: none;
            background: v.$color-primary-light;
            box-shadow: v.$box-shadow-S;
            border-radius: 14px;

            font-family: Work Sans;
            font-style: normal;
            font-weight: 600;
            font-size: 1.5rem;
            text-align: center;
            color: #ffffff;
            transition: all 0.2s ease;

            &:hover {
                box-shadow: 0px 2px 9px 2px rgba(0, 0, 0, 0.06);
                box-shadow: 0px 0px 9px 2px rgba(139, 77, 255, 0.25);
            }
            &:active {
                background-color: v.$color-primary;
                transform: scale(0.93);
            }
        }
        .function {
            grid-column-end: span 2;
            width: auto;
            font-size: 1.2rem;
        }
        .double {
            background: v.$color-success;
            &:active {
                background: v.$color-success-dark;
            }
        }
        .triple {
            background: v.$color-success;
            &:active {
                background: v.$color-success-dark;
            }
        }
        .undo {
            background: v.$color-alert;
            i {
                transition: all 0.1s linear;
            }
            &:active {
                background: v.$color-alert-dark;
                i {
                    transform: rotate(-90deg);
                }
            }
        }
    }
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
