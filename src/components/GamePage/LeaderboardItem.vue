<template>
    <li class="leaderboard-item" :class="{ active: isActive }">
        <span class="player-name">{{ playerName }}</span>
        <span class="rank">#{{ rank }}</span>
        <ul class="lastShots">
            <li class="shot">{{ lastThreeShots[0] }}</li>
            <li class="shot">{{ lastThreeShots[1] }}</li>
            <li class="shot">{{ lastThreeShots[2] }}</li>
        </ul>
        <span class="score">{{ score }} <span class="pts">pts</span></span>
    </li>
</template>
<script>
export default {
    name: "LeaderboardItem",
    props: ["playerName", "rank", "score", "isActive", "listOfShots"],
    data() {
        return {
            lastShots: ["", "", ""],
        };
    },
    computed: {
        lastThreeShots() {
            let lastShots;
            let rest = this.listOfShots.length % 3;
            if (this.listOfShots.length <= 3) {
                return this.listOfShots;
            }
            if (rest === 0) {
                lastShots = this.listOfShots.slice(-3);
            } else {
                lastShots = this.listOfShots.slice(0 - rest);
            }
            return lastShots;
        },
    },
    watch: {},
};
</script>
<style lang="scss" scoped>
@use "../../styles/variables" as v;

.lastShots {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-right: 0.6rem;
    flex: 1;
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
        font-size: 0.6em;
        font-weight: 600;
        margin-left: 0.5rem;
    }
}
.leaderboard-item {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    flex-direction: row;
    border-radius: 0.7rem;
    padding: 0.2rem 0.8rem;
    margin: 0.2rem 0;
    height: 1.8rem;

    color: v.$color-text-white;

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
