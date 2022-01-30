<template>
    <div class="root-header-bar"></div>
</template>

<script>
export default {
    name: 'RootHeaderBar',
    computed: {
        me() {
            return this.$store.getters.me
        },
    },
    methods: {},
}
</script>

<style lang="scss" scoped>
.root-header-bar {
    width: 100vw;
    height: 48px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;

    .right {
        display: flex;
        padding-top: 12px;
        align-items: center;

        .privacy {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            @include center;
            background-color: $grey-02;
            margin-right: 20px;

            &.active {
                background-color: $blue-facebook;
            }
        }

        .material-icons {
            color: $grey-08;
        }

        .invitation-point {
            font-size: 16px;
            color: #111111;
            @include f-regular;
            margin-right: 8px;
        }

        .bell {
            height: 24px;
            flex: none;
        }
    }
}
</style>
