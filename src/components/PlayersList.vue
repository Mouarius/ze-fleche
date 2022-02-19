<template>
    <section class="players-list">
        <h2>Joueurs</h2>
        <ul>
            <transition-group name="fade">
                <player-list-item v-for="player in globalState.players" :key="player.id" :player="player" />
            </transition-group>

            <li class="add-player">
                <button @click="addPlayerButttonHandler"><img class="add-icon" src="../assets/cross.svg" /></button>
            </li>
        </ul>
    </section>
</template>

<script>
import PlayerListItem from "./PlayerListItem.vue";
import store from "../store";

export default {
    components: { PlayerListItem },
    name: "PlayersList",
    data() {
        return {
            globalState: store.state,
        };
    },
    methods: {
        addPlayerButttonHandler() {
            console.log("Add player triggered.");

            store.addPlayerAction("");
        },
    },
};
</script>

<style lang="scss">
.players-list {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 2rem;

    ul {
        display: flex;
        flex-direction: column;
        background: #4d4863;
        box-shadow: 0px 8px 11px 2px rgba(0, 0, 0, 0.1);
        border-radius: 23px;
        padding: 13px;
    }
    .add-player {
        background: none;
        height: 1.8rem;
        border-radius: 16px;
        overflow: hidden;
        button {
            background: rgba(191, 179, 218, 0.22);
            border: none;
            border-radius: 16px;
            width: 100%;
            height: 100%;
            transition: all 120ms linear;

            &:hover {
                background: rgba(191, 179, 218, 0.4);
            }
            &:active {
                background: rgba(191, 179, 218, 0.5);

                transform: scale(0.98);
            }
        }
        .add-icon {
            height: 20px;
            width: 20px;
            transform: rotate(45deg);
        }
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
