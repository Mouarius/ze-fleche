<template>
    <li class="leaderboard-item" :class="{ active: isActive }">
        <span class="player-name">{{ playerName }}</span
        ><span class="rank">#1</span> <span class="score">{{ score }} <span class="pts">pts</span></span>
    </li>
</template>
<script>
export default {
    name: "LeaderboardItem",
    props: ["playerName", "rank", "score", "isActive"],
    data() {
        return {};
    },
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

    color: v.$color-text-white;

    &.active {
        background: rgba($color: #ffffff, $alpha: 0.1);
    }

    .rank {
        margin-left: 0.6rem;
        font-size: 1rem;
        align-self: flex-start;
        color: v.$color-secondary;
        flex: 1;
    }
    .score {
        color: v.$color-primary-light;
        .pts {
            font-size: 1rem;
            color: v.$color-primary-dark;
        }
    }
}
</style>
