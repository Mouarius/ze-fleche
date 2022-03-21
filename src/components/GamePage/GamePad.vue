<template>
    <div class="game-pad">
        <header>
            <h2>{{ activePlayer.name }}</h2>
        </header>
        <div class="inline-score">
            <template v-if="localState.typedShots.length > 0">
                <div v-for="(score, index) in localState.typedShots" :key="index">
                    <span class="result">{{ score ? score : 0 }}</span>
                </div>
                <span class="result total">{{ playerShotsTotal }}</span>
            </template>
        </div>
        <div class="numpad">
            <button class="number">0</button><button class="number">1</button><button class="number">2</button><button class="number">3</button><button class="number">4</button
            ><button class="number">5</button><button class="number">6</button><button class="number">7</button><button class="number">8</button><button class="number">9</button
            ><button class="number">10</button><button class="number">11</button><button class="number">12</button><button class="number">13</button><button class="number">14</button
            ><button class="number">15</button><button class="number">16</button><button class="number">17</button><button class="number">18</button><button class="number">19</button
            ><button class="number">20</button><button class="number">25</button>
            <button @click="functionButtonClickHandler" id="double" :class="{ active: isDoubleActive }" class="double function">DOUBLE</button>
            <button @click="functionButtonClickHandler" id="triple" :class="{ active: isTripleActive }" class="triple function">TRIPLE</button>
            <button @click.stop="functionButtonClickHandler" id="undo" class="undo function">
                <i v-if="localState.typedShots.length === 0" class="fa-solid fa-arrow-left-long" /><i v-else class="fa-solid fa-arrow-rotate-left" />
            </button>
        </div>
        <img class="game-pad-shape" src="../../assets/gamepad-shape.svg" alt="shape" />
    </div>
</template>
<script lang="ts">
import { getActivePlayer, getPlayerLastShots, getPreviousPlayerInHistory, setNextPlayerActive, wait } from "../../util/helper";
import store from "../../store";
import logger from "../../util/logger";
import { calculatePlayerScore, calculateShotValue, calculateSumOfShots } from "../../util/helper/scoreHelper";

export default {
    name: "GamePad",
    data() {
        return {
            globalState: store.state,
            localState: {
                scoreModifier: "",
                typedShots: [],
                lastShotFired: false,
            },
        };
    },
    computed: {
        activePlayer() {
            return store.getters.activePlayer();
        },
        playerShotsTotal() {
            return calculateSumOfShots(this.localState.typedShots);
        },
        scoreModifierSymbol() {
            if (this.localState.scoreModifier) {
                return this.localState.scoreModifier[0].toUpperCase();
            }
            return "";
        },
        isDoubleActive() {
            return this.localState.scoreModifier === "double";
        },
        isTripleActive() {
            return this.localState.scoreModifier === "triple";
        },
    },
    methods: {
        addShot(shotValue) {
            store.actions.addShotToPlayer(this.activePlayer.id, shotValue);
            this.localState.typedShots.push(shotValue);
        },
        handleUndoButton() {
            if (this.localState.typedShots.length === 0) {
                let previousPlayer = store.getters.lastPlayer();
                if (previousPlayer) {
                    store.actions.setActivePlayer(previousPlayer.id);
                    this.localState.typedShots = [...previousPlayer.listOfShots.slice(-1)[0]];
                }
            } else {
                this.localState.typedShots.pop();
                return store.actions.removeLastShot();
            }
        },
        numberButtonClickHandler(e) {
            const buttonValue = e.target.textContent;
            logger.info(`${this.activePlayer.name} did a ${buttonValue}`);

            if (this.localState.typedShots.length < 3) {
                //Check here if he did too much ?
                let parsedShotValue = this.scoreModifierSymbol + buttonValue;
                this.localState.scoreModifier = "";
                let calculatedShotValue = calculateShotValue(parsedShotValue);

                let currentPlayerScore = calculatePlayerScore(this.globalState.shotHistory, "301", this.activePlayer.id);

                if (calculatedShotValue > currentPlayerScore) {
                    store.actions.abortCurrentPlayerShots(this.activePlayer.id);
                } else {
                    if (calculatedShotValue === currentPlayerScore) {
                        logger.info(this.activePlayer.name + " has won the game !");
                        store.actions.win(this.activePlayer.id);
                    }
                    this.addShot(parsedShotValue);
                }

                if (this.localState.typedShots.length === 3) {
                    this.moveToNextPlayer();
                }
            }
        },
        functionButtonClickHandler(e) {
            if (e.target.id === "undo") {
                return this.handleUndoButton();
            }
            return (this.localState.scoreModifier = e.target.id);
        },
        moveToNextPlayer() {
            logger.info(`All shots have been fired for ${this.activePlayer.name}, moving to next player...`);
            wait(500).then(() => {
                this.localState.typedShots = [];
                setNextPlayerActive(this.globalState.players);
            });
        },
    },
    mounted() {
        logger.info("Mounting GamePad");
        document.querySelectorAll("button.number").forEach((item) => {
            item.addEventListener("click", this.numberButtonClickHandler);
        });
    },
};
</script>
<style lang="scss" scoped>
@use "../../styles/variables" as v;

.inline-score {
    display: flex;
    flex-direction: row;
    align-items: center;

    margin-bottom: 2rem;
    font-family: "Public Sans", sans-serif;
    font-size: 1.4rem;
    font-weight: 700;

    height: 2rem;

    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        &::after {
            content: "+";
        }
    }
    div:last-of-type::after {
        content: "=";
    }
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
        background-color: v.$color-secondary;
        color: v.$color-secondary-dark;
    }
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
            &.active {
                background: v.$color-success-dark;
            }
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
            span {
                transition: all 0.1s linear;
            }
            &:active {
                background: v.$color-alert-dark;
                span {
                    transform: rotate(-90deg);
                }
            }
        }
    }
}
</style>
