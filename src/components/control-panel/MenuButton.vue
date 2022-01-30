<template>
    <div class="menu-button" @click="$emit('click')">
        <div class="img-container">
            <img v-if="selected" :src="icon.active" />
            <img v-else :src="icon.inactive" />
            <div v-if="!showBadgeCountAsDot && badgeCount > 0" class="badge badge-count" v-html="displayCount" />
            <div v-else-if="showBadgeCountAsDot && badgeCount > 0" class="badge badge-no-count" />
        </div>
        <div
            class="menu-label f-medium"
            :class="{ selected: selected, 'no-margin': label === 'PRO_AGENTS' }"
            v-html="$translate(label)"
            v-if="label"
        />
    </div>
</template>
<script>
export default {
    name: 'MenuButton',
    props: {
        badgeCount: {
            type: Number,
            default: 0,
        },
        label: {
            type: String,
            required: true,
        },
        icon: {
            type: Object,
            required: true,
        },
        selected: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    computed: {
        displayCount() {
            return this.badgeCount > 99 ? '99+' : this.badgeCount
        },
        showBadgeCountAsDot() {
            return this.label === 'MY_DATING'
        },
    },
}
</script>

<style lang="scss" scoped>
.menu-button {
    line-height: 1.15;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .img-container {
        @include center;
        height: 80%;
        position: relative;
    }

    img {
        width: 26px;
    }

    .badge {
        position: absolute;
        top: -4px;
        right: -12px;
    }

    .badge-count {
        height: 16px;
        min-width: 16px;
        border-radius: 8px;
    }

    .badge-no-count {
        width: 8px;
        height: 8px;
        border: solid 1px white;
        background-color: $pink-deep;
        right: -2px;
        top: 2px;
        padding: 0;
    }

    .menu-label {
        font-size: 10px;
        text-align: center;
        color: $grey-06;
        height: 20%;

        &.selected {
            color: $grey-09;
        }
        &.no-margin {
            margin-top: 0 !important;
            //margin-bottom: 4px !important;
        }
    }
}
</style>
