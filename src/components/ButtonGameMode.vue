<template>
    <button :class="{ active: isActive }" @click="buttonClickHandler">
        {{ buttonGameMode }}
    </button>
</template>

<script>
export default {
    name: "ButtonGameMode",
    props: ["buttonGameMode", "globalGameMode", "changeGlobalGameMode"],
    data() {
        return {};
    },
    computed: {
        isActive() {
            return this.buttonGameMode === this.globalGameMode;
        },
    },
    methods: {
        buttonClickHandler() {
            this.changeGlobalGameMode(this.buttonGameMode);
        },
    },
};
</script>

<style lang="scss" scoped>
button {
    /* Button / Game Mode */
    width: 114px;
    height: 42px;

    border: none;

    font-family: "Work Sans";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    color: #99870063;

    background: radial-gradient(199.12% 449.86% at -25.66% 15.85%, rgba(217, 217, 217, 0) 0%, rgba(255, 255, 255, 0.24) 50%, rgba(166, 166, 166, 0.24) 75.52%), #faf8e3;
    /* Simple Shadow */
    box-shadow: 0px 8px 11px 2px rgba(0, 0, 0, 0.1);
    border-radius: 31px;

    transition: all 200ms linear;

    margin-right: 2rem;

    &:hover {
        cursor: pointer;
        box-shadow: 0px 8px 11px 2px rgba(0, 0, 0, 0.2);
    }
    &.active {
        color: #998600;
        background: radial-gradient(199.12% 449.86% at -25.66% 15.85%, rgba(240, 226, 79, 0.2376) 0%, rgba(255, 255, 255, 0.24) 50%, rgba(223, 198, 75, 0.24) 75.52%), #fff376;
    }
}
</style>
