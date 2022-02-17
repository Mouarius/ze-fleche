<template>
    <div class="page-content">
        <h1 class="page-title">Ze Flèche</h1>
        <section class="game-mode">
            <h2>Mode de jeu</h2>
            <div class="game-modes">
                <button-game-mode button-game-mode="301" :globalGameMode="globalGameMode" :changeGlobalGameMode="changeGlobalGameMode" />
                <button-game-mode button-game-mode="Cricket" :globalGameMode="globalGameMode" :changeGlobalGameMode="changeGlobalGameMode" />
            </div>
        </section>
        <section class="players-list">
            <h2>Joueurs</h2>
            <ul>
                <li v-for="(player, index) in players" :key="index">
                    <img class="burger-icon" src="./assets/burger-icon.svg" />
                    <span class="player-name">{{ player }}</span>
                    <img class="pencil-icon" src="./assets/pencil-icon.svg" />
                    <img class="cross-icon" src="./assets/cross.svg" />
                </li>
                <li class="add-player"><button>+</button></li>
            </ul>
        </section>
        <footer>C'est parti !</footer>
    </div>
</template>

<script>
import ButtonGameMode from "./components/ButtonGameMode.vue";
export default {
    components: { ButtonGameMode },
    name: "App",
    data() {
        return {
            players: ["Emma", "Marius", "Lucas"],
            globalGameMode: "301",
        };
    },
    methods: {
        changeGlobalGameMode(newGameMode) {
            this.globalGameMode = newGameMode;
        },
    },
};
</script>

<style lang="scss">
.players-list {
    width: 100%;
    ul {
        display: flex;
        flex-direction: column;
        background: #4d4863;
        box-shadow: 0px 8px 11px 2px rgba(0, 0, 0, 0.1);
        border-radius: 23px;
        padding: 13px;

        li {
            width: 100%;
            height: 40px;
            border-radius: 16px;
            color: white;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: stretch;

            &:not(.add-player) {
                margin-bottom: 9px;

                background: radial-gradient(103.75% 4854.5% at 6.85% -10%, rgba(43, 12, 233, 0.2376) 0%, rgba(28, 0, 202, 0.066) 100%), rgba(179, 135, 233, 0.72);
                backdrop-filter: blur(4px);

                font-family: "Public Sans";
                font-weight: 500;
            }
            &.add-player {
                background: rgba(191, 179, 218, 0.22);
            }

            .burger-icon {
                margin-left: 8px;
            }
            .player-name {
                margin-left: 8px;
                margin-right: 12px;
            }
            .cross-icon {
                margin-left: auto;
                margin-right: 8px;
                justify-self: flex-end;
            }
        }
    }
}
</style>
