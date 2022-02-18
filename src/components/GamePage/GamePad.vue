<template>
    <div class="game-pad">
        <header><h2>Marius</h2></header>
        <div class="inline-score">
            <template v-if="localState.playerShots.length > 0">
                <div v-for="(score, index) in localState.playerShots" :key="index">
                    <span class="result">{{ score ? score : 0 }}</span>
                </div>
            </template>
            <span class="result total">{{ playerShotsTotal }}</span>
        </div>
        <div class="numpad">
            <button class="number">0</button><button class="number">1</button><button class="number">2</button><button class="number">3</button><button class="number">4</button
            ><button class="number">5</button><button class="number">6</button><button class="number">7</button><button class="number">8</button><button class="number">9</button
            ><button class="number">10</button><button class="number">11</button><button class="number">12</button><button class="number">13</button><button class="number">14</button
            ><button class="number">15</button><button class="number">16</button><button class="number">17</button><button class="number">18</button><button class="number">19</button
            ><button class="number">20</button><button class="number">25</button>
            <button @click="functionButtonClickHandler" id="double" class="double function">DOUBLE</button>
            <button @click="functionButtonClickHandler" id="triple" class="triple function">TRIPLE</button>
            <button @click.stop="functionButtonClickHandler" id="undo" class="undo function"><span class="fa-solid fa-arrow-rotate-left" /></button>
        </div>
        <img class="game-pad-shape" src="../../assets/gamepad-shape.svg" alt="shape" />
    </div>
</template>
<script>
export default {
    name: "GamePad",
    data() {
        return {
            localState: {
                playerShots: [],
                scoreModifier: "",
            },
        };
    },
    computed: {
        playerShotsTotal() {
            if (this.localState.playerShots.length > 0) {
                return this.localState.playerShots.reduce((acc, strVal) => {
                    //Separates the value and the modifier letter
                    const matchResult = strVal.match(/(\D)?(\d+)/);
                    const [, modifier, strValue] = matchResult;
                    console.log("🚀 ~ file: GamePad.vue ~ line 43 ~ returnthis.localState.playerShots.reduce ~ matchResult", matchResult);
                    console.log("modifier", modifier);
                    console.log("value", strValue);
                    let numberValue = parseInt(strValue);

                    if (modifier === "T") {
                        numberValue = numberValue * 3;
                    } else if (modifier === "D") {
                        numberValue = numberValue * 2;
                    }

                    return acc + numberValue;
                }, 0);
            }
            return 0;
        },
        scoreModifierSymbol() {
            if (this.localState.scoreModifier) {
                return this.localState.scoreModifier[0].toUpperCase();
            }
            return "";
        },
    },
    methods: {
        say(message) {
            console.log(message);
        },
        addShot(shotValue) {
            if (this.localState.playerShots.length < 3) {
                this.localState.playerShots.push(this.scoreModifierSymbol + shotValue);
                this.localState.scoreModifier = "";
            }
        },
        removeLastShot() {
            if (this.localState.playerShots.length > 0) {
                this.localState.playerShots.pop();
            }
        },
        numberButtonClickHandler(e) {
            const typedValue = e.target.textContent;
            console.log(typedValue);
            if (typedValue === "DOUBLE") {
            } else if (typedValue === "TRIPLE") {
            } else if (typedValue) this.addShot(typedValue);
        },
        functionButtonClickHandler(e) {
            if (e.target.id === "undo") {
                return this.removeLastShot();
            }
            return (this.localState.scoreModifier = e.target.id);
        },
    },
    mounted() {
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
        background-color: v.$color-primary;
        color: white;
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
