<template>
    <div class="timeleft-badge" :class="expireAt.status" v-html="expireAt.text" />
</template>

<script>
export default {
    name: 'TimeLeft',
    props: ['vote'],
    computed: {
        expireAt() {
            const expireAt = this.vote.expire_at

            const expire = this.$moment(expireAt).diff(this.$moment(), 'days')
            if (expire < 0) return { status: 'expired', text: '마감' }

            return expire > 0
                ? { status: 'day', text: `D-${expire + 1}` }
                : { status: 'hour', text: `${this.$moment(expireAt).diff(this.$moment(), 'hours')}시간 남음` }
        },
    },
}
</script>

<style scoped lang="scss">
.timeleft-badge {
    padding: 2px 4px;
    color: white;
    font-size: 8px;
    background: #000000;
    border-radius: 4px;
    width: fit-content;

    &.expired {
        background: $grey-04;
        color: black;
    }
    &.hour {
        background: $suhoshin-red;
    }
}
</style>
