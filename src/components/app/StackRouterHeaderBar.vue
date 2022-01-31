<template>
    <div class="stack-router-header-bar">
        <div @click="onClickLeftButton" class="left-btn">
            <i v-show="showLeftButton" class="material-icons">{{ leftButtonIcon }}</i>
        </div>
        <transition name="fade">
            <div class="title-wrapper" v-show="showTitle">
                <div class="title" v-html="$translate(title)" />
            </div>
        </transition>
        <div class="right-btn flex-wrap">
            <i v-show="showRightButton" class="material-icons">{{ rightButtonIcon }}</i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'StackRouterHeaderBar',
    props: {
        leftButton: {
            type: String,
            default: 'back',
            validator: function (value) {
                return ['back', 'close', 'none'].indexOf(value) !== -1
            },
        },
        leftButtonHandler: {
            type: Function,
        },
        title: String,
        showTitle: {
            type: Boolean,
            default: false,
        },
        rightButton: {
            type: String,
            default: 'none',
        },
        rightButtonHandler: {
            type: Function,
        },
        mode: {
            type: String,
            default: '',
        },
        customRightButton: {
            type: Boolean,
            required: false,
        },
    },
    computed: {
        showLeftButton() {
            return this.leftButton !== 'none'
        },
        showRightButton() {
            return this.rightButton !== 'none'
        },
        leftButtonIcon() {
            if (this.leftButton === 'back') return 'arrow_back_ios'
            else if (this.leftButton === 'close') return 'close'

            return ''
        },
        showCustomRightButton() {
            return this.customRightButton
        },
        rightButtonIcon() {
            // return 'close'
            return this.rightButton
        },
    },
    methods: {
        onClickLeftButton(e) {
            if (this.leftButtonHandler) {
                this.leftButtonHandler()
            } else {
                this.$stackRouter.pop()
            }
        },
        onClickRightBtn() {
            if (this.rightButtonHandler) {
                this.rightButtonHandler()
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.stack-router-header-bar {
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    //justify-content: space-between;
    width: 100%;
    height: $stack-router-header-height;
    background-color: white;
    padding: 0 16px;
    z-index: 2;

    &.bg-black {
        .title {
            color: white;
        }
        .left-btn > .material-icons {
            color: white;
        }
    }

    & > * {
        display: flex;
        align-items: center;
        height: 100%;
    }

    .left-btn,
    .right-btn {
        z-index: 3;
        //width: $stack-router-header-height;
        flex-shrink: 0;
    }
    ::v-deep .custom-right-button {
        display: flex;
        font-size: 14px;
        line-height: 24px;
        margin: 0 4px;
    }
    ::v-deep a {
        display: flex;
        color: #111111;
    }

    ::v-deep .material-icons-outlined {
        height: 20px;
        width: 20px;
        margin-right: 4px;
    }
    .left-btn > .material-icons {
        color: $grey-08;
    }

    .title-wrapper {
        //justify-content: center;
        //max-width: 60%;
        margin-left: 8px;
    }

    .title {
        color: black;
        font-size: 18px;
        font-weight: 500;
        margin-right: 16px;

        @include lines-1;
        @include spoqa-f-regular;
    }
}
</style>
