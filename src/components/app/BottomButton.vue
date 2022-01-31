<template>
    <div class="bottom-button" :class="{ nonFixed, bgTransparent, darkMode }">
        <button
            @click.stop="onClick"
            class="btn btn-block btn-primary"
            :class="{ disabled, overlay, blackBtn }"
            v-html="$translate(label || 'CONFIRM')"
            :style="btnStyle"
            v-if="!doubleBtn"
        />
        <div v-else class="btn-double-wrapper">
            <button
                class="btn btn-block"
                v-for="(btn, idx) in doubleBtnsInfo"
                :key="idx"
                :style="btn.style"
                @click="btn.click"
            >
                {{ btn.title }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BottomButton',
    props: {
        label: String,
        disabled: Boolean,
        service: String,
        needAddInfo: Boolean && undefined,
        nonFixed: Boolean,
        overlay: Boolean,
        needAddInfoTop: Boolean,
        bgTransparent: Boolean,
        darkMode: Boolean,
        blackBtn: Boolean,
        height: {
            type: Number,
            default: 48,
        },
        fontSize: {
            type: Number,
            default: 15,
        },
        lineHeight: {
            type: Number,
        },
        doubleBtn: {
            type: Boolean,
            required: false,
            default: false,
        },
        doubleBtnsInfo: {
            type: Array,
            required: false,
            // default: false,
        },
    },
    methods: {
        onClick() {
            if (this.disabled) return

            this.$emit('click')
        },
        openAppBrowser(type) {
            this.$nativeBridge.postMessage({
                action: 'openInAppBrowser',
                value: `https://sm-api.vanillabridge.com/api/users/terms?term_type=${type}`,
            })
        },
    },
    computed: {
        btnStyle() {
            return {
                height: `${this.height}px`,
                fontSize: `${this.fontSize}px`,
                // lineHeight: `${this.lineHeight}px`,
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.bottom-button {
    &.bgTransparent {
        background: transparent;
    }
    &.darkMode {
        background: black;
    }
    &.nonFixed {
        position: static !important;
        padding: 0;
        border: none !important;
    }
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    padding: 16px 20px 16px 20px;
    z-index: 3;

    button {
        // height: 48px;
        height: 48px;
        // font-size: 15px;

        &.btn-social {
            color: #fff;
            background: $social;
        }
        &.overlay {
            border: 1px solid $blue-primary !important;
            background: white !important;
            color: $blue-primary !important;
        }
        &.disabled {
            background: $grey-02 !important;
        }
        &.blackBtn {
            background-color: black;
        }
    }
    .additional-info {
        text-align: center;
        font-size: 13px;
        color: $grey-06;
    }
    .btn-double-wrapper {
        display: flex;
        button:first-child {
            margin-right: 8px;
        }
    }
}
</style>
