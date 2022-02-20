<template>
    <div class="header-bar flex-row">
        <div @click="onClickLeftButton" class="left flex-row flex-wrap center">
            <i class="material-icons m-r-16">chevron_left</i>
            <div class="title f-medium center" v-html="$translate(title)" />
        </div>
        <div class="right flex-wrap"></div>
    </div>
</template>

<script>
export default {
    name: 'HeaderBar',
    data: () => ({
        title: 'ADMIN',
        customTitle: null,
    }),
    watch: {
        $route() {
            this.initTitle()
        },
    },
    computed: {
        onboardTempSignup() {
            return this.$route.path.includes('signup/temp/')
        },
        backIcon() {
            if (
                ['PreferencesIntroPage', 'NPSMainPage', 'NTSMainPage', 'IntroductionPage', 'Refund1Page'].indexOf(
                    this.$route.name
                ) > -1
            )
                return 'close'

            return 'keyboard_backspace'
        },
        hideTitle() {
            if (this.onboardTempSignup) return false

            return ['ChatroomPage'].indexOf(this.$route.name) === -1
        },
    },
    methods: {
        initTitle() {
            this.title = this.customTitle || this.$case.toSnake(this.$route.name).toUpperCase()
            this.customTitle = ''
        },
        onClickLeftButton() {
            this.$router.go(-1)
        },
    },
    mounted() {
        this.initTitle()
    },
    beforeDestroy() {},
}
</script>

<style lang="scss" scoped>
.header-bar {
    height: 56px;
    padding-left: $header-left-padding;

    &.bordered {
        border-bottom: 1px solid $grey-02;
    }

    &.dark {
        &.bordered {
            border-bottom: 1px solid $grey-07;
        }
        background-color: $grey-09;
    }

    .back-button {
        margin-right: 8px;
        color: $grey-08;
    }

    .left,
    .right {
        //width: 60px;
        display: flex;
        align-content: center;
        transition: none;
    }

    .title {
        color: black;
        font-size: 16px;

        &.white {
            color: white;
        }

        ::v-deep .sub {
            border-radius: 6px;
            border: solid 1px $brand-recommended;
            font-size: 11px;
            padding: 2px 6px;
            display: flex;
            align-items: center;
        }

        ::v-deep .material-icons {
            margin-left: 4px;
            font-size: 14px;
            color: $blue-suggest;
        }
    }

    .left {
        justify-content: flex-start;
    }

    .right {
        display: flex;
        padding-right: 16px;
        justify-content: flex-end;
        align-items: center;
    }

    i {
        font-size: 24px;
        color: $grey-08;
        &.white {
            color: white;
        }
    }
}
</style>
