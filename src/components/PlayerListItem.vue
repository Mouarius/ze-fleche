<template>
    <li>
        <button tabindex="-1"><img class="burger-icon" src="../assets/burger-icon.svg" /></button>
        <input @keyup.enter="unFocus" ref="playerNameInput" type="text" @change="onNameInputChangeHandler" class="player-name" v-model="playerName" placeholder="Joueur" />
        <button tabindex="-1" @click="removeButtonClickHandler"><img class="cross-icon" src="../assets/cross.svg" /></button>
    </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../store";

export default defineComponent({
    name: "PlayerListItem",
    props: ["player"],
    data() {
        return {
            playerName: "",
        };
    },
    methods: {
        removeButtonClickHandler() {
            console.log(`Trying to remove player ${this.player.id}`);
            store.removePlayerAction(this.player.id);
        },
        onNameInputChangeHandler() {
            store.actions.editPlayerName(this.player.id, this.playerName);
        },
        unFocus(e: Event) {
            (e.target as HTMLElement).blur();
        },
    },
    mounted() {
        this.playerName = this.player.name;
        this.$refs.playerNameInput.focus();
    },
});
</script>

<style lang="scss" scoped>
button {
    background: none;
    border: none;
}
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
    }

    .burger-icon {
        margin-left: 8px;
    }
    .player-name {
        background: none;
        border: none;
        font-family: "Public Sans";
        font-weight: 500;
        font-size: 1rem;
        color: white;
        outline: none;
        margin-left: 8px;
    }
}
button:last-child {
    margin-left: auto;
    margin-right: 6px;
}
</style>
