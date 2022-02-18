<template>
    <ul class="leaderboard">
        <li class="leaderboard-item">
            <span class="player-name">Emma</span><span class="rank">#1</span> <span class="score">210 <span class="pts">pts</span></span>
        </li>
        <li class="leaderboard-item">
            <span class="player-name">Marius</span><span class="rank">#1</span> <span class="score">210 <span class="pts">pts</span></span>
        </li>
        <li class="leaderboard-item active">
            <span class="player-name">Emma</span><span class="rank">#1</span> <span class="score">210 <span class="pts">pts</span></span>
        </li>
        <li class="leaderboard-item">
            <span class="player-name">Emma</span><span class="rank">#1</span> <span class="score">210 <span class="pts">pts</span></span>
        </li>
    </ul>
</template>

<script>
export default {
    name: "Leaderboard",
};
</script>

<style lang="scss" scoped>
@use "../styles/variables" as v;

.leaderboard {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.5rem;

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
}
</style>
