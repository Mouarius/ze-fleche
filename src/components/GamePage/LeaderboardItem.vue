<template>
    <li class="leaderboard-item" :class="{ active: isActive }">
        <span class="player-name">{{ player.name }}</span>
        <span class="rank">#{{ player.rank }}</span>
        <ul class="last-shots">
            <li class="shot">{{ lastThreeShots[0] }}</li>
            <li class="shot">{{ lastThreeShots[1] }}</li>
            <li class="shot">{{ lastThreeShots[2] }}</li>
        </ul>
        <span class="score">{{ player.score }} <span class="pts">pts</span></span>
    </li>
</template>
<script>
import store from "../../store";

export default {
    name: "LeaderboardItem",
    props: ["player"],
    data() {
        return {};
    },
    computed: {
        lastThreeShots() {
            let lastShots = ["", "", ""];
            const playerShots = store.state.shotHistory.shotsOfPlayer(this.player.id);
            if (playerShots.length > 0) {
                const lastVolley = playerShots.slice(-1)[0];
                for (let i = 0; i < lastVolley.length; i++) {
                    lastShots[i] = lastVolley[i];
                }
                return lastShots;
            }
            return ["&", "é", "s"];
        },
        isActive() {
            return this.player.isActive;
        },
    },
    watch: {},
};
</script>
<style lang="scss" scoped>
@use "../../styles/variables" as v;

.leaderboard-item {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    flex-direction: row;
    border-radius: 0.7rem;
    padding: 0.2rem 0.8rem;
    margin: 0.2rem 0;
    height: 1.8rem;
    font-size: 1.5rem;

    color: v.$color-text-white;
    .last-shots {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-right: 0.6rem;
        flex: 1;
        min-height: 1.5rem;
        height: 100%;
        .shot {
            background: rgba($color: v.$color-primary-light, $alpha: 0.2);
            color: rgba($color: v.$color-text-pale, $alpha: 0.6);
            border-radius: 0.3rem;
            box-sizing: border-box;
            height: 100%;
            width: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            // font-size: 0.6em;
            font-weight: 600;
            margin-left: 0.5rem;
        }
    }
    .rank {
        margin-left: 0.6rem;
        font-size: 1rem;
        align-self: flex-start;
        color: v.$color-secondary;
        flex: 0;
    }
    .score {
        color: v.$color-primary-light;
        width: 5rem;
        text-align: right;
        .pts {
            font-size: 1rem;
            color: v.$color-primary-dark;
        }
    }
}
</style>
